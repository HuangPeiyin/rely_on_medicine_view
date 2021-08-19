<template>
  <div class="resetPassword">
    <h3>重置密码</h3>
    <el-form label-width="80px">
      <el-form-item label="昵称">
        <el-input type="text" v-model="name" placeholder="输入昵称"></el-input>
      </el-form-item>
      <el-form-item label="账号">
        <el-input
          type="text"
          v-model="phone"
          placeholder="输入手机号"
        ></el-input>
        <el-button
          type="warning"
          size="small"
          style="margin-top: 20px"
          @click="verify()"
          >验证</el-button
        >
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          type="password"
          v-model="password"
          placeholder="输入密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input
          type="password"
          v-model="repassword"
          placeholder="再次输入密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="confirm()">确定</el-button>
        <el-button class="lastBtn" @click="reset()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      phone: "",
      password: "",
      repassword: "",
    };
  },
  methods: {
    isCorrect() {
      if (
        this.password.toString().length < 9 ||
        this.repassword.toString().length < 9
      ) {
        this.$message.error("密码长度必须大于等于9");
        return false;
      } else if (this.repassword !== this.password) {
        this.$message.error("两次密码不一致");
        return false;
      }
      return true;
    },
    verify() {
      this.$axios
        .post("/api/users/findPassword", {
          u_name: this.name,
          u_phone: this.phone,
        })
        .then((res) => {
          if (res.data.status == 1) {
            this.$message.error(res.data.message);
          } else {
            this.$message({ message: res.data.message, type: "success" });
          }
        });
    },
    confirm() {
      if (this.isCorrect()) {
        this.$axios
          .post("/api/users/findPassword", {
            u_name: this.name,
            u_phone: this.phone,
            repassword: this.repassword,
          })
          .then((res) => {
            if (res.data.status == 1) {
              this.$message.error(res.data.message);
            } else {
              this.$message({ message: res.data.message, type: "success" });
            }
          });
        this.$router.push("/login");
      } else {
        return;
      }
    },
    reset() {
      this.name = "";
      this.phone = "";
      this.password = "";
      this.repassword = "";
    },
  },
};
</script>
<style scoped>
.resetPassword{
    width: 770px;
    margin: auto;
    margin-top: 80px;
    padding: 20px 0;
    padding-right: 60px;
    background-image: url('../assets/image.jpg');
    border-radius: 30px;
}
.el-form-item {
  width: 300px;
  margin: auto;
  margin-bottom: 22px;
}
h3 {
  margin-left: 60px;
}
.el-button--default {
  margin-left: 40px;
}
.el-input{
  opacity: 0.6;
}
</style>