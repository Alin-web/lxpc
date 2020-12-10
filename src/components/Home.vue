<template>
  <div class="home">
    <el-container class="home">
      <!-- 头部 -->
      <el-header>
        <div class="header">
          <div class="col"><img src="../assets/img/home/logo.png" /></div>
          <div class="marshalling">
            <span>
              <i class="iconfont">&#xe6a3;</i>
              {{userName}}
            </span>
            <span @click="exit">退出</span>
          </div>
          <div class="newsDiv" @click="newList"><span>新闻公告</span></div>
        </div>
      </el-header>
      <!-- container-->
      <el-container>
        <!-- aside -->
        <el-aside width="200px">
          <!-- 左侧菜单栏 -->
          <el-menu
            background-color="#ffffff"
            active-text-color="#248bf2"
           
            router
            :default-active="paths"
          >
            <!-- 一级菜单 -->
            <el-submenu
              :index="value.id + ''"
              v-for="value in menuList"
              :key="value.id"
            >
              <!-- <el-menu-item index="1-4-1">选项1</el-menu-item> -->
              <template slot="title">
                <span>{{ value.name }}</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item
                v-for="sonvalue in value.children"
                :key="sonvalue.id"
                :index="sonvalue.link + ''"
                @click="clickSkip(sonvalue.link)"
              >
                <template slot="title">
                  <span>{{ sonvalue.name }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- mian主题内容 -->
        <el-main>
          <!-- 路由占位符 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      paths: "/extensionQimao",
      userName:''
    };
  },
  created() {
    // 获取初始话列表数据
    this.getMenuData();
    this.getUserName()
  },
  mounted() {
    // 在初始化的时候赋值 保证点击刷新的时候刷新的是当前页面
    if (window.sessionStorage.getItem("path") == null) return;
    this.paths = window.sessionStorage.getItem("path");
  },
  methods: {
    ...mapActions(["getMenuData"]),
    getUserName(){
      this.userName =  window.sessionStorage.getItem('name')
    },
    // 退出功能
    exit() {
      // 移除token值
      window.sessionStorage.clear("token");
      this.$router.push("/Login");
    },
    clickSkip(link) {
      //把当前路由存储起来
      window.sessionStorage.setItem("path", link);
      this.paths = link;
    },
    // newList 新闻组件事件
    newList(){
      this.$router.push('/Newslist')
    }
  },
  computed: {
    ...mapState(["menuList"]),
  },
};
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
}
.el-header {
  padding: 0;
}
.header {
  height: 54px;
  background: #248bf2;
}
.col {
  margin-left: 20px;
  margin-top: 14px;
  color: black;
  float: left;
}
.marshalling {
  float: right;
  width: 200px;
  height: 54px;
  background: url("../assets/img/home/marshalling.png");
  span {
    display: inline-block;
    margin-top: 19px;
    margin-left: 20px;
    color: white;
    font-size: 13px;
  }
}
.newsDiv {
  margin-top: 19px;
  color: white;
  float: right;
}
.el-menu {
  border: 0;
}
.el-aside {
  background: #fff;
}
.el-main {
  padding: 0;
}
.el-main {
  background: #f3f5fa;
}
</style>
