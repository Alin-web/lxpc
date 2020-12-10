import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
// vuex 应用场景:多个组件共享数据或者是跨组件传递数据 勿在vuex中发送数据请求
export default new Vuex.Store({
  state: {
    menuList: [],
    /* userNum:'', */
  },
  mutations: {
    // 菜单栏数据
    menuData(state, res) {
      state.menuList = res;
    },
    //用户账号 页面刷新的时候vuex的数据会丢失 
    /* num(state,option){
      // 因为state中userNmu是字符串属性 所以下面赋值的时候无法把数字赋值给字符串 需要转化赋值
      state.userNum = option + '';
      console.log(option);
    } */
  },
  // 异步请求
  actions: {
    // 请求左侧菜单栏数据
    async getMenuData(context) {
      const { data: res } = await axios.get("/api/pc/menus/list");
      if (res.responseCode !== 200) return;
      context.commit("menuData", res.body);
    },
  },
  modules: {},
});
