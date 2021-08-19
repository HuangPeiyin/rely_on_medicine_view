<template>
  <div class="home">
    <el-header style="height:50px;padding-top:10px;">
      <div class="iconTag" style="float: left;">
        <h2 class="platform">依医系统</h2>
      </div>
      <div class="userTag">
        <span>用户ID：{{userID}}</span>
        <el-divider direction="vertical" class="spanview"></el-divider>
        <span>{{userName}}</span>
        <el-divider direction="vertical" class="spanview"></el-divider>
        <el-button type="text" size="small" class="el-icon-switch-button" style="color: #556B2F;" @click="unLogin()">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside id="nav" style="width: 180px">
        <el-menu background-color="#d4ced6">
          <el-menu-item>
            <router-link :to="{path: '/news', query:{id: userID, name: userName}}" slot="title">首页</router-link>
          </el-menu-item>
          <el-menu-item>
            <router-link :to="{path: '/search', query:{id: userID, name: userName}}">账本查询</router-link>
          </el-menu-item>
          <el-menu-item>
            <router-link :to="{path: '/steward', query:{id: userID, name: userName}}">身体管家</router-link>
          </el-menu-item>
          <el-menu-item>
            <router-link :to="{path:'/about', query:{id: userID, name: userName}}" >我的信息</router-link>
          </el-menu-item>
        </el-menu>
        <el-image :src="require('../assets/logo1-1.png')"></el-image>
      </el-aside>
      <router-view />
    </el-container>
  </div>
</template>
<script>
export default {
  data(){
    return{
      userID: localStorage._id.toString().substring(14),
      userName: localStorage.u_name
    }
  },
  beforeCreate: function () {
    document.querySelector("body").setAttribute('style','background:#d4ced6')
  },
  beforeDestroy: function (){
    document.querySelector("body").removeAttribute('style')
  },
  methods: {
    unLogin(){
      localStorage.clear()
      this.$router.push({ path: '/login'})
    }
  }
};
</script>
<style scoped>
#body{
  background-color: #d4ced6;
  height: 100%;
}
.el-container{
  width: 100%;
}
.el-image{
  margin-top: 50px;
}
.platform{
  float: left;
  margin-left: 10px;
  margin-top: 0;
  color: #8824a7;
}
.userTag{
  float: right;
  font-size: 0.8em;
}
#nav a{
  font-size: 18px;
}
a {
  font-weight: bold;
  text-decoration: none;
  color: #2c3e50;
}
a.router-link-exact-active {
  color: #c829d6;
}
.el-divider{
  background-color: rgb(198, 100, 228);
}
</style>

