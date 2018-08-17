<template>
  <el-dialog class="dialog edit_dialog" :title="dialogTitle" :visible.sync="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false"
    @open="openNoticeEditDialog" :show-close="false" :fullscreen="true">
    <el-form :model="noticeEditForm" :rules="noticeRules" ref="noticeEditForm" label-width="120px">
      <el-row>
        <el-col :span="18">
          <el-form-item label="发布内容" prop="content">
            <quill-editor class="deitor-conent" ref="myTextEditor" v-model="noticeEditForm.content" :options="editorOption"></quill-editor>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-row>
            <el-col :span="24">
              <el-form-item label="内容标题" prop="title">
                <!-- <el-input auto-complete="off"></el-input> -->
                <el-input v-model="noticeEditForm.title" type="textarea" :rows="3" placeholder="请输入内容">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="发布单位" prop="type">
                <el-input v-model="noticeEditForm.type" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="截止时间" prop="endTime">
                <el-date-picker class="notice-edit-end-time" v-model="noticeEditForm.endTime" type="datetime" :editable="false" placeholder="选择日期时间"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
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
          <el-row>
            <el-col :span="24">
              <el-form-item label="序号">
                <el-input-number v-model="noticeEditForm.orderBy" :controls="false" :precision="0" :step="1" :min="0" :max="99999999" label="请输入序号" style="width:100%;"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="图片" style="margin-bottom: 0;">
                <vUpload class="notice-upload" ref="vUpload"></vUpload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align: center;">
      <el-button class="btn-common btn-back-out" size="medium" @click="resetForm('noticeEditForm')">取消</el-button>
      <el-button class="btn-common btn-ok" size="medium" @click="submitForm('noticeEditForm')">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import service from "./notice_manage_service";

/** 引入富文本编辑器 */
import { quillEditor } from "vue-quill-editor";
import { quillRedefine } from "vue-quill-editor-upload";

/** 引入上传组件 */
import vUpload from "../../components/upload/Upload";

export default {
  components: {
    quillEditor,
    quillRedefine,
    vUpload
  },
  data() {
    return {
      uniqueId: "imgUp",
      editorOption: {
        placeholder: "请输入内容..."
      },
      /** 设置对话框显隐 */
      dialogVisible: false,
      /** 弹出框标题 */
      dialogTitle: "",
      /** 公告目录信息 */
      noticeCatalogInfo: {},
      /** 公告id */
      noticeId: "",
      /** 提交公告表单 */
      noticeEditForm: {
        title: "",
        author: "",
        type: "",
        endTime: "",
        status: "1", // 0 锁定, 1 未发布, 2 已发布
        content: "",
        coverUuid: "",
        orderBy: ""
      },
      /** 验证 */
      noticeRules: {
        title: [
          {
            required: true,
            message: "请输入标题",
            trigger: "blur"
          },
          {
            min: 1,
            max: 300,
            message: "长度在 1 到 300 个字符",
            trigger: "blur"
          }
        ],
        author: [
          {
            required: true,
            message: "请输入作者",
            trigger: "blur"
          },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "请输入来源",
            trigger: "blur"
          },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur"
          }
        ],
        endTime: [
          {
            type: "date",
            required: true,
            message: "请选择截止时间",
            trigger: "change"
          }
        ]
        // content: [
        //   {
        //     required: true,
        //     message: "请输入内容",
        //     trigger: "blur, change"
        //   }
        // ]
      },
      // 是否上传封面
      isUpCover: false
    };
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
    }
  },
  created() {
    let that = this;
    this.editorOption = quillRedefine({
      // 图片上传的设置
      uploadConfig: {
        action: constants.UPLOAD_URL, // 必填参数 图片上传地址
        // 必选参数  res是一个函数，函数接收的response为上传成功时服务器返回的数据
        // 你必须把返回的数据中所包含的图片地址 return 回去
        res: respnse => {
          return SERVER_URL + "/fastdfs/file/file/" + respnse.data.id;
          s;
        },
        methods: "POST", // 可选参数 图片上传方式  默认为post
        token: sessionStorage.token, // 可选参数 如果需要token验证，假设你的token有存放在sessionStorage
        name: "img", // 可选参数 文件的参数名 默认为img
        size: 10240, // 可选参数   图片限制大小，单位为Kb, 1M = 1024Kb
        accept: "image/png, image/jpeg", // 可选参数 可上传的图片格式
        // start: function (){}
        start: () => {
          commonOper.showLoading("上传图片中，请稍候...");
        }, // 可选参数 接收一个函数 开始上传数据时会触发
        end: fun => {
          commonOper.closeLoading();
        }, // 可选参数 接收一个函数 上传数据完成（成功或者失败）时会触发
        success: () => {}, // 可选参数 接收一个函数 上传数据成功时会触发
        error: () => {} // 可选参数 接收一个函数 上传数据中断时会触发
      },
      // 以下所有设置都和vue-quill-editor本身所对应
      placeholder: "请输入内容" // 可选参数 富文本框内的提示语
      // theme: "", // 可选参数 富文本编辑器的风格
      // toolOptions: [], // 可选参数  选择工具栏的需要哪些功能  默认是全部
      // handlers: {} // 可选参数 重定义的事件，比如link等事件
    });
    // console.log(this.editorOption)
  },
  mounted() {},
  methods: {
    /** 保存公告 */

    submitForm(formName) {
      let that = this;
      if (
        _.map(that.$refs["vUpload"].fileList, "id").length < 1 &&
        this.isUpCover
      ) {
        this.$message({
          type: "success",
          message: "请上传封面！"
        });
        return false;
      }
      if (that.noticeEditForm.content.length < 1) {
        this.$message({
          type: "success",
          message: "请输入内容！"
        });
        return false;
      }
      that.$refs[formName].validate(valid => {
        if (valid) {
          let param = _.cloneDeep(that.noticeEditForm);
          /** 图片ids */
          param.coverUuid = _.map(that.$refs["vUpload"].fileList, "id").join(
            ","
          );
          /** 日期和时间 */
          param.endTime =
            param.endTime.toJSON().split("T")[0] +
            " " +
            param.endTime.toTimeString().split(" ")[0];
          /** 公告目录 */
          param.catalogId = this.noticeCatalogInfo.id;
          // 显示等待页面
          commonOper.showLoading("保存公告中，请稍候...");
          if (that.dialogTitle == "新增菜单内容") {
            debugger;
            service.creatNoticeQuery(param, data => {
              commonOper.closeLoading();
              if (data.code == 200) {
                this.$message({
                  type: "success",
                  message: "新增公告成功！"
                });
                this.resetForm("noticeEditForm", true);
                /** 保存公告*/
                this.$bus.$emit("refreshNoticeTable");
              } else {
                this.$message({
                  type: "info",
                  message: "新增公告失败！"
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
          } else if (that.dialogTitle == "编辑菜单内容") {
            service.updateNoticeQuery(param, data => {
              commonOper.closeLoading();
              if (data.code == 200) {
                this.$message({
                  type: "success",
                  message: "修改公告成功！"
                });
                this.resetForm("noticeEditForm", true);
                /** 保存公告*/
                this.$bus.$emit("refreshNoticeTable");
              } else {
                this.$message({
                  type: "info",
                  message: "修改公告失败！"
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
        } else {
          return false;
        }
      });
    },

    /** 取消保存公告*/
    resetForm(formName, isDeletePhoto) {
      if (!isDeletePhoto) {
        /** 界面操作时增加的图片ID */
        let addPhotoIds = this.$refs["vUpload"].newAddPhoto;
        _.map(addPhotoIds, function(item) {
          service.deletePhotoQuery(item, data => {
            console.log("删除的照片");
          });
        });
      }
      this.$refs[formName].resetFields();
      this.noticeEditForm = {};
      this.noticeEditForm.status = "1";
      this.noticeEditForm.coverUuid = "";
      // 清除已上传附件
      this.$refs["vUpload"].clearFileList();
      this.$data.dialogVisible = false;
    },

    /** 打开公告窗口 */
    openNoticeEditDialog() {
      if (this.dialogTitle == "编辑菜单内容") {
        service.noticeContentQuery(this.noticeId, data => {
          if (data.code == 200) {
            this.noticeEditForm = data.data;
            let that = this;
            data.data.coverUuid =
              data.data.coverUuid == null ? "" : data.data.coverUuid;
            let imgIds = data.data.coverUuid;
            if (imgIds != "") {
              _.map(imgIds.split(","), function(item) {
                that.$refs["vUpload"].fileList.push({
                  id: item,
                  url: SERVER_URL + "/fastdfs/file/file/" + item
                });
              });
            }
            this.noticeEditForm.status = String(this.noticeEditForm.status);
            this.noticeEditForm.endTime = new Date(this.noticeEditForm.endTime);
          } else {
            this.$message({
              type: "info",
              message: "获取公告失败,请稍后再试！"
            });
            this.$data.dialogVisible = false;
          }
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

/* .edit_dialog .quill-editor {
    height: 600px;
  } */

.edit_dialog .ql-container {
  height: 630px;
}
</style>
