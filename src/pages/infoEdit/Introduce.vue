<template>
    <div class="info">
        <el-form ref="form" :model="form" label-width="150px">
            <el-row :gutter="10">
                <el-col :span="21">
                    <el-form-item label="县/社区描述：" required>
                        <el-input type="textarea" :rows="10" :maxlength="600" placeholder="请输入内容(最多600字)" v-model="form.content1">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="3" style="text-align:right;">
                    <span>图片：</span>
                </el-col>
                <el-col :span="21">
                    <el-upload class="upload-demo" :action="uploadUrl" ref="imgUpload" :auto-upload="true" :before-upload="beforeAvatarUpload"
                        :on-success="handleImgSuccess">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10M</div>
                    </el-upload>
                    <el-row type="flex">
                        <el-col :span="24" :style="{overflowX:'auto',overflowY:'hidden'}">
                            <template>
                                <el-card v-for="(item,index) in fileList" :key="index">
                                    <div class="img-block">
                                        <img :src="getImgUrl + '/' + item.id" class="image">
                                        <span style="display: inline-block;height:100%;vertical-align: middle;"></span>
                                        <div class="mask"></div>
                                        <div class="del" @click="handleDelImg(item.id,index)">
                                            <img :src="imgListIcon.delImg">
                                        </div>
                                    </div>
                                </el-card>
                            </template>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
    /** 引入上传组件 */
    import vUpload from "../../components/upload/Upload";
    export default {
        components: {
            vUpload
        },
        data() {
            return {
                form: {
                    code: lscache.get("sysCode"),
                    content1: "",
                    content2: "",
                    content3: "",
                },
                uploadUrl: constants.UPLOAD_URL,
                getImgUrl: constants.SERVER_URL + "/fastdfs/file/file/",
                fileList: [],
                imgListIcon: {
                    delImg: require("@/assets/images/main/del.png"),
                },
                imgIds: [],
            }
        },
        created() {

        },
        mounted() {
        },
        methods: {
            // 上传成功
            handleImgSuccess(response, file, fileList) {
                popupOper.closeLoading();
                if (response.code != 200) {
                    this.openNotify("上传失败");
                } else {
                    this.fileList.unshift({ "id": response.data.id })
                }
            },
            // 上传失败
            handleImgError(err, file, fileList) {
                popupOper.closeLoading();
                this.openNotify("上传失败");
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 10;

                if (!isJPG) {
                    this.$message.error('上传文件只能是 JPG/PMG/MP4 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传文件大小不能超过 10MB!');
                }
                if (isJPG && isJPG) {
                    popupOper.showLoading("上传中...");
                }
                return isJPG && isLt2M;
            },
            handleDelImg(id, index) {
                let that = this;
                this.$ajax.ajaxHttp({
                    type: 'post',
                    url: '/fastdfs/file/delete?ids=' + id,
                    successFunc: data => {
                        if (data.code == 200) {
                            that.fileList.splice(index,1);
                            this.$message({
                                showClose: true,
                                message: '删除成功',
                                type: 'success'
                            });
                        }
                    },
                    errorFunc: data => {
                        this.$message({
                            showClose: true,
                            message: '删除成功',
                            type: 'success'
                        });
                    }
                });

            },
        }
    }
</script>
<style>
    /** 文件列表隐藏 */

    .info .el-upload-list.el-upload-list--text {
        display: none;
    }


    /** 卡片样式 */

    .info .el-card {
        /* width: 45%; */
        max-width: 200px;
        margin-left: 10px;
        display: inline-block;
    }

    .info .el-card__body {
        padding: 5px;
        line-height: 115px;
    }

    .info .img-block {
        position: relative;
        height: 115px;
        background: #000;
        text-align: center;
    }

    .info .mask {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background: #000;
        opacity: 0.4;
        display: none;
        cursor: pointer;
    }

    .info .del {
        position: absolute;
        right: 5px;
        top: -45px;
        cursor: pointer;
        display: none;
    }

    .info .el-card:hover .mask,
    .info .el-card:hover .del {
        display: block;
    }

    .info .img-name {
        margin: 0;
        margin-top: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .info .image {
        max-height: 115px;
    }
</style>