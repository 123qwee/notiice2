<template>
  <div class="notice-upload">
    <el-upload ref="upload" :action="UPLOAD_URL" :on-success="handleUploadSuccess" :on-remove="handleUploadRemove" :on-error="handleUploadError"
      :on-preview="handleUploadPreview" :before-upload="handleUploadBefore" :file-list="fileList" multiple list-type="picture-card">
      <i class="el-icon-plus"></i>
    </el-upload>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        fileList: [],
        /** 新增的图片id */
        newAddPhoto: [],
        /** 新删除的图片 */
        newDeletePhoto: [],
        UPLOAD_URL: constants.UPLOAD_URL, // 附件上传地址
        isExecutableUpload: false, // 是否显示可执行
      }
    },
    methods: {
      // 附件上传成功回调函数
      handleUploadSuccess(response, file, fileList) {
        if (response.code == 200) {
          this.fileList.push({
            id: response.data.id,
            url: SERVER_URL + "/fastdfs/file/file/" + response.data.id
          });
          this.newAddPhoto.push(response.data.id);
        }
      },
      // 附件从列表移除时请求后台删除该附件
      handleUploadRemove(file, fileList) {
        // 如果移除文件不存在，取消执行
        if (!file) {
          return false;
        };
        const fileId = file.id;
        this.newDeletePhoto.push(fileId);
        _.remove(this.fileList, function (item) {
          return item.id == fileId;
        });
      },

      // 附件上传失败回调函数
      handleUploadError(err, file, fileList) {
        console.log(err);
      },
      // 附件预览
      handleUploadPreview(file) {
        // 当前选中文件编号
        let fileId = file.id;
        let fileIndex = 0;

        // 获取文件访问地址数组
        const imageUrls = _.map(this.fileList, (item, index) => {
          if (item.id == fileId) {
            fileIndex = index;
          }
          return SERVER_URL + "/fastdfs/file/file/" + item.id;
        });

        this.$root.$children[0].$refs["vGallery"].imageUrls = imageUrls;
        this.$root.$children[0].$refs["vGallery"].index = fileIndex;
        this.$root.$children[0].$refs["vGallery"].visible = true;
      },
      // 附件上传前验证操作
      handleUploadBefore(file) {
        if (this.fileList.length < 1) {
          const isJPG = file.type === "image/jpeg";
          const isPNG = file.type === "image/png";
          const isLt2M = file.size / 1024 / 1024 < 2;
          if (!isJPG && !isPNG) {
            this.$message.error("上传头像图片只能是 JPG 格式或者 PNG 格式!");
          }
          if (!isLt2M) {
            this.$message.error("上传头像图片大小不能超过 2MB!");
          }
          return (isJPG || isPNG) && isLt2M;
        } else {
          popupOper.showNotification({
            message: "仅可上传一张照片"
          });
          return false;
        }
      },

      // 清除已上传附件
      clearFileList() {
        this.fileList = [];
        /** 新增的图片id */
        this.newAddPhoto = [],
          /** 新删除的图片 */
          this.newDeletePhoto = [],
          this.$refs["upload"].clearFiles();
      }
    }
  }

</script>

<style>
  .notice-upload div:first-child {
    display: flex;
    flex-direction: column-reverse;
  }

  .notice-upload .el-upload-list {
    width: 100%;
    margin-top: 15px;
  }

</style>
