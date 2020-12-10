<template>
  <div class="lc">
    <div class="extensionQimao">
      <h1>常规管理-拉新教程</h1>
      <!-- 卡片视图区域 -->
      <el-card class="card">
        <div class="box" v-for="(item, index) in obj" :key="index">
          <h1>{{ item.title }}</h1>
          <div class="fatherBox">
            <div class="imageBox img">
              <el-image :src="item.img"></el-image>
              <div class="but">
                <el-button type="primary" @click="Imagedownload(item.img)"
                  >保存图片</el-button
                >
                <el-button type="success" @click="copy(item.img)"
                  >复制链接</el-button
                >
              </div>
            </div>
            <div class="imageBox">
              <el-image :src="item.img2"></el-image>
              <div class="but">
                <el-button type="primary" @click="Imagedownload(item.img2)"
                  >保存图片</el-button
                >
                <el-button type="success" @click="copy(item.img2)"
                  >复制链接</el-button
                >
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import LoginVue from '../Login.vue';
export default {
  data() {
    return {
      // 注释
      image: [],
      // begin
      obj: [],
    };
  },
  created() {
    this.getLcData();
  },
  methods: {
    async getLcData() {
      const { data: res } = await this.$http.get(
        "/api/pc/normalManage/lxteach"
      );
      if (res.responseCode !== 200) return;
      this.obj = res.body;
      console.log(this.obj);
    },
    // 复制图片链接
    copy(url) {
      this.$copyText(url).then(
        function (e) {},
        function (e) {
          alert("未复制成功");
          console.log(e);
        }
      );
    },
    // save 保存图片事件
    async Imagedownload(url) {
      this.$message.error('图片下载失败')
      /* console.log(url);
      const result = await this.$http.get(url) */
      /* console.log(result); */
    },
  },
};
</script>
<style lang="less" scoped>
.extensionQimao {
  margin: 20px 0 0 0;
  padding: 0 20px;
  h1 {
    margin-bottom: 20px;
    font-size: 20px;
  }
}
.lc {
  width: 100%;
}
.box {
  width: 100%;
  margin-top: 20px;
  h1 {
    text-align: center;
    font-size: 30px;
    font-weight: 500;
  }
}
.fatherBox {
  display: flex;
}
.imageBox {
  width: 40%;
  margin: 20px 20px 0 80px;
}
.el-image {
  width: 100%;
  height: 300px;
}
.but {
  margin-top: 20px;

  display: flex;
  justify-content: space-around;
}
</style>