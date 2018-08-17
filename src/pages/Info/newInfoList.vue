<template>
    <div class="new_info">
        <yd-pullrefresh :callback="pullloadList" ref="pullrefresh" :show-init-tip="false">
            <yd-infinitescroll :callback="infiniloadList" ref="infinitescroll" distance="50">
                <div class="list" slot="list">
                    <template v-for="(item,index) in list" :keys="index">
                        <div class="list_box" :style="index == list.length - 1 ? 'border:none;' :'' " @click="handleView(item.id)">
                            <!-- <div style="padding-left: 9px;"> -->
                            <div class="img_info_box">
                                <img v-if="item.coverUuid" class="img_info" :src="item.coverUuid" alt="" style="width:85px;">
                                <img v-else class="img_info" :src="newInfo" alt="" style="width:85px;">

                            </div>
                            <div class="content_text">
                                <div class="title">
                                    <span class="">{{item.title}}</span>
                                </div>
                                <div class="stime">
                                    <span>活动开始：{{item.creatTime}}</span>
                                </div>
                                <div class="etime">
                                    <!-- <img :src="time_icon" alt=""> -->
                                    <span>截止时间：{{item.endTime}}</span>
                                </div>
                            </div>
                            <div class="old_time">
                                <img :src="time_old" alt="">
                            </div>
                            <!-- </div> -->
                        </div>
                    </template>
                </div>
            </yd-infinitescroll>
        </yd-pullrefresh>
    </div>
</template>
<script>
    import MixList from '@/components/mixins/MixList.js';
    export default {
        mixins: [MixList],
        data() {
            return {
                time_old: require("@/assets/images/shops/old_time.svg"),
                newInfo: require("../../../static/img/1.png"),
                list: []
            }
        },
        created() {
            this.$bus.$emit("triIsChat", false);

            if(this.$route.query.code){
                this.getConfig(this.$route.query.code, this.loadList);
            }else if(constants.ENV == 'development'){
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
                let that = this;
                this.$ajax.ajaxHttp({
                    type: 'get',
                    data: {
                        page: this.page,
                        pageSize: this.pageSize,
                        orderBy:"creatTime",
                        order:"ase",
                        catalogId: this.config.information_service,
                    },
                    url: '/communtiy/buss/notice/findByCatalogId',
                    successFunc: data => {
                        if (data.code == 200) {
                            // 下拉刷新
                            that.$refs.pullrefresh.$emit('ydui.pullrefresh.finishLoad');
                            // 滚动加载
                            that.$refs.infinitescroll.$emit('ydui.infinitescroll.finishLoad');
                            that.list = data.data.list;
                        }
                    },
                    errorFunc: data => {
                        this.$dialog.toast({
                            mes: '获取失败',
                            timeout: 1500,
                            icon: 'error'
                        });
                    }
                });
            },
            handleView(id) {
                this.$router.push({ path: 'legalView', query: { id: id } })
            },
        }
    }
</script>
<style lang="scss">
    .new_info {
        .list_box {
            display: flex;
            height: 110px;
            padding: 12.5px 14px;
            background: #fff;
            position: relative;
            border-bottom: 1px solid #efefef;
            .content_text {
                position: relative;
                z-index: 1;
                width: 75%;
                .title {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .stime span,
                .etime span {
                    font-size: 13px;
                }
                padding-left: 13px;
                .stime {
                    padding-top: 6.5px;
                }
                .stime,
                .etime {
                    color: #999999;
                }
            }
            .old_time {
                position: absolute;
                z-index: 0;
                right: 15px;
                top: 10px;
                img {
                    width: 95px;
                }
            }
        }
    }
</style>