<template>
  <el-main class="main">
    <h1 style="margin-top: 0px">社会资讯</h1>
    <span :display="show">{{ msg }}</span>
    <ul v-for="(data, index) in list" :key="index">
      <el-divider style="color: red"></el-divider>
      <li>
        <h4>
          <router-link :to="{path: '/newsInformation', query: { id: id, name: name, detail: newsDetail[index] }}">{{ data.title }}</router-link>
        </h4>
        <p>{{ data.content }}</p>
      </li>
    </ul>
  </el-main>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      id: this.$route.query.id,
      name: this.$route.query.name,
      msg: "",
      show: false,
      list: [],
      newsDetail: [],
    };
  },
  mounted() {
    this.informations();
  },
  methods: {
    informations() {
      this.$axios
        .get("/static")
        .then((res) => {
          let htmlDome = $(res.data);
          let ul = htmlDome.find(".mainL ul");
          let lis = ul.find("li");
          for (let i = 0; i < lis.length; i++) {
            let t = $(lis[i]).find("a")["0"].innerText;
            let h =
              "/newsDetail" +
              $(lis[i]).find("a")["0"].href.toString().substring(21);
            let c = $(lis[i]).find("p")["0"].innerText;
            let data = { title: t, href: h, content: c };
            this.list.push(data);
          }
          this.detail();
        })
        .catch(() => {
          this.isShow();
        });
    },
    isShow() {
      if (this.list.length == 0) {
        this.msg = "网络不佳，请重新刷新...";
        this.show = true;
      }
    },
    detail() {
      for (let i = 0; i < this.list.length; i++) {
        this.$axios.get(this.list[i].href).then((res) => {
          let main = $(res.data).find(".mainL");
          let h5 = main.find(".title h5")["0"];
          let span = $(h5).find("span");
          let cont = main.find(".content #nc_con")["0"];
          let contents = []
          contents.push(cont.childNodes["0"].data)
          contents.push(this.p_content(cont.children))
          let data = {
            title: this.list[i].title,
            time: span["0"].innerText,
            origin: span["1"].innerText,
            content: contents,
            author: main.find(".back")["0"].childNodes["0"].data,
          };
          this.newsDetail.push(data);
        });
      }
      console.log(this.newsDetail);
    },
    p_content(p){
      let ps = []
      for(let i = 0; i < p.length; i++){
        ps.push(p[i].innerText)
      }
      return ps
    }
  },
  watch: {
    show() {
      if (this.list.length == 0) {
        this.msg = "网络不佳，请重新刷新...";
        this.show = true;
      } else if (this.list.length != 0) {
        this.msg = "";
        this.show = false;
      }
    },
  },
};
</script>
<style scoped>
.el-divider {
  background-color: azure;
}
a {
  text-decoration: none;
  color: rgb(22, 111, 212);
}
li {
  display: inline-block;
}
</style>
