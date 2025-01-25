<template>
  <el-form
    ref="loginForm"
    class="login-container"
    :inline="true"
    :rules="rules"
    :model="loginForm"
    label-width="70px"
  >
    <h3 class="login_title">系统登陆</h3>
    <el-form-item label="用户名" prop="username">
      <el-input id="username" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input id="password" v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button style="margin:10px auto 10px 105px" type="primary" @click="submit">登陆</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import Mock from "mockjs";
import Cookie from "js-cookies";
import { getMenu } from "../api";
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        password: [{ required: true, message: "请输入年龄", trigger: "blur" }]
      }
    };
  },
  methods: {
    submit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          getMenu(this.loginForm).then(({ data }) => {
            console.log(data, "logindata");
            if (data.code == 20000) {
              Cookie.setItem("token", data.data.token);
              //获取菜单的数据存入store中
              this.$store.commit('setMenu',data.data.menu);
              //添加动态路由
              this.$store.commit('addMenu',this.$router);
              this.$router.push("/home");
            }else {
                this.$message.error(data.data.message);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.login-container {
  width: 350px;
  margin: 180px auto;
  border: 1px solid #eaeaea;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
  box-sizing: border-box;
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .el-input {
    width: 198px;
  }
}
</style>


