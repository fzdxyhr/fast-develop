<template>
  <div class="aaa">
    <el-container>
        <el-header style="padding: 0;">
            <div class="homepage">
                <div class="logo">
                    <img src="/static/image/logo.png"/>
                </div>
                <div class="logo-content">
                    <span class="spilt"></span>
                    <span class="text">快速开发管理平台</span>
                </div>
                <div style="float: right;margin-top: 15px;margin-right:15px;cursor: pointer;">
                    <el-dropdown style="color:#cfd0d2!important;" trigger="click" @command="handleCommand">
                      <span class="el-dropdown-link">
                        {{loginName}}<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="about">关于</el-dropdown-item>
                        <el-dropdown-item command="exit">退出</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </el-header>
        <el-container>
            <el-aside style="margin-top: 10px;width: auto!important;">
                <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" @select="handleSelect" @open="handleOpen" @close="handleClose"
                         :collapse="isCollapse" background-color="#545c64"
                         text-color="#fff"
                         active-text-color="#ffd04b">
                    <el-menu-item index="1" @click="changeMenu">
                        <i class="el-icon-menu"></i>
                        <span slot="title">{{title}}</span>
                    </el-menu-item>
                    <el-menu-item index="2" @click="go2Content('/index/home')">
                        <i class="el-icon-news"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                    <el-menu-item index="3" @click="go2Content('/index/generate')">
                        <i class="el-icon-news"></i>
                        <span slot="title">代码生成</span>
                    </el-menu-item>
                     <el-menu-item index="4" @click="go2Content('/index/report')">
                        <i class="el-icon-news"></i>
                        <span slot="title">报表管理</span>
                    </el-menu-item>

                </el-menu>
            </el-aside>
            <el-main class="main" id="container">
                <router-view></router-view>
            </el-main>
        </el-container>
        <!--<el-footer style="margin-top: 10px;position: fixed;bottom: 0;">-->
        <!--footer-->
        <!--</el-footer>-->
    </el-container>
    <el-dialog
      title="确认"
      :visible.sync="dialogVisible"
      width="30%">
      <span>是否确定退出系统？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">否</el-button>
        <el-button type="primary" @click="exitConfirm">是</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: "收起",
      loginName: "",
      isCollapse: false,
      dialogVisible: false
    }
  },
    mounted() {
        this.showLoginName();
    },
    computed: {
        defaultActive: function () {
            return this.$store.state.adminleftnavnum;
        }
    },
    methods:{
      showLoginName: function () {
        let self = this;
        const userInfoState = JSON.parse(localStorage.getItem('userInfoState'));
        self.loginName = userInfoState.userInfo.user_name;
      },
      handleCommand: function (command) {
          let self = this;
          if ('exit' == command) {//退出做的动作
              self.dialogVisible = true;
          }
          if ('about' == command) {//关于做的动作

          }
      },
      changeMenu: function () {
          let self = this;
          if (self.isCollapse) {
              self.isCollapse = false;
              self.title = "收起";
          } else if (!self.isCollapse) {
              self.isCollapse = true;
              self.title = "展开";
          }
          console.log(self.isCollapse)
      },
      exitConfirm: function () {
          localStorage.removeItem("userInfoState");//删除登录信息
          this.$router.push("/login");//跳转到首页
      },
      handleSelect: function (key, keyPath) {
          let self = this;
          if (key == 2 || key == 3) {
              this.$store.state.adminleftnavnum = key;

          }
          console.log(key)
      },
      handleOpen: function (key, keyPath) {
          console.log(key, keyPath);
      },
      handleClose: function (key, keyPath) {
          console.log(key, keyPath);
      },
      go2Content: function (url) {
          this.$router.push(url);
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .homepage {
      width: 100%;
      height: 100%;
      background-image: url("/static/image/logo_background.png");
  }

  .indexpage {
      height: 670px;
      background-image: url("/static/image/index.jpg");
      background-position: center center;
      background-repeat: no-repeat;
      background-color: #c3dff7;
  }
  .indexpage span {
      margin-left: 56%;
      margin-top: 6%;
      float: left;

  }
  .logo {
      float: left;
      margin-top: 15px;
      margin-left: 60px;
  }
  .logo img {
      float: left;
      margin-right: 20px;
  }
  .logo-content {
      margin-top: 10px;
      float:left;
      color: rgba(0,180,255,1);
      font-size: 28px;
      font-weight: bolder;
  }
  .logo-content .text {
      margin-left: 15px;
  }
  .logo-content .spilt {
      border-left: 3px solid rgb(105,93,92);
  }
  .open {
      margin-top: 10px;
      width: auto !important;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 670px;
  }

  .el-main {
      padding: 10px 5px;
  }
  .close {
      margin-top: 10px;
      width: auto !important;
  }

  .main {
      /*margin-top: 10px;*/
      margin-left: 5px;
  }
  .el-menu-item.is-active {
      background-color: rgb(67, 74, 80) !important;
  }
</style>
