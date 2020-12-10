import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入 Login 登录组件
import Login from '../components/Login.vue'
// 导入home组件
import Home from '../components/Home.vue'
// 导入第一个七猫组件
import  ExtensionQimao from '../components/ExtensionQimao.vue'
// 导入第二个七猫组件 StatisticsQimao
import StatisticsQimao from '../components/StatisticsQimao.vue'
//导入体现设置 组件
import WithdrawSet from '../components/management/WithdrawSet.vue'
//导入提现设置 组件
import LxCourse from '../components/management/LxCourse.vue'
//导入修改密码组件
import Pwd from '../components/management/Pwd.vue'
// 导入新闻组件
import Newslist from '../components/NewsList.vue'
// 导入新闻子组件
import NewsDetails from '../components/newsDetails.vue'
Vue.use(VueRouter)

const routes = [
  // 路由重定向
  { path: '/', redirect: '/Login' },
  { path: '/Login', component: Login },
  { path: '/Home',
    component: Home,
    redirect: '/ExtensionQimao',
    children:[
      { path: '/ExtensionQimao', component: ExtensionQimao },
      { path: '/StatisticsQimao', component: StatisticsQimao },
      { path: '/WithdrawSet', component: WithdrawSet },
      { path: '/LxCourse', component: LxCourse },
      { path: '/Pwd', component: Pwd },
      { path: '/NewsList', component: Newslist},
      {path: '/NewsDetails', component: NewsDetails} 
    ]
  },
]


const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转
  if (to.path === '/Login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/Login')
  next()
})

export default router
