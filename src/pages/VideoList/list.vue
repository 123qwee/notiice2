<template>
    <div class="video_list">
        <div class="title" id="blur">
            <span>摄像机列表</span>
        </div>
        <yd-pullrefresh :callback="pullloadList" ref="pullrefresh" :show-init-tip="false">
            <yd-infinitescroll :callback="infiniloadList" ref="infinitescroll" distance="50">
                <div class="list" slot="list">
                    <template v-for="(item,index) in list" :keys="index">
                        <div class="list_box" :style="index == list.length - 1 ? 'border:none;' :'' " @click="handleVideo(item.status,item.link)">
                            <div class="img_bg">
                                <img v-if="item.status == '1'" :src="video_1" alt="" style="width:14.5px;">
                                <img v-else :src="video_0" alt="" style="width:14.5px;">
                            </div>
                            <div style="padding-left: 9px;">
                                <div>
                                    <span class="">{{item.title}}</span>
                                </div>
                                <div>
                                    <span :class="item.status == '1' ? 'status_1' : 'status_0'">{{item.status == '1' ? "在线" : "离线"}}</span>
                                </div>
                            </div>
                            <div class="img_info_box" @click="handleViewInfo(item.info,$event)">
                                <img class="img_info" :src="video_info" alt="">
                            </div>
                        </div>
                    </template>
                </div>
            </yd-infinitescroll>
        </yd-pullrefresh>
        <yd-popup v-model="popup" position="center" width="90%">
            <div style="background-color:#fff;border-radius: 5px;color:#808080;">
                <p style="padding: 15px;letter-spacing: 2px;line-height: 27px;">{{info}}</p>
            </div>
        </yd-popup>
    </div>
</template>
<script>
    import MixList from '@/components/mixins/MixList.js';
    export default {
        mixins: [MixList],
        data() {
            return {
                page: 1,
                pageSize: 10,
                video_info: require("@/assets/images/video/info.png"),
                video_1: require("@/assets/images/video/video_1.png"),
                video_0: require("@/assets/images/video/video_0.png"),
                popup: false,
                info: "",
                list: []
            }
        },
        created() {
            this.$bus.$emit("triIsChat", false);
            
            if (this.$route.query.code) {
                this.getConfig(this.$route.query.code, this.loadList);
            } else if (constants.ENV == 'development') {
                this.getConfig("620502007001", this.loadList);
            };
        },
        methods: {
            pullloadList() {
                this.pageSize = 10;
                this.loadList();
            },
            infiniloadList() {
                this.pageSize += 10;
                this.loadList();
            },
            loadList() {
                // 下拉刷新
                this.$refs.pullrefresh.$emit('ydui.pullrefresh.finishLoad');
                // 滚动加载
                this.$refs.infinitescroll.$emit('ydui.infinitescroll.finishLoad');
                this.list = this.config.video;
            },
            popleInfo(value) {
                this.$dialog.notify({
                    mes: value,
                    timeout: 2000,
                });
            },
            handleViewInfo(info, e) {
                e.stopPropagation();    //非IE浏览器
                window.event.cancelBubble = true;
                this.info = info;
                this.popup = true;
            },
            handleVideo(status, link) {
                if (status == '0') {
                    this.popleInfo("此摄像头已离线")
                } else {
                    if (link) {
                        window.open(link);
                    } else {
                        this.popleInfo("打开失败")
                    }
                }
            }
        }
    }
</script>
<style lang="scss">
    .video_list {
        .title {
            height: 47px;
            line-height: 47px;
            background: #4F77AA;
            padding: 0 14px;
            text-align: center;
            span {
                color: #FFFFFF;
                font-size: 16px;
            }
        }
        .list {
            .null_box {
                width: 13.5px;
            }
            .list_box {
                display: flex;
                padding: 9px 0;
                padding-left: 13.5px;
                border-bottom: 1px solid #efefef;
                background: #fff;
                width: 100%;
                position: relative;
                .img_bg {
                    width: 45.5px;
                    height: 45.5px;
                    text-align: center;
                    line-height: 45.5px;
                    background: #FBF6EB;
                }
                .img_info_box {
                    position: absolute;
                    right: 10px;
                    z-index: 1;
                    width: 40px;
                    height: 45px;
                    text-align: center;
                    line-height: 45px;
                    .img_info {
                        width: 14.5px;
                        height: 14.5px;
                    }
                }
                .status_1 {
                    font-size: 14px;
                    color: #40AB57;
                }
                .status_0 {
                    font-size: 14px;
                    color: #B0B0B0;
                }
            }
            .line_bottom {
                border: none;
                height: 1px;
                margin-left: 13.5px;
                background: #D9D9D9;
            }
        }
    }
</style>