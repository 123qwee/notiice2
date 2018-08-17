<template>
    <div class="service">
        <yd-cell-group>
            <yd-cell-item arrow type="label">
                <img slot="icon" :src="Call">
                <span slot="left">呼叫物业</span>
            </yd-cell-item>
            <yd-cell-item arrow>
                <img slot="icon" :src="Pay">
                <span slot="left">物业缴费</span>
            </yd-cell-item>
        </yd-cell-group>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                Call: require("@/assets/images/service/hujiao.png"),
                Pay: require("@/assets/images/service/jiaof.png"),
            }
        },
        created() {
            this.$bus.$emit("triIsChat", false);
        },
        methods: {

        }
    }
</script>
<style lang="scss">
    .service {
        .yd-cell:after{
            display: none;
        }
        .yd-cell-left {
            span {
                display: inline-block;
                vertical-align: middle;
                height: 26px;
                line-height: 26px;
            }
            .yd-cell-icon img {
                width: 26px;
                height: 26px;
            }
        }
    }
</style>