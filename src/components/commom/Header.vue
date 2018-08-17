<template>
  <div class="header">
    <div class="header-content">
      <div class="header-logo">
        <img :src="imgLogo" alt="公告管理平台">
      </div>
      <div class="header-user">
        <!-- <el-button class="publish-btn" round size="mini" @click="handleInit">公告目录初始化
          <i class="md-icon uk-icon-send-o publish-icon"></i>
        </el-button> -->
        <!-- <img class="header-user-img" :src="imgUser"> -->
        <span class="header-user-name">欢迎您，{{userName}}</span>
        <img class="header-split" :src="imgSplit" alt="分割线">
        <img class="header-logout" @click="handleLogout" :src="imgLogOut" alt="注销">
      </div>
    </div>
    <vQuickNoticeDialog ref="vQuickNoticeDialog"></vQuickNoticeDialog>
  </div>
</template>

<script>
  import loginOper from "../../assets/common/loginOper.js";
  /** 编辑公告弹框 */
  import vQuickNoticeDialog from '../quick_publish/QuickPublishNotice.vue'

  export default {
    components: {
      vQuickNoticeDialog
    },
    data() {
      return {
        imgLogo: require("../../assets/images/main/logo.png"),
        imgUser: require("../../assets/images/main/defavatar.png"),
        imgLogOut: require("../../assets/images/main/icon_quit.png"),
        imgSplit: require("../../assets/images/main/split.png"),
        userName: "用户"
      };
    },

    mounted() {
      let that = this;
      // 设置头部用户信息
      if (lscache.get("userName") != null) {
        that.userName = lscache.get("userName");
      } else {
        this.$bus.$on("triSetUserInfo", value => {
          that.userName = lscache.get("userName");
        });
      }
    },

    methods: {
      handleLogout() {
        let that = this;

        this.$confirm("注销当前登录用户, 是否继续?", "提示", {
          confirmButtonText: "确定",
          confirmButtonClass: "btn-ok",
          cancelButtonText: "取消",
          cancelButtonClass: "btn-back-out",
          type: "warning"
        })
          .then(() => {
            lscache.flush();
            /** 注销成功，返回登录界面 */
            that.$router.push('/Login');
          })
          .catch(() => {
            console.log("取消注销账户");
          });
      },      
    }
  };
</script>

<style>
  .header {
    padding: 0 20px;
    height: 70px;
    will-change: margin;
    -webkit-transition: margin 280ms;
    -moz-transition: margin 280ms;
    transition: margin 280ms;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    background-color: #ffffff;
  }

  .header-content {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .header-logo {
    float: left;
  }

  .header-user {
    float: right;
    line-height: 64px;
  }

  .header-user-img {
    height: 45px;
    width: 45px;
    border-radius: 100px;
    margin-right: 10px;
  }

  .header-split {
    margin-left: 10px;
    margin-right: 10px;
  }

  .header-logout {
    cursor: pointer;
  }

  .publish-btn {
    border-color: #2778b9;
    color: #2778b9;
    margin-right: 10px;
  }

  .publish-btn .publish-icon {
    padding-left: 5px;
  }
</style>