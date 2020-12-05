import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menuList: [],
    /* //七猫推广码列表
    PromotionCode: [], */
    // 数据统计 /api/pc/datareport/qm/list
    Statistics: [],
  },
  mutations: {
    // 菜单栏数据
    menuData(state, res) {
      state.menuList = res;
    },
    // 数据统计
    statisticsData(state, res) {
      state.Statistics = res;
    },
  },
  actions: {
    // 请求左侧菜单栏数据
    async getMenuData(context) {
      const { data: res } = await axios.get("/api/pc/menus/list");
      if (res.responseCode !== 200) return;
      context.commit("menuData", res.body);
    },
	//推广项目 七猫
	
    // 数据统计 七猫
    async getStatisticsData(context, pageRequest) {
      const { data: res } = await axios.get("/api/pc/datareport/qm/list");
      if (res.responseCode !== 200) return;
      // context.commit("a", b); a是mutations中的方法名称 b 是传递到a方法的参数
      context.commit("statisticsData", res.body.list);
      /* console.log(res); */
    },
  },
  modules: {},
});
