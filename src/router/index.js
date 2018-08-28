import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'
import HelloWorld from '@/components/HelloWorld'
import index from '@/components/index'
import login from '@/components/login'
import report from '@/components/report/index'
import generate from '@/components/generate/index'
import home from '@/components/home'

Vue.use(Router)

const router = new Router({
    //myRoutes可以直接用上面的数组替换
    routes: [
    {
      path: '/login',name:'login',component: login
    },
    {
      path: '/',redirect: 'index',meta: {requireAuth: true}
    },
    {
      path: '/index',name:'index',component: index,meta: {requireAuth: true},
      children:[
        {
          path: 'report',name:'report',component: report,meta: {requireAuth: true}
        },
        {
          path: 'home',name:'home',component: home,meta: {requireAuth: true}
        },
        {
          path: 'generate',name:'generate',component: generate,meta: {requireAuth: true}
        }
      ]
    },
    
  ]
});
// 判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next)=> {
    if (to.matched.some(res =>res.meta.requireAuth)) {// 判断是否需要登录权限
        // 不含有用户登录数据，判断 localStorage 中的数据是否可以使用
        const userInfoState = JSON.parse(localStorage.getItem('userInfoState'));
        const pass = userInfoState && userInfoState.timestamp && new Date().getTime() - userInfoState.timestamp <= 60 * 60 * 1000;
        if (pass) {// 判断是否登录
            next()
        } else {// 没登录则跳转到登录界面
            next({
                path: '/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    } else {
        next()
    }
});

export default router;
