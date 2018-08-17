<template>
    <div class="legal">
        <template v-for="(item,index) in menu" :keys="index">
            <yd-flexbox v-if="index%2 == 0">
                <yd-flexbox-item class="menu_box" @click.native="handleList(menu[index].id,menu[index].name)">
                    <img :src="menu[index].img" alt="" class="img">
                    <div>{{menu[index].name}}</div>
                </yd-flexbox-item>
                <yd-flexbox-item v-if="index < menu.length - 1" class="menu_box" @click.native="handleList(menu[index + 1].id ,menu[index + 1].name)">
                    <img :src="menu[index + 1].img" alt="" class="img">
                    <div>{{menu[index + 1].name}}</div>
                </yd-flexbox-item>
                <yd-flexbox-item v-else class="menu_box">
                </yd-flexbox-item>
            </yd-flexbox>
        </template>
    </div>
</template>
<script>
    import MixList from '@/components/mixins/MixList.js';
    export default {
        mixins: [MixList],
        data() {
            return {
                menu: [],
                img_icon: [
                    require("@/assets/images/legal/falv.png"),
                    require("@/assets/images/legal/xingzheng.png"),
                    require("@/assets/images/legal/difang.png"),
                    require("@/assets/images/legal/bumen.png")
                ],
            }
        },
        created() {
            this.$bus.$emit("triIsChat", false);

            if(this.$route.query.code){
                this.getConfig(this.$route.query.code, this.getMenu);
            }else if(constants.ENV == 'development'){
                this.getConfig("620502007001", this.getMenu);
            };
        },
        methods: {
            getMenu() {
                let that = this;
                this.$ajax.ajaxHttp({
                    type: 'get',
                    data: {
                        page: this.page,
                        pageSize: this.pageSize,
                        catalogId: this.config.Legal_education,
                    },
                    url: '/communtiy/buss/notice/catalog/findFChildCatalog',
                    successFunc: data => {
                        if (data.code == 200) {
                            let number = 0;
                            that.menu = _.map(data.data.list, (item, index) => {
                                if (number < 4) {
                                    return {
                                        id: item.id,
                                        name: item.name,
                                        img: that.img_icon[number++],
                                    }
                                } else {
                                    number = 0;
                                    return {
                                        id: item.id,
                                        name: item.name,
                                        img: that.img_icon[number],
                                    }
                                };
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
            handleList(id, name) {
                this.$router.push({ path: 'legalList', query: { id: id, title: name } })
            }
        }
    }
</script>
<style>
    .legal {
        height: 100vh;
        background: #fff;
    }

    .legal .menu_box {
        text-align: center;
        padding-top: 60px;
    }

    .legal .img {
        width: 36px;
        height: 34px;
        ;
    }
</style>