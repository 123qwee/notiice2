<template>
	<el-dialog class="dialog" title="快速发布通知公告" :visible.sync="dialogVisible" @close='resetForm' top="8vh">
		<el-form v-show='nextPage == false' :model="noticeEditForm" :rules="noticeRules" ref="noticeEditForm" label-width="120px">
            <el-form-item label="公告标题" prop="title">
                <el-input v-model="noticeEditForm.title" auto-complete="off"></el-input>
            </el-form-item>
			<el-row>
                <el-col :span="12">
                    <el-form-item label="发布单位" prop="type">
                        <el-input v-model="noticeEditForm.type" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="截止时间" prop="endTime">
                        <el-date-picker class="notice-edit-end-time" v-model="noticeEditForm.endTime" type="datetime" :editable="false" placeholder="选择日期时间"></el-date-picker>
                    </el-form-item>
				</el-col>
				<el-col :span="12">
                    <el-form-item label="发布人" prop="author">
                        <el-input v-model="noticeEditForm.author" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                    <el-radio-group v-model="noticeEditForm.status">
                        <el-radio label="0">锁定</el-radio>
                        <el-radio label="1">未发布</el-radio>
                    </el-radio-group>
                    </el-form-item>
				</el-col>
			</el-row>
            <el-form-item label="公告目录" prop="catalogId">
                <el-cascader v-model="noticeEditForm.catalogId" :options="noticeCatalog" change-on-select :props="{children: 'children', label: 'name', value: 'id'}"></el-cascader>
			</el-form-item>
			<el-form-item label="发布内容" prop="content">
                <quill-editor class="deitor-conent" ref="myTextEditor" v-model="noticeEditForm.content" :options="editorOption"></quill-editor>
			</el-form-item>
            <el-form-item label="图片" style="margin-bottom: 0;">
                <vUpload class="notice-upload" ref="vUpload"></vUpload>
			</el-form-item>
		</el-form>
        <el-row v-show='nextPage == true' :gutter="10">
            <el-col :span="12">
                <div class="publish-org-title">部门列表</div>
                <el-tree class="notice-publish-tree" @check-change="handleCheckedOrg" show-checkbox node-key="id" default-expand-all :data="orgListDataTree" ref="orgListDataTree" :expand-on-click-node="false" :props="{children: 'children', label: 'name'}">
                </el-tree>
            </el-col>
            <el-col :span="12">
                <div class="publish-user-title">用户列表</div>
                <el-checkbox-group class="user-checkbox-group" v-model="checkedUserListIds">
                <el-checkbox v-for="userInfo in checkAlluserList" :label="userInfo.id" :key="userInfo.id">{{userInfo.userName}}</el-checkbox>
                </el-checkbox-group>
            </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
            <el-button v-if='nextPage == false' class="btn-common btn-back-out" @click="resetForm">取消</el-button>
            <el-button v-if='nextPage == false' class="btn-common btn-ok" @click="handleNext">下一步</el-button>
            <el-button v-if='nextPage == true' class="btn-common btn-back-out" @click="handleUp">上一步</el-button>
            <el-button v-if='nextPage == true' class="btn-common btn-ok" @click="submitForm">发布</el-button>
        </div>
	</el-dialog>
</template>

<script>
import service from "./quick_publish_service";

/** 引入富文本编辑器 */
import { quillEditor } from "vue-quill-editor";

/** 引入上传组件 */
import vUpload from "../upload/Upload";

export default {
  components: {
    quillEditor,
    vUpload
  },
  data() {
    return {
      editorOption: {
        placeholder: "请输入内容..."
      },
      /** 设置对话框显隐 */
      dialogVisible: false,
      /** 提交公告表单 */
      noticeEditForm: {
        title: "",
        author: "",
        type: "",
        endTime: "",
        status: "1", // 0 锁定, 1 未发布, 2 已发布
        content: "",
        coverUuid: "",
        /** 所属公告目录 */
        catalogId: []
      },
      /** 公告目录数据 */
      noticeCatalog: [],
      /** 是否下一页 */
      nextPage: false,
      /** 验证 */
      noticeRules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          {
            min: 1,
            max: 300,
            message: "长度在 1 到 300 个字符",
            trigger: "blur"
          }
        ],
        author: [
          { required: true, message: "请输入作者", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请输入来源", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ],
        catalogId: [
          {
            required: true,
            type: "array",
            message: "请选择公告目录",
            trigger: "change"
          }
        ],
        endTime: [
          {
            type: "date",
            required: true,
            message: "请选择截止时间",
            trigger: "change"
          }
        ],
        content: [
          { required: true, message: "请输入内容", trigger: "blur, change" }
        ]
      },

      /** 发布选择用户 */

      /** 部门树数据 */
      orgListDataTree: [],
      /** 公告信息 */
      rowNoticeInfo: {},
      /** 全部的用户列表 */
      allUserList: [],
      /** 选中的用户ID列表 */
      checkedUserListIds: [],
      /** 备选的所有用户列表 */
      checkAlluserList: []
    };
  },

  mounted () {
      /** 部门树滚动轴样式 */
          $(".notice-publish-tree").lzscroll("xy", 60, "hover", "mytheme");
          /** 发布对象所有人员滚动轴样式 */
          $(".user-checkbox-group").lzscroll("xy", 60, "hover", "mytheme");
  },

  watch: {
    dialogVisible(val) {
      if (val) {
        this.$nextTick(function() {
          /** 图片列表滚动轴样式 */
          $(".notice-upload .el-upload-list").lzscroll(
            "xy",
            60,
            "hover",
            "mytheme"
          );
        });
      }
    },
    checkAlluserList(val) {
      let that = this;
      that.checkedUserListIds = [];
      _.map(val, function(item) {
        that.checkedUserListIds.push(item.id);
      });
    }
  },

  created() {
    service.noticeListTreeQuery(data => {
      this.noticeCatalog = this.noticeData(
        data.data,
        "id",
        "parentCatalogId",
        "children"
      );
    });

    /** 获取部门列表 */
    // service.orgListDataQuery(data => {
    //   let that = this;
    //   let orgList = data.data;
    //   _.map(orgList, function(item) {
    //     /** 获取部门下的用户 */
    //     service.orgChildUserListQuery(item.id, data => {
    //       _.map(data.data, function(user) {
    //         user.parentOrgName = item.name;
    //         that.allUserList.push(user);
    //       });
    //     });
    //   });
    //   this.orgListDataTree = this.noticeData(
    //     data.data,
    //     "id",
    //     "parentId",
    //     "children"
    //   );
    // });
  },

  methods: {
    /** 目录级联数据 */
    noticeData(data, idStr, pidStr, chindrenStr) {
      let dataTree = [],
        hash = {},
        id = idStr,
        pid = pidStr,
        children = chindrenStr,
        len = data.length;
      for (let i = 0; i < len; i++) {
        hash[data[i][id]] = data[i];
      }
      for (let j = 0; j < len; j++) {
        let aVal = data[j],
          hashVP = hash[aVal[pid]];
        if (hashVP) {
          !hashVP[children] && (hashVP[children] = []);
          hashVP[children].push(aVal);
        } else {
          dataTree.push(aVal);
        }
      }
      return dataTree;
    },
    /** 勾选部门列表 */
    handleCheckedOrg(data, checked, indeterminate) {
      let that = this;
      if (checked && !indeterminate) {
        /** 查找这个部门下的用户 */
        _.map(that.allUserList, function(item) {
          if (item.parentOrgName == data.name) {
            that.checkAlluserList.push(item);
          }
        });
      } else {
        that.checkAlluserList = _.filter(that.checkAlluserList, function(item) {
          return item.parentOrgName != data.name;
        });
      }
    },
    /** 下一步 */
    handleNext() {
      this.$refs["noticeEditForm"].validate(valid => {
        if (valid) {
          this.nextPage = true;
        } else {
          return false;
        }
      });
    },

    /** 上一步 */
    handleUp() {
      this.nextPage = false;
      /** 选中的用户ID列表 */
      this.checkedUserListIds = [];
      /** 备选的所有用户列表 */
      this.checkAlluserList = [];
      /** 清空部门树选择 */
      this.$refs["orgListDataTree"].setCheckedKeys([]);
    },

    /** 取消保存公告*/
    resetForm() {
      /** 界面操作时增加的图片ID */
      let addPhotoIds = this.$refs["vUpload"].newAddPhoto;
      _.map(addPhotoIds, function(item) {
        service.deletePhotoQuery(item, data => {
          console.log("删除的照片");
        });
      });
      this.$refs["noticeEditForm"].resetFields();
      this.noticeEditForm = {};
      this.noticeEditForm.status = "1";
      this.noticeEditForm.coverUuid = "";
      // 清除已上传附件
      this.$refs["vUpload"].clearFileList();
      this.handleUp();
      this.$data.dialogVisible = false;
    },

    /** 发布 */
    submitForm() {
      let that = this;
      let userList = [];
      _.map(that.checkedUserListIds, function(item) {
        let user = _.find(that.checkAlluserList, function(it) {
          return item == it.id;
        });
        userList.push({
          userId: user.id,
          userName: user.userName
        });
      });
      if (userList.length == 0) {
        this.$message({
          type: "info",
          message: "请选择需要接收公告的用户！"
        });
      } else {
        commonOper.showLoading("公告发布中，请稍候...");
        /** 分两步进行，先添加公告，再行发布公告 */
        let addNoticeParam = _.cloneDeep(that.noticeEditForm);
        /** 图片ids */
        addNoticeParam.coverUuid = _.map(
          that.$refs["vUpload"].fileList,
          "id"
        ).join(",");
        /** 日期和时间 */
        addNoticeParam.endTime =
          addNoticeParam.endTime.toJSON().split("T")[0] +
          " " +
          addNoticeParam.endTime.toTimeString().split(" ")[0];
        addNoticeParam.catalogId = _.last(addNoticeParam.catalogId);
        service.creatNoticeQuery(addNoticeParam, data => {
          if (data.code == 200) {
            let publishUsersParam = {
                noticeId: data.data.id,
                userList: userList
            };
            /** 发布公告 */
            service.noticePublishQuery(publishUsersParam, data => {
              commonOper.closeLoading();
              if (data.code == 200) {
                this.$message({
                  type: "success",
                  message: "公告发布成功！"
                });
                this.resetForm();
              } else {
                this.$message({
                  type: "info",
                  message: "公告发布失败！"
                });
              }
            });
          } else {
            commonOper.closeLoading();
            this.$message({
              type: "info",
              message: "发布公告失败！"
            });
          }
          /** 界面操作时删除的图片ID */
          let deletePhotoIds = this.$refs["vUpload"].newDeletePhoto;
          _.map(deletePhotoIds, function(item) {
            service.deletePhotoQuery(item, data => {
              console.log("删除的照片");
            });
          });
        });
      }
    }
  }
};
</script>

<style>
.el-select,
.el-cascader {
  width: 100%;
}

.notice-edit-end-time {
  width: 100% !important;
}

.deitor-conent {
  height: 230px;
}

.deitor-conent .ql-container {
  height: calc(100% - 100px);
}

.notice-upload ul {
  display: inline-block;
  width: calc(100% - 160px);
  height: 150px;
  overflow: auto;
}

.notice-upload .el-upload {
  float: left;
  margin-right: 10px;
}

/** 发布页面样式 */
.el-select,
.el-cascader {
  width: 100%;
}

.publish-org-title,
.publish-user-title {
  font-size: 18px;
  padding-bottom: 15px;
}

.notice-publish-tree,
.user-checkbox-group {
  height: 500px;
  overflow: auto;
}

.user-checkbox-group label {
  padding: 5px;
  margin-left: 0 !important;
}
</style>
