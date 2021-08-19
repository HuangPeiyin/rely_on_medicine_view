<template>
  <div class="login">
    <div class="left">
      <img :src="require('../assets/logo1-1.png')" alt="" />
      <span
        >一个提供给用户记录自己的健康信息，可以浏览相关社会资讯，查看药品、疾病、医学书籍的平台</span
      >
    </div>
    <div class="right">
      <h3 style="margin-top: 0; margin-bottom: 30px">登录</h3>
      <el-form label-width="40px">
        <el-form-item label="账号">
          <el-input
            type="text"
            v-model="phone"
            placeholder="输入手机号码"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            type="password"
            v-model="password"
            placeholder="输入用户密码"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button
        type="text"
        size="small"
        class="spanview"
        @click="findPassword()"
        >忘记密码</el-button
      >
      <div class="btn">
        <el-button type="primary" @click="login()">登录</el-button>
        <el-button @click="register()">注册</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      phone: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.$axios
        .post("/api/users/login", {
          u_phone: this.phone,
          u_password: this.password,
        })
        .then((res) => {
          if (res.data.status == 1) {
            this.$message.error(res.data.message);
          } else {
            localStorage.setItem("token", res.data.data.token);
            localStorage.setItem("u_name", res.data.data.consumer[0].u_name);
            localStorage.setItem("_id", res.data.data.consumer[0]._id);
            this.$message({
              message: res.data.message,
              type: "success",
            });
            this.$router.push({
              path: "/home",
              query: {
                id: res.data.data.consumer[0]._id.toString().substring(14),
                name: res.data.data.consumer[0].u_name,
              },
            });
          }
        });
    },
    register() {
      this.$router.push({ path: "/register" });
    },
    findPassword() {
      this.$router.push({ path: "/findBackPW" });
    },
  },
};
</script>
<style scoped>
.login {
  width: 720px;
  height: 400px;
  margin: auto;
  margin-top: 70px;
  padding: 50px;
  background-image: url('../assets/login.jpg');
  border-radius: 30px;
}
.left {
  width: 300px;
  float: left;
  display: flex;
  flex-direction: column;
}
img {
  width: 200px;
  height: 195px;
  margin: auto;
  margin-top: 20px;
}
span {
  font-family: "FangSong";
  font-size: 1.4rem;
  margin-top: 30px;
  color: rgb(153, 31, 153);
}
.right {
  float: right;
  padding: 30px;
  margin-top: 40px;
  border: 1px solid purple;
  border-radius: 45px;
}
.el-form-item {
  margin-bottom: 22px;
}
.el-form-item:last-child {
  margin-bottom: 0;
}
.spanview {
  margin-left: 220px;
  color: red;
}
.btn {
  margin-top: 20px;
}
.btn .el-button:first-child {
  margin-right: 30px;
}
.el-input{
  opacity: 0.6;
}
</style>