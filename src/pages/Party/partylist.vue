<template>
    <div class="party">
        <yd-pullrefresh :callback="pullloadList" ref="pullrefresh" :show-init-tip="false">
            <yd-infinitescroll :callback="infiniloadList" ref="infinitescroll" distance="50">
                <div class="list" slot="list">
                    <template v-for="(item,index) in list" :keys="index">
                        <div class="list_box" :style="index == list.length - 1 ? 'border:none;' :'' " @click="handleView(item.id)">
                            <div style="padding-left: 9px;">
                                <div class="title">
                                    <span class="">{{item.title}}</span>
                                </div>
                                <div class="content_info">
                                    <span>{{item.remark}}</span>
                                </div>
                                <div class="time">
                                    <img :src="time_icon" alt="">
                                    <span>{{item.creatTime}}</span>
                                </div>
                            </div>
                            <div class="img_info_box">
                                <img v-if="item.coverUuid" class="img_info" :src="item.coverUuid" alt="" style="max-width:85px;max-height:85px;">
                                <img v-else class="img_info" :src="dj" alt="" style="max-width:85px;max-height:85px;">
                            </div>
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
                time_icon: require("@/assets/images/legal/time.svg"),
                dj: require("../../../static/img/5.png"),
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
                        catalogId: this.config.party_building,
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
    .party {
        .list_box {
            display: flex;
            height: 104px;
            background: #fff;
            padding: 18px 15px 10px 10px;
            margin-bottom: 5px;
            position: relative;
            >div:first-child {
                width: 76%;
            }
            .title,
            .content_info {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .content_info {
                padding-top: 5px;
                span {
                    font-size: 14px;
                    color: #9DA4B3;
                }
            }
            .time {
                img {
                    width: 13px;
                    vertical-align: middle;
                }
                span {
                    vertical-align: middle;
                }
                color: #9DA4B3;
                font-size: 14px;
                padding-top: 8px;
            }
            .img_info_box {
                position: absolute;
                right: 10px;
                top: 10px;
            }
        }
    }
</style>