<template>
  <div>
    <div class="extensionQimao">
      <h1>新闻公告</h1>
      <!-- 卡片视图区域 -->
      <el-card class="card">
          <div class="titleBox">
              <h1>{{newsList.title}}</h1>
              <div class="timeBox"><span class="time">发布时间: {{newsList.releaseDate}}</span>艾克塞斯</div>
          </div>
          <div class="content">{{newsList.content}}</div>
          <el-button class="exti" @click="exti">返回上一级</el-button>
          
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
     
  },
  mounted(){
       this.getNewsData()
  },
  methods: {
      async getNewsData(){
          const cid = this.$route.query.curretId
          console.log(cid);
          // 进行数据请求
          const {data:res} = await this.$http.get('/api/pc/notice/detail',
          {params:{'id':cid}
          })
          if(res.responseCode !== 200) return
            this.newsList = res.body
          console.log(res.body);
      },
      exti(){
          this.$router.push('/Newslist')
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
.titleBox{
    padding-bottom: 10px;
    border-bottom: 1px solid #F2F2F2;
    h1{
        font-size: 30px;
    }
}
.timeBox{
     color: #b3b6bc;
}
.time{
   padding-right: 10px;
  
}
.content{
    margin: 20px 0;
    line-height: 28px;  
}
.exti{
    
    font-size: 20px;
}
</style>