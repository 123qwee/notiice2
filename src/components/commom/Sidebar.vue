<template>
  <div class="sidebar uk-flex uk-flex-item-none">
    <el-menu background-color="#324157" :default-active="onRoutes" @select="handleSelect" :class="classObject" :collapse="isCollapse"
      unique-opened router>
      <div class="sidemenu-top-title">
        <span class="sidemenu-top-text" v-if="!isCollapse">导航菜单</span>
        <span class="sidemenu-tools" :class="[isCollapse?'sidemenu-tools-right':'sidemenu-tools-left']">
          <img :src="shrinkImg" :title="toggleTitle" @click="handleSidemenuToggle">
        </span>
      </div>
      <template v-for="(menu, index) in menus">
        <el-menu-item :index="menu.path" v-if="!menu.children || menu.children.length==0" :key="index">
          <img class="sidemenu-icon" :src="menu.newImg">
          <span slot="title" class="sidemenu-title">{{ menu.name }}</span>
        </el-menu-item>
        <el-submenu :index="getIndex(index)" v-else :key="index">
          <template slot="title">
            <img class="sidemenu-icon" :src="menu.newImg">
            <span slot="title" class="sidemenu-title">{{ menu.name }}</span>
          </template>
          <el-menu-item :index="submenu.path" v-for="(submenu,subindex) in menu.children" :key="index+'-'+subindex">
            <img class="sidemenu-icon" :src="submenu.newImg">
            <span class="sidemenu-title sub-sidemenu-title">{{ submenu.name }}</span>
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import menus from "../../assets/scripts/config/menu_config.js";
import loginOper from "../../assets/common/loginOper.js";

export default {
  data() {
    return {
      state: "init",
      isCollapse: false,
      // 是否显示菜单栏头部
      isShowTopTitle: true,
      // 后台服务获取当前用户权限
      permissions: [],
      // 默认菜单
      defaultMenus: _.cloneDeep(menus),
      // 当前系统登录用户编号
      userId: "",
      // 当前用户菜单
      menus: [],
      index: 0,
      /** 判断是否默认加载第一个菜单，手动单击一级菜单时执行 */
      isTriggerMenu: false,
      /** 收缩按钮图标 */
      shrinkImg: require("../../assets/images/sidebar/shrink.png"),
      spreadImg: require("../../assets/images/sidebar/spread.png")
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    },
    isLeaf(menu) {
      return menu.children && menu.children.length > 0;
    },
    classObject() {
      return {
        "sidebar-menu": !this.isCollapse
      };
    },
    toggleTitle() {
      return this.isShowTopTitle ? "菜单收缩" : "菜单展开";
    }
  },
  created() {
    // 如果当前缓存用户为空，请求服务端获取当前登录用户
    if (!lscache.get("userId")) {
      this.getUserInfo();
    } else {
      this.menus = _.cloneDeep(menus);
    }

    let path = window.location.href.split("#")[1];
    if (path == "/Main" && lscache.get("role") != 1) {
      path = "/NoticeOperation";
    } else if (lscache.get("role") == 1) {
      path = "/InfoEdit";
    }

    let menuData = _.cloneDeep(this.menus);

    let menu = _.filter(menuData, function(item) {
      // 县区
      if (lscache.get("role") == 1) {
        if (item.name == "信息编辑") {
          return item.path == path.substr(1);
        } else {
          return false;
        }
        // 社区
      }
    });
    if(lscache.get("role") == 1){
      this.menus = [];
      this.menus = menu;
    };

    let that = this;
    setTimeout(() => {
      $(".el-menu-item").each(function(key, html) {
        if (menu.length != 0) {
          if (html.textContent.trim() == menu[0].name) {
            html.classList.add("is-menu-active");
          } else {
            html.classList.remove("is-menu-active");
          }
        }
      });
      // 设置菜单图标高亮
      _.map(that.menus, function(item) {
        if (menu.length != 0) {
          if (item.path == menu[0].path) {
            item.newImg = item.imgHover;
          } else {
            item.newImg = item.img;
          }
        }
      });
    }, 500);
  },

  mounted() {
    let that = this;

    // 根据屏幕分辨率设置菜单收缩
    this.isCollapse = document.body.scrollWidth >= 1600 ? false : true;

    // 响应浏览器窗体宽度修改事件
    this.$bus.$on("triScreenResize", value => {
      this.isCollapse = value.width >= 1600 ? false : true;
    });
  },

  methods: {
    getIndex(index) {
      return index + "";
    },
    // 菜单收缩与展开切换
    handleSidemenuToggle() {
      let that = this;
      if (!this.isCollapse) {
        this.isShowTopTitle = false;
        this.$nextTick(() => {
          this.isCollapse = !this.isCollapse;
        });
      } else {
        this.isCollapse = !this.isCollapse;
        this.$nextTick(() => {
          this.isShowTopTitle = true;
        });
      }
    },
    // 获取当前用户信息
    getUserInfo() {
      let that = this;
      loginOper.getUserInfo({
        successFunc: data => {
          that.userId = lscache.get("userId");
          if (lscache.get("role") != 1) {
            that.$router.push("/NoticeOperation");
          } else {
            that.$route.push("/InfoEdit");
          }
          that.$bus.$emit("triSetUserInfo");
        }
      });
    },
    // 计算当前页面菜单
    calMenus() {
      let pmsOne = lscache.get("pmsOne");
      let pmsTwo = lscache.get("pmsTwo");

      // 根据后台请求权限，设置页面菜单
      // 设置一级菜单
      this.menus = _.filter(this.defaultMenus, item => {
        return _.find(pmsOne, {
          perValue: item.path
        });
      });
      // 设置二级菜单
      _.map(this.menus, item => {
        if (item.children && item.children.length > 0) {
          item.children = _.filter(item.children, subItem => {
            return _.find(pmsTwo, {
              perValue: subItem.path
            });
          });
        }
      });
      if (lscache.get("role") != 1) {
        this.$router.push("/NoticeOperation");
      } else {
        this.$route.push("/InfoEdit");
      }
    },

    handleSelect(val) {
      this.$bus.$emit("triIsChat", true);

      let that = this;

      // 菜单更新后执行菜单高亮操作
      this.$nextTick(() => {
        if (arguments[2].$el.className.indexOf("is-menu-active") >= 0) {
          return;
        }
        let menuItems = document.querySelectorAll(".el-menu-item");
        _.map(menuItems, menuItem => {
          menuItem.className = menuItem.className.replace(
            " is-menu-active",
            ""
          );
        });

        arguments[2].$el.className += " is-menu-active";

        // 设置菜单图标高亮
        _.map(that.menus, function(item) {
          if (item.path == val) {
            item.newImg = item.imgHover;
          } else {
            item.newImg = item.img;
          }
        });
      });
    }
  },
  watch: {
    menus(nValue, oValue) {
      // 系统初始化时，默认加载第一个菜单或其子菜单
      if (
        nValue &&
        nValue.length > 0 &&
        this.$router.currentRoute.path == "/Main"
      ) {
        if (!nValue[0].children && nValue[0].path) {
          this.$router.push("/" + nValue[0].path);
        } else if (nValue[0].children && nValue[0].children[0].path) {
          this.$router.push("/" + nValue[0].children[0].path);
        }
      }
    }
  }
};
</script>

<style>
.sidebar {
  height: 100%;

  -webkit-flex-shrink: 1;
  -ms-flex-negative: 1;
  flex-shrink: 1;

  box-shadow: 0 0 4px rgba(0, 0, 0, 0.14), 2px 4px 8px rgba(0, 0, 0, 0.28);
}

.sidebar-menu li {
  width: 260px;
}

/* 防止滚动轴的样式文件导致Dom元素样式修改 */

.sidebar-menu {
  background-color: rgb(50, 65, 87);
}

.sidemenu-title {
  color: #ffffff;
}

/* 选中菜单高亮效果 */

.is-menu-active .sidemenu-title {
  /* color: #3dffd5 !important; */
  color: #00c625 !important;
}

.el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item:hover,
.el-menu--horizontal.el-menu--dark .el-submenu .el-submenu-title:hover,
.el-menu-item:hover {
  background-color: #124681 !important;
}

.el-submenu__title img,
.sidemenu-icon {
  margin-right: 15px;
}

/** 左侧菜单收缩与展开样式 */

.sidemenu-tools {
  float: right;
  cursor: pointer;
}

.sidemenu-tools-left img {
  will-change: transform;
  -webkit-transition: all 2s cubic-bezier(0.4, 0, 0.2, 1);
  transition: all 2s cubic-bezier(0.4, 0, 0.2, 1);

  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}

.sidemenu-tools-right img {
  will-change: transform;
  -webkit-transition: all 2s cubic-bezier(0.4, 0, 0.2, 1);
  transition: all 2s cubic-bezier(0.4, 0, 0.2, 1);

  -webkit-transform: rotate(-180deg);
  transform: rotate(-180deg);
}

.sidemenu-top-title {
  height: 16px;
  color: white;
  padding: 20px;
  font-size: 18px;
}

.sidebar-collapse .sidemenu-top-text {
  display: none;
}
</style>
