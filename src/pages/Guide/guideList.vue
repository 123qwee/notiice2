<template>
    <div class="guide">
        <yd-accordion>
            <template v-for="(item,index) in list" :keys="index">
                <yd-accordion-item :title="item.name" @click.native="handleQuery(item.id)">
                    <div v-for="(val,key) in item.children" :keys="key" class="card_line" @click="handleView(val.id)">
                        <span>{{val.title}}</span>
                    </div>
                </yd-accordion-item>
            </template>
        </yd-accordion>
    </div>
</template>
<script>
    import MixList from '@/components/mixins/MixList.js';
    export default {
        mixins: [MixList],
        data() {
            return {
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
            loadList() {
                let that = this;
                this.$ajax.ajaxHttp({
                    type: 'get',
                    data: {
                        page: 1,
                        pageSize: 100,
                        catalogId: this.config.Guide_to_affairs,
                    },
                    url: '/communtiy/buss/notice/catalog/findFChildCatalog',
                    successFunc: data => {
                        if (data.code == 200) {
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
            handleQuery(id) {
                let that = this;
                this.$ajax.ajaxHttp({
                    type: 'get',
                    data: {
                        page: 1,
                        pageSize: 10,
                        orderBy: "creatTime",
                        order: "ase",
                        catalogId: id,
                    },
                    url: '/communtiy/buss/notice/findByCatalogId',
                    successFunc: data => {
                        if (data.code == 200 && data.data.list.length > 0) {
                            let list = _.cloneDeep(that.list),
                                id = data.data.list[0].catalogId;
                            that.list = [];
                            that.list = _.map(list, (item, index) => {
                                if (item.id == id) {
                                    item.children = data.data.list
                                }
                                return item;
                            })
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
    .guide {
        .yd-accordion-title {
            font-size: 16px;
        }
        .card_line {
            padding: 12px 15px;
            border-bottom: 1px solid #efefef;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            span {
                color: #a2a0a0;
            }
        }
    }
</style>