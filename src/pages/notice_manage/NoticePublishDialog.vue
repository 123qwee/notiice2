<template>
	<el-dialog class="dialog" title="发布公告" :visible.sync="dialogVisible" @close="resetForm('childNoticeForm')">
    <el-row :gutter="10">
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
      <el-button class="btn-common btn-back-out" @click="resetForm('childNoticeForm')">取消</el-button>
      <el-button class="btn-common btn-ok" @click="submitForm('childNoticeForm')">发布</el-button>
    </div>
	</el-dialog>
</template>

<script>
import service from "./notice_manage_service";

export default {
  data() {
    return {
      /** 设置对话框显隐 */
      dialogVisible: false,
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

  watch: {
    checkAlluserList(val) {
      let that = this;
      that.checkedUserListIds = [];
      _.map(val, function(item) {
        that.checkedUserListIds.push(item.id);
      });
    },
    dialogVisible(val) {
      if (val) {
        this.$nextTick(function() {
          /** 部门树滚动轴样式 */
          $(".notice-publish-tree").lzscroll("xy", 60, "hover", "mytheme");
          /** 发布对象所有人员滚动轴样式 */
          $(".user-checkbox-group").lzscroll("xy", 60, "hover", "mytheme");
        });
      }
    }
  },

  created() {
  },

  methods: {
    /** 组成树数据 */
    noticeTree(data, idStr, pidStr, chindrenStr) {
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

    /** 发布公告 */
    submitForm(formName) {
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
      let param = {
        noticeId: that.rowNoticeInfo.id,
        userList: userList
      };
      if (userList.length == 0) {
        this.$message({
          type: "info",
          message: "请选择需要接收公告的用户！"
        });
      } else {
        // 显示等待页面
        commonOper.showLoading("公告发布中，请稍候...");
        service.noticePublishQuery(param, data => {
          commonOper.closeLoading();
          if (data.code == 200) {
            this.$message({
              type: "success",
              message: "公告发布成功！"
            });
            this.resetForm("childNoticeForm");
            /** 发布公告刷新列表*/
            this.$bus.$emit("refreshNoticeTable");
          } else {
            this.$message({
              type: "info",
              message: "公告发布失败！"
            });
          }
        });
      }
    },
    /** 取消发布公告 */
    resetForm(formName) {
      /** 选中的用户ID列表 */
      this.checkedUserListIds = [];
      /** 备选的所有用户列表 */
      this.checkAlluserList = [];
      /** 清空部门树选择 */
      this.$refs.orgListDataTree.setCheckedKeys([]);
      this.$data.dialogVisible = false;
    }
  }
};
</script>

<style>
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
