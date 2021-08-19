<template>
    <div class="main">
        <el-button round icon="el-icon-back" size="mini" @click="back()">返回</el-button>
        <div class="title" style="margin-top: 28px;">
            <h3>{{detail.title}}</h3>
            <h5 class="mainLH5">
                <span class="f1">{{detail.time}}</span>
                <span class="f1">{{detail.origin}}</span>
            </h5>
        </div>
        <div class="content" style="text-align: left;">
            {{detail.content[0]}}
            <p v-for="item in contents" :key="item.index">{{item}}</p>
        </div>
        <div class="back" style="text-align: left;">
            <h5>{{detail.author}}</h5>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            detail: this.$route.query.detail,
            contents: [],
            id: this.$route.query.id,
            name: this.$route.query.name
        }
    },
    mounted(){
        this.getContents()
    },
    methods: {
        getContents(){
            this.contents = this.detail.content[1]
        },
        back(){
            this.$router.push({ path: '/news', query: { id: this.id, name: this.name}})
        }
    }
}
</script>
<style scoped>
.main{
    margin: 20px;
    background-color: #e47dfd47;
    border: 1px dashed rgb(161, 161, 161);
    border-radius: 45px;
    padding: 20px;
}
.el-button{
    float: left;
}
</style>