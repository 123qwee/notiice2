<template>
    <div class="newList">
        <yd-slider autoplay="3000" :show-pagination="false">
            <template v-for="(item,index) in img_list" :keys="index">
                <yd-slider-item style="position: relative;">
                    <img :src="item.img">
                    <div class="img_title" style="position:absolute;bottom:0;">
                        <span class="title">{{item.title}}</span>
                        <span class="mask"></span>
                    </div>
                </yd-slider-item>
            </template>
        </yd-slider>
        <yd-pullrefresh :callback="pullloadList" ref="pullrefresh" :show-init-tip="false">
            <yd-infinitescroll :callback="infiniloadList" ref="infinitescroll" distance="50">
                <div class="list" slot="list">
                    <template v-for="(item,index) in list" :keys="index">
                        <div class="list_box" :style="index == list.length - 1 ? 'border:none;' :'' " @click="handleView(item.id)">
                            <div>
                                <div class="title">
                                    <span class="">{{item.title}}</span>
                                </div>
                                <div class="time">
                                    <span>{{item.creatTime}}</span>
                                </div>
                            </div>
                            <div class="img_info_box">
                                <img v-if="item.coverUuid" class="img_info" :src="item.coverUuid" alt="" style="max-width:85px;max-height:85px;">
                                <img v-else class="img_info" :src="img" alt="" style="max-width:85px;max-height:85px;">
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
                img: require("../../../static/img/3.png"),
                img7: require("../../../static/img/6.png"),
                img8: require("../../../static/img/8.png"),
                img_list: [],
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
                        catalogId: this.config.community_News,
                    },
                    url: '/communtiy/buss/notice/findByCatalogId',
                    successFunc: data => {
                        if (data.code == 200) {
                            // 下拉刷新
                            that.$refs.pullrefresh.$emit('ydui.pullrefresh.finishLoad');
                            // 滚动加载
                            that.$refs.infinitescroll.$emit('ydui.infinitescroll.finishLoad');
                            that.list = data.data.list;
                            _.map(data.data.list, (item, index) => {
                                if (index < 4) {
                                    that.img_list.push({
                                        img: item.coverUuid ? item.coverUuid : (Math.floor(Math.random() * 2 + 7) == 7 ? this.img7 : this.img8),
                                        title: item.title,
                                    })
                                }
                            });
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
    .newList {
        .img_title {
            height: 50px;
            width: 100%;
            line-height: 50px;
            position: absolute;
            bottom: 0;
            .title {
                width: 100%;
                height: 50px;
                line-height: 50px;
                position: relative;
                z-index: 1;
                color: #fff;
                padding-left: 10px;
            }
            .mask {
                position: absolute;
                left: 0;
                background: #000;
                width: 100vw;
                height: 100%;
                opacity: 0.7;
            }
        }
        .list_box {
            display: flex;
            height: 104px;
            background: #fff;
            padding: 18px 15px 10px 15px;
            border-bottom: 1px solid #efefef;
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