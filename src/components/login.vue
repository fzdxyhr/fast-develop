<template>
  <div class="loginBody">
    <div class="login">
      <el-row>
          <h1>快速开发平台</h1>
      </el-row>
      <el-row>
          <el-input id="name"  v-model="name" placeholder="请输入帐号">
              <template slot="prepend">帐号</template>
          </el-input>
       </el-row>
       <el-row>
          <el-input id="password" v-model="password" type="password" placeholder="请输入密码" @keyup.enter.native="check">
              <template slot="prepend">密码</template>
          </el-input>
       </el-row>
       <el-row>
          <el-button id="login" @click="check" style="width:50%" type="primary">登录</el-button>
       </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      password: "",
      name: "",
      userInfo: {}
    }
  },
  mounted() {
        // this.showLoginName();
    },
  methods: {
      check: function () {
          let self = this;
          //获取值
          var name = self.name;
          var password = self.password;
          if (name == '' || password == '') {
              self.$message({
                  message: '账号或密码为空！',
                  type: 'error'
              })
              return;
          }
          if (!(name == 'admin' && password == 'admin')) {
              self.$message({
                  message: '账号或密码错误！',
                  type: 'error'
              })
              return;
          }
          self.userInfo.user_name = name;
          self.userInfo.user_account = name;
          const userInfo = self.userInfo;
          localStorage.setItem('userInfoState', JSON.stringify({
              userInfo,
              timestamp: new Date().getTime()
          }));
          localStorage.setItem("index", "2");
          this.$router.push("/index");//跳转到首页
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login .el-row {
      margin-bottom: 20px;
      margin-left: 15px;
      width: 350px;
  }

  .login {
      text-align: center;
      width: 380px;
      height: 300px;
      margin-top: 10%;
      margin-left: 40%;
      box-shadow: darkgrey 0px 0px 30px 5px;
  }
</style>
