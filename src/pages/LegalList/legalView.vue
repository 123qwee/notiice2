<template>
    <div class="view">
        <div style="text-align: center;padding-bottom: 20px;">{{content.title}}</div>
        <div v-html="content.content"></div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                content: "",
            }
        },
        created() {
            this.$bus.$emit("triIsChat", false);

            this.$bus.$emit("triIsChat", false);
            this.handleView(this.$route.query.id);
        },
        methods: {
            handleView(id) {
                let that = this;
                this.$ajax.ajaxHttp({
                    type: 'get',
                    data: {
                        noticeId: id,
                    },
                    url: '/communtiy/buss/notice/findById',
                    successFunc: data => {
                        if (data.code == 200) {
                            that.content = data.data;
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
        }
    }
</script>
<style>
    .view {
        padding: 15px;
        background: #fff;
        letter-spacing: 1px;
    }

    .view img {
        width: 100%;
    }
</style>