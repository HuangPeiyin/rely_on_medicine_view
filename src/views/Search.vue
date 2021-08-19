<template>
  <el-main id="search">
    <el-tag type="success" class="cell" @click="toDrug">查药品</el-tag>
    <el-tag type="info" class="cell" @click="toSick"> 查疾病 </el-tag>
    <el-tag class="cell" @click="toBook" style="margin-right: 0"> 查书籍 </el-tag>
    <router-view />
  </el-main>
</template>
<script>
export default {
  methods: {
    toDrug() {
      this.$router.push({ name: "Drug" });
    },
    toSick() {
      this.$router.push({ name: "Sick" });
    },
    toBook() {
      this.$router.push({ name: "Book" });
    },
  },
};
</script>
<style scoped>
.cell {
  width: 120px;
  height: 50px;
  border: 1px solid purple;
  border-radius: 0.5em;
  padding-top: 10px;
  margin-right: 90px;
  margin-bottom: 10px;
  font-size: 18px;
  box-shadow: 20px -10px 10px rgb(136, 135, 135);
}
</style>