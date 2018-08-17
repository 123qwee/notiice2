<template>
    <div class="report">
        <div>
            <img :src="hand_img" alt="" style="width: 100vw;height: 125px;vertical-align:middle;">
            <div class="header">
                <span>为加强平安王家磨社区建设，欢迎广大居民朋友对破坏社会治安、危害公共安全等方面的问题、线索进行举报，综治中心将及时提交相关职能部门查处。</span>
            </div>
        </div>
        <div class="content">
            <div>
                <div class="content_input">
                    <yd-cell-group>
                        <yd-cell-item class="paddingL-40">
                            <span slot="left">事由：</span>
                            <yd-input slot="right" required v-model="form.eventContent" max="20" class="placeholder" maxlength="100" placeholder="请输入事由"></yd-input>
                        </yd-cell-item>
                    </yd-cell-group>
                    <yd-cell-group>
                        <yd-cell-item>
                            <span slot="left">联系电话：</span>
                            <yd-input slot="right" v-model="form.phone" class="placeholder" regex="mobile" placeholder="请输入联系电话"></yd-input>
                        </yd-cell-item>
                    </yd-cell-group>
                    <yd-cell-group>
                        <yd-cell-item>
                            <span slot="left">发生地址：</span>
                            <yd-input slot="right" v-model="form.address" class="placeholder" placeholder="请选择发生地址" style="padding-right: 25px;"></yd-input>
                        </yd-cell-item>
                        <img :src="lonlat" alt="" style="position:absolute;top:15px;right:20px;width: 12px;">
                    </yd-cell-group>
                </div>
                <div class="padding_L_17" style="padding-bottom:7.5px;padding-top: 22.5px;">描述</div>
                <yd-cell-group>
                    <yd-cell-item>
                        <yd-textarea slot="right" placeholder="请输入问题描述" maxlength="100" class="textarea placeholder" v-model="form.content"></yd-textarea>
                    </yd-cell-item>
                </yd-cell-group>
            </div>
            <div class="padding_L_17" style="padding-bottom:6.5px;padding-top: 11.5px;">上传照片或小视频</div>
            <yd-cell-group>
                <div class="upImg_List">
                    <template v-for="(item,index) in imgIds" :keys="index">
                        <div class="img_box">
                            <span class="bg"></span>
                            <span class="del" @click="handleDelImg(item)">x</span>
                            <yd-lightbox-img :src="item.img_id"></yd-lightbox-img>
                        </div>
                    </template>
                    <el-upload class="upload_img" :action="upload_url" :multiple="true" :show-file-list="false" :on-success="handleImgSuccess"
                        :on-error="handleImgError" :auto-upload="true" :before-upload="beforeAvatarUpload">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </div>
            </yd-cell-group>
            <yd-button class="btn-report" size="large" type="primary" @click.native="handleUpdate">上报</yd-button>
        </div>
    </div>
</template>

<script>
    var form = {
        eventContent: "",
        phone: "",
        address: "",
        content: "",
        positionX: 0,
        positionY: 0,
    };
    import MixList from '@/components/mixins/MixList.js';
    export default {
        mixins: [MixList],
        data() {
            return {
                hand_img: require("@/assets/images/report/header.png"),
                lonlat: require("@/assets/images/report/lonlat.png"),
                video: require("@/assets/images/report/video.png"),
                upload_url: constants.UPLOAD_URL,
                imgIds: [],
                form: _.cloneDeep(form),
                config: null,
            }
        },
        created() {
            this.$bus.$emit("triIsChat", false);

            $(document).attr("title", "平安王家磨");
            if(this.$route.query.code){
                this.getConfig(this.$route.query.code);
            }else if(constants.ENV == 'development'){
                this.getConfig("620502007001");
            };
            this.addressDetail();
        },
        methods: {
            addressDetail() {
                let that = this;
                var geolocation = new qq.maps.Geolocation("7YDBZ-JXGWW-B4IRI-R2DFG-HYUJJ-YHBBH", "myapp");
                geolocation.getLocation(showPosition);

                function showPosition(position) {
                    that.form.positionX = position.lng;
                    that.form.positionY = position.lat;
                    console.log(that.form)
                    that.form.address = position.province + position.city + position.addr;
                };
            },
            // 上传成功
            handleImgSuccess(response, file, fileList) {
                popupOper.closeLoading();
                if (response.code != 200) {
                    this.openNotify("上传失败");
                } else {
                    if (response.data.type == "mp4") {
                        this.imgIds.unshift({ img_id: this.video, img_attr: response.data.id });
                    } else {
                        this.imgIds.unshift({ img_id: constants.SERVER_URL + "/fastdfs/file/file/" + response.data.id, img_attr: response.data.id });
                    }
                }
            },
            // 上传失败
            handleImgError(err, file, fileList) {
                popupOper.closeLoading();
                this.openNotify("上传失败");
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'video/mp4';
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
            handleDelImg(id) {
                this.$message({
                    showClose: true,
                    message: '删除成功' + id,
                    type: 'success'
                });
            },
            handleUpdate() {

                if (!this.form.eventContent) {
                    this.openNotify("请输入事由");
                }
                // else if (this.imgIds.length < 1) {
                //     this.openNotify("请上传图片");
                // } 
                else {
                    popupOper.showLoading("上传中...");

                    let form =
                        {
                            "matterDesc": this.form.eventContent,
                            "informantPhone": this.form.phone,
                            "addressDesc": this.form.address,
                            "expand1": this.form.content,
                            "cloudSign": this.config.uid,

                            "positionX": this.form.positionX,
                            "positionY": this.form.positionY,

                            "regionCode": this.config.regionCode,
                            "regionName": this.config.regionName,
                            "streetCode": this.config.streetCode,
                            "streetName": this.config.streetName,
                            "tcommunityCode": this.config.tcommunityCode,
                            "tcommunityName": this.config.tcommunityName,
                            "unitCode": this.config.unitCode,
                            "unitName": this.config.unitName,
                        }
                    if (!this.content) {
                        form.expand1 = _.cloneDeep(form.matterDesc);
                    }
                    let that = this;
                    this.$ajax.ajaxHttp({
                        type: 'post',
                        data: form,
                        url: '/communtiy/buss/matter/publics/front/report',
                        successFunc: data => {
                            if (data.code == 200) {
                                popupOper.closeLoading();
                                this.$dialog.toast({
                                    mes: '上传成功',
                                    timeout: 1500,
                                    icon: 'success'
                                });
                                that.form = _.cloneDeep(form);
                                that.imgIds = [];
                            } else {
                                popupOper.closeLoading();
                                this.$dialog.toast({
                                    mes: '上传失败',
                                    timeout: 1500,
                                    icon: 'error'
                                });
                            }
                        },
                        errorFunc: data => {
                            popupOper.closeLoading();
                            this.$dialog.toast({
                                mes: '上传失败',
                                timeout: 1500,
                                icon: 'error'
                            });
                        }
                    });
                }
            },
            openNotify(message) {
                this.$dialog.notify({
                    mes: message,
                    timeout: 2000,
                });
            }
        }
    }
</script>
<style lang="scss">
    $imgUp_width: 58px;
    .report {
        /* padding: 10px; */
        .header {
            padding: 18.5px 14px 17px 16px;
            padding: 18.5px 14px 17px 20px;
            background: #fff;
            vertical-align: middle;
            span {
                letter-spacing: 1px;
                line-height: 21px;
            }
        }
        .content {
            padding-top: 10px;
            .content_input .yd-cell-item {
                height: 49px;
            }
            .paddingL-40 input {
                padding-left: 52px;
            }
            input {
                padding-left: 21.5px;
            }
            .yd-cell-box {
                margin-bottom: 10px;
            }
            .padding_L_17 {
                padding-left: 17.5px;
            }
            .yd-textarea.textarea {
                padding-left: 4px;
            }
            .placeholder {
                ::placeholder {
                    color: #B2B2B2;
                    font-size: 14px;
                    line-height: 20px;
                }
            }
        }
        /* 图片上传框 */
        .upload_img {
            display: inline-block;
            width: $imgUp_width;
            height: $imgUp_width;
            border: 1px dashed #c0ccda;
            border-radius: 5px;
            font-size: 24px;
            line-height: $imgUp_width;
            text-align: center;
            color: #8C939D;
            background: #FBFDFF;
        }
        .el-upload {
            width: 100%;
        }
        /* 多行文本框和已输入文字数 */
        /* textarea,
        .yd-textarea-counter {
             font-size: 16px; 
        } */
        /* 多行文本框 */
        /* textarea {
            height: 150px;
        } */
        /* 多行文本框下框线 */
        .yd-cell {
            &:after {
                display: none;
            }
        }
        .btn-report {
            max-width: 348px;
            margin: 0 auto;
            border-radius: 5px;
        }
        .upImg_List {
            display: flex;
            flex-wrap: wrap;
            vertical-align: top;
            padding: 15px;
            padding-left: 19px;
            img {
                max-width: $imgUp_width;
                max-height: $imgUp_width;
            }
        }
        .img_box {
            width: $imgUp_width;
            height: $imgUp_width;
            display: flex;
            align-items: center;
            justify-content: center;
            vertical-align: top;
            position: relative;
            margin-right: 0.2rem;
            margin-bottom: 0.3rem;
            .bg {
                position: absolute;
                width: 100%;
                height: 100%;
                background: #000;
                z-index: -1;
                opacity: 0.5;
            }
            .del {
                position: absolute;
                top: -10px;
                right: -10px;
                width: 20px;
                height: 20px;
                background: red;
                border-radius: 50%;
                color: #fff;
                font-weight: bold;
                text-align: center;
                line-height: 20px;
            }
        }
    }
</style>

/* 图片上传框大小 */ .upload_img .el-upload--picture-card, .el-upload-list--picture-card .el-upload-list__item { width: $imgUp_width;
/*no*/ height: $imgUp_width; /*no*/ } /* 图片上传选择按钮虚线边框 */ .upload_img .el-upload--picture-card { line-height: 88px; /*no*/
border: 1px dashed #c0ccda; /*no*/ }