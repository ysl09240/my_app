import Vue from 'vue';
import Vuex from 'vuex';
import tab from './tab'; //这里引入菜单收起和展开的状态管理

Vue.use(Vuex);

//创建vuex实例,管理所有模块的状态,这里也是模块化编程
export default new Vuex.Store({
    modules: {
        tab
    }
})