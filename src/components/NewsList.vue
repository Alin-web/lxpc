<template>
  <div>
    <div class="extensionQimao">
      <h1>新闻公告</h1>
      <!-- 卡片视图区域 -->
      <el-card class="card">
            <el-row class="item" v-for="item in newsList" :key="item.id">
                <el-col :span="24" >
                   <span @click="details(item)">{{item.title}}</span>
            </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 请求参数
      pageRequest: {
        page: 1,
        pagesize: 5,
      },
      // 页面渲染数据
      newsList: [],
    };
  },
  created() {
    this.getNewsList();
  },
  methods: {
    // 初始化参数请求
    async getNewsList() {
      const { data: res } = await this.$http.get("/api/pc/notice/list", {
        params: {
          "pageRequest.page":  this.pageRequest.page,
          "pageRequest.page": this.pageRequest.pagesize,
        },
      });
      /* console.log(res); */
      if (res.responseCode !== 200) return;
      this.newsList = res.body.list;
      console.log(res.body.list);
    },
    // details 详情页面
    details(curretnline){
        /* console.log(curretnline.id); */
        this.$router.push({path:'/NewsDetails', query: {curretId: curretnline.id }})
    }
  },
};
</script>
<style lang="less" scoped>
.extensionQimao {
  padding: 0 20px;
  h1 {
    margin-bottom: 20px;
    font-size: 20px;
  }
}
.item {
margin-top: 20px;
  color: #b3b6bc;
  padding-bottom: 10px;
  border-bottom: 1px dashed #b3b6bc;
}
</style>