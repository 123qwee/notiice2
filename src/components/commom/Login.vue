<template>
  <div class="login_bg">
    <div class="login_panel">
      <div class="login_title">
        <span>
          <img style="vertical-align:middle;" :src="imgLogo">
        </span>
        <span style="vertical-align:middle;">菜单管理系统</span>
      </div>
      <el-form class="login_form" :model="form" status-icon size="medium" label-position="top" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="账号" prop="account">
          <el-input v-model="form.account" clearable auto-complete="off" @change="clearPassWord"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" clearable v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-ok" style="border:none;" size="medium" @click="handleLogin">登录</el-button>
          <el-checkbox v-model="isRemember" style="margin-left:20px;">记住密码</el-checkbox>
        </el-form-item>
      </el-form>
    </div>
    <div class="copyright">
      <!-- <span>技术支持：西安科籁信息技术有限公司</span> -->
    </div>
  </div>
</template>

<script>
  import validateOper from '@/assets/scripts/common/validateOper.js';
  import utilsOper from '@/assets/scripts/common/utilsOper';

  export default {
    data() {
      return {
        form: {
          account: '',
          password: ''
        },
        rules: {
          account: [validateOper.valiRequired('请输入用户名！')],
          password: [validateOper.valiRequired('请输入密码！')]
        },
        isRemember: true,
        imgLogo: require('../../assets/images/login/48.png')
      };
    },
    mounted() {
      // 获取缓存的用户名和密码
      this.getCookie();
      let that = this;
      document.onkeydown = function (e) {
        var key = window.event.keyCode;
        if (key == 13) {
          that.handleLogin();
        }
      }
    },
    methods: {
      handleLogin() {
        let that = this;

        this.$refs['form'].validate(valid => {
          if (valid) {
            if (this.isRemember == true) {
              //传入账号名，密码，和保存天数3个参数
              this.setCookie(this.form.account, this.form.password, 7);
            } else {
              this.clearCookie();
            }

            commonOper.showLoading('登录中,请稍候...');

            this.$ajax.ajaxHttp({
              type: 'post',
              postType: 'form',
              url: '/communtiy/basic/login',
              data: this.form,
              successFunc: data => {
                commonOper.closeLoading();
                // 登录成功后查询用户信息和权限信息
                if (data.code == 200) {
                  let userInfo = data.data;
                  if (!lscache.get('userId')) {

                    lscache.set('userId', userInfo.id, 60); // 用户编号
                    lscache.set('userAccount', userInfo.account, 60); // 用户账号
                    lscache.set('userName', userInfo.username, 60); // 用户姓名
                    // lscache.set('roles', userInfo.roleList, 30); // 用户角色信息
                    // lscache.set('photo', userInfo.photo, 30); // 用户头像
                    lscache.set("sysCode", userInfo.communtiyCode, 60); // 系统编号
                    lscache.set("sysName", userInfo.communtiyName, 60); // 系统名称
                    lscache.set("role", userInfo.role, 60); // 角色编号 1 县区 2社区
                  }
                  // 跳转到主页面
                  that.$router.push('/Main');
                }
              },
              errorFunc: data => {
                commonOper.showErrorNoti({
                  message: data.data
                });
              }
            });
          }
        });
      },
      setCookie(c_name, c_pwd, exdays) {
        var exdate = new Date(); //获取时间
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
        //字符串拼接cookie
        window.document.cookie =
          'account' + '=' + c_name + ';path=/;expires=' + exdate.toGMTString();
        window.document.cookie =
          'password' + '=' + c_pwd + ';path=/;expires=' + exdate.toGMTString();
      },
      //读取cookie
      getCookie: function () {
        if (document.cookie.length > 0) {
          var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下

          for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('='); //再次切割
            //判断查找相对应的值
            if (arr2[0] == 'account') {
              this.form.account = arr2[1]; //保存到保存数据的地方
            } else if (arr2[0] == 'password') {
              this.form.password = arr2[1];
            }
          }
        }
      },
      //清除cookie
      clearCookie: function () {
        this.setCookie('', '', -1); //修改2值都为空，天数为负1天就好了
      },
      // 清除用户名后自动清除密码
      clearPassWord() {
        if (!this.form.account) {
          this.form.password = "";
        }
      }
    }
  };
</script>

<style>
  .login_bg {
    height: 100%;
    width: 100%;
    background-image: url('../../assets/images/login/bg.png');
    background-repeat: no-repeat;
    background-size: cover;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .login_panel {
    position: absolute;
    background-color: #fff;
    width: 350px;
    height: 350px;
    right: 10%;
    padding-top: 30px;
  }

  .login_title {
    position: relative;
    z-index: 15;
    font-size: 20px;
    letter-spacing: 2px;
    color: #333;
    text-align: center;
    height: 60px;
    line-height: 60px;
  }

  .login_form {
    height: calc(100% - 60px);
    padding: 0 20px;
  }

  .copyright {
    position: absolute;
    color: white;
    font-family: 微软雅黑;
    font-size: 16px;
    text-align: center;
    bottom: 5%;
    width: 100%;
  }
</style>