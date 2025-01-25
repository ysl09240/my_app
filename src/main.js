import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import './api/mock'
import Cookie from 'js-cookies'


Vue.config.productionTip = false;
Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
  const token = Cookie.getItem("token");
  if(!token && to.name !== 'login'){ // 如果没有token并且当前页不是login登陆页,进入登陆面页
    next({name:'login'});
  }else if(token && to.name == "login"){   //如果用户已经登陆,就直接进入首页
    next({name:'home'});
  }else{
    next();
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  created(){
    store.commit('addMenu',router);
  }
}).$mount('#app')
