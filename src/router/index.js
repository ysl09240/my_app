import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import User from '../views/User.vue';
import Main from '../views/Main.vue';
import Mall from '../views/Mall.vue';
import PageOne from '../views/PageOne.vue';
import PageTwo from '../views/PageTwo.vue';

Vue.use(VueRouter);
//1,创建路由组件
//2,将路由与组件进行影射
//3, 创建router实例，然后传 `routes` 配置

const routes = [
    {
        //主路由
        path: '/',
        component: Main,
        redirect: '/home',
        //子路由
        children: [
            { path: 'home', name:'home', component: Home },
            { path: 'user', name:'user', component: User },
            { path: 'mall', name:'mall', component: Mall },
            { path: 'page1', name:'page1',component: PageOne },
            { path: 'page2', name:'page2',component: PageTwo },
        ]
    }
]

const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})

// 捕获并处理 navigationduplicated 错误
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(error => {
    if (error.name === 'NavigationDuplicated') {
        // 可以选择在这里记录日志或进行其他处理
        console.warn('NavigationDuplicated error caught:', error);
      } else {
        throw error;
      }    
  });
}

export default router;
