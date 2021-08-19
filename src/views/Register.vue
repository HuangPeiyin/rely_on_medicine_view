<template>
  <div class="register">
    <h3 style="margin-left: 60px">注册</h3>
    <el-form label-width="80px" :rules="rules" :model="ruleForm" ref="ruleForm">
      <!-- <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item> -->
      <el-form-item label="昵称" prop="name">
        <el-input type="text" v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          show-password 
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="repassword">
        <el-input
          type="password"
          v-model="ruleForm.repassword"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="ruleForm.sex">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker
          v-model="ruleForm.birth"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input type="text" v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input type="email" v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addUser('ruleForm')">注册</el-button>
        <el-button @click="reset()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    var validate = (rule, value, callBack) => {
      if (value === "") {
        callBack(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callBack(new Error("两次输入密码不一致!"));
      } else {
        callBack();
      }
    };
    return {
      ruleForm: {
        imageUrl: "",
        picture: "",
        name: "",
        id: "",
        password: "",
        repassword: "",
        sex: "",
        birth: "",
        phone: "",
        email: "",
      },
      rules: {
        name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        password: [
          { required: true, message: "请设置密码", trigger: "blur" },
          {
            type: "string",
            min: 9,
            message: "密码长度必须大于等于9",
            trigger: "change",
          },
        ],
        repassword: [
          { required: true, message: "请确认密码", trigger: "blur" },
          {
            type: "string",
            min: 9,
            message: "密码长度必须大于等于9",
            trigger: "change",
          },
          { validator: validate, trigger: "blur"}
        ],
        phone: [
          { required: true, message: "输入手机号码", trigger: "blur" },
          {
            type: "string",
            len: 11,
            message: "手机号码长度不对",
            trigger: "change",
          },
        ],
        email: [
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  methods: {
    addUser(formM) {
      this.$refs[formM].validate((valid) => {
        if (valid) {
          let age =
            new Date().getFullYear() -
            Number(this.ruleForm.birth.toString().split(" ")[3]);
          this.$axios
            .post("/api/users/register", {
              u_name: this.ruleForm.name,
              u_password: this.ruleForm.password,
              u_sex: this.ruleForm.sex,
              u_age: age,
              u_avatar: this.ruleForm.picture,
              u_birth: this.ruleForm.birth,
              u_phone: this.ruleForm.phone,
              u_email: this.ruleForm.email,
            })
            .then((res) => {
              if (res.data.status == 1) {
                this.$message.error(res.data.message);
              } else {
                this.$message({ message: res.data.message, type: "success" });
                this.$router.push({ path: "/login" });
              }
            });
        } else {
          this.$message.error("信息输入不合法！");
        }
      });
    },
    reset(){
      this.ruleForm.name = ''
      this.ruleForm.password = ''
      this.ruleForm.repassword = ''
      this.ruleForm.sex = ''
      this.ruleForm.birth = ''
      this.ruleForm.phone = ''
      this.ruleForm.email = ''
    }
  },
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 2px solid #b049ca;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 20px;
  color: #8c939d;
  width: 70px;
  height: 70px;
  line-height: 70px;
  text-align: center;
}
.avatar {
  width: 70px;
  height: 70px;
  display: block;
}
/* p {
  font-size: 1px;
  margin: 0px;
  color: red;
} */
.register{
  width: 770px;
  margin: auto;
  margin-top: 30px;
  padding: 20px 0px;
  padding-right: 50px;
  background-image: url('../assets/image.jpg');
  border-radius: 30px;
}
.el-form {
  margin-top: 30px;
}
.el-form-item {
  width: 300px;
  margin: auto;
  margin-bottom: 22px;
}
.spanview {
  position: relative;
  top: 10px;
}
.el-button:last-child {
  margin-left: 40px;
}
.el-input{
  opacity: 0.6;
}
</style>