<template>
  <el-table :data="tableData">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline>
          <el-form-item label="昵称" prop="u_name">
            <el-input type="text" v-model="props.row.u_name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="u_password">
            <el-input
              type="password"
              v-model="props.row.u_password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="props.row.u_sex">
              <el-radio label="男">男</el-radio>
              <el-radio label="女">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="props.row.u_age" type="number" disabled></el-input>
          </el-form-item>
          <el-form-item label="生日">
            <el-date-picker
              v-model="props.row.u_birth"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="手机" prop="u_phone">
            <el-input type="text" v-model="props.row.u_phone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="u_email">
            <el-input type="email" v-model="props.row.u_email"></el-input>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="个人信息" prop="u_name"></el-table-column>
    <el-table-column label="操作">
      <el-button size="mini" icon="el-icon-edit" @click="updateUser()"
        >修改</el-button
      >
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  data() {
    return {
      id: localStorage._id,
      tableData: [],
    };
  },
  mounted() {
    this.selectID();
  },
  methods: {
    selectID() {
      this.$axios
        .post("/api/users/consumerMsg", { u_id: this.id }).then((res) => {
          this.tableData = res.data.data;
        });
    },
    updateUser() {
      let password = this.tableData["0"]["u_password"].toString();
      let phone = this.tableData["0"]["u_phone"].toString();
      let email = this.tableData["0"]["u_email"].toString();
      if (email != "用户未设置" && email.indexOf("@") == -1) {
        this.$message("邮箱格式不正确");
      } else{
        if (password.length < 9) {
          this.$message("密码长度必须大于等于9");
        } else if (phone.length !== 11) {
          this.$message("手机号码长度必须为11位");
        } else {
          this.$axios
            .post("/api/users/updateConsumer", {
              u_name: this.tableData["0"]["u_name"],
              u_password: password,
              u_sex: this.tableData["0"]["u_sex"],
              u_age: new Date().getFullYear() - Number(this.tableData["0"]["u_birth"].toString().split(" ")[3]),
              u_picture: null,
              u_birth: this.tableData["0"]["u_birth"],
              u_phone: phone,
              u_email: email,
              u_id: this.id,
              token: localStorage.token
            })
            .then((res) => {
              if (res.data.status == 1) {
                this.$message.error(res.data.message);
              } else {
                this.$message({ message: res.data.message, type: "success" });
              }
              this.selectID();
              this.updateUserName(this.tableData["0"]["u_name"]);
            });
        }
      }
    },
    updateUserName(name){
      if(name != localStorage.u_name){
        localStorage.setItem('u_name', name)
      }
    }
  },
};
</script>
<style scoped>
.el-table {
  widows: 80%;
  border: 1px dotted black;
  border-radius: 20px;
  margin: 20px;
  text-align: center;
}
.el-form {
  width: 400px;
  margin: auto;
}
</style>
