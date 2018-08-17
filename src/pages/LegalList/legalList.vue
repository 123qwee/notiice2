<template>
    <div class="legal_list">
        <yd-search v-model="seatch" placeholder="请输入您要搜索的法规标题" cancel-text="" :on-submit="loadList"></yd-search>
        <div class="title">
            <span class="line"></span>
            <span class="text">最新{{title}}</span>
        </div>
        <yd-pullrefresh :callback="pullloadList" ref="pullrefresh" :show-init-tip="false">
            <yd-infinitescroll :callback="infiniloadList" ref="infinitescroll" distance="50">
                <div class="list" slot="list">
                    <template v-for="(item,index) in list" :keys="index">
                        <div class="list_box" :style="index == list.length - 1 ? 'border:none;' :'' " @click="handelView(item.id)">
                            <div style="padding-left: 15px;width:100%;">
                                <div class="txt-hidden">
                                    <span class="">{{item.title}}</span>
                                </div>
                                <div class="time">
                                    <img :src="time_icon" alt="">
                                    <span>{{item.creatTime}}</span>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </yd-infinitescroll>
        </yd-pullrefresh>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                seatch: "",
                time_icon: require("@/assets/images/legal/time.svg"),
                title: "",
                id: "",
                list: [],
                page: 1,
                pageSize: 10,
            }
        },
        created() {
            this.$bus.$emit("triIsChat", false);

            this.title = this.$route.query.title;
            this.id = this.$route.query.id;
            this.loadList(this.id);
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
            loadList(id) {
                let that = this;
                this.$ajax.ajaxHttp({
                    type: 'get',
                    data: {
                        page: this.page,
                        pageSize: this.pageSize,
                        orderBy: "creatTime",
                        order: "ase",
                        title: this.seatch ? this.seatch : undefined,
                        catalogId: id ? id : this.id,
                    },
                    url: '/communtiy/buss/notice/searchInCatalogId',
                    successFunc: data => {
                        if (data.code == 200 && data.data && data.data.list.length > 0 ) {
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
            handelView(id) {
                this.$router.push({ path: 'legalView', query: { id: id } })
            }
        }
    }
</script>
<style lang="scss">
    .legal_list {
        background: #F2F2F2;
        height: 100vh;
        .yd-search-input:before,
        .yd-search-input:after {
            display: none;
        }
        .yd-search-input>.search-input {
            height: 40px;
            .yd-input {
                padding: 0 10px;
            }
            .cancel-text {
                display: none;
            }
            .yd-input input::placeholder {
                text-align: center;
                padding-right: 20px;
                color: #9B9B9B;
                font-size: 14px;
            }
        }
        .title {
            padding-left: 10.5px;
            padding-bottom: 6.5px;
            line-height: 21px;
            .line {
                width: 1.5px;
                height: 14px;
                display: inline-block;
                background: #2F7DCD;
                vertical-align: middle;
            }
            .text {
                color: #2F7DCD;
                vertical-align: middle;
            }
        }
        .list {
            background: #fff;
            .list_box {
                height: 75px;
                display: flex;
                align-items: center;
                border-bottom: 1px solid #efefef;
                .txt-hidden {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    width: 98%;
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
                    padding-top: 8px;
                }
            }
        }
    }
</style>
<style>
</style>