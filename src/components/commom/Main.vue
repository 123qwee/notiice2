<template>
  <div id="container" class="uk-flex uk-flex-column uk-flex-nowrap">
    <v-head v-if="isChat" ref="header"></v-head>
    <!-- 主页面 -->
    <div class="main uk-flex uk-flex-row uk-flex-nowrap uk-flex-item-1">
      <v-sidebar v-if="isChat" ref="sidebar"></v-sidebar>
      <!-- <transition name="fade" mode="out-in"> -->
      <router-view ref="main" class="center uk-flex-item-1"></router-view>
      <!-- </transition> -->
    </div>
  </div>
</template>

<script>
  import vHead from "./Header";
  import vSidebar from "./Sidebar";
  import elementResizeEvent from "element-resize-event";

  export default {
    components: {
      vHead,
      vSidebar
    },
    data() {
      return {
        isChat: true,
      }
    },
    created() {
      let that = this;
      that.$bus.$on("triIsChat", function (data) {
        that.isChat = data
      });
    },
    mounted() {
      let that = this;

      /** 设置浏览器窗口大小改变事件 */
      elementResizeEvent(this.$el, function () {
        that.$bus.$emit("triScreenResize", {
          width: document.body.clientWidth,
          height: document.body.clientHeight
        });
      });
    }
  };
</script>

<style>
  .center {
    overflow-y: auto;
    padding: 0 5px 5px;

    width: calc(100% - 24px);
    height: 100%;

    -webkit-flex-shrink: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    box-sizing: border-box;
    background-color: transparent;
  }
</style>