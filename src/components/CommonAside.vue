<template>
  <el-menu default-active="1" 
    class="el-menu-vertical-demo" 
    @open="handleOpen" 
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
     active-text-color="#ffd04b">
     <h3>{{isCollapse ? '后台' : '通用管理系统'}}</h3>
    <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{item.label}}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChilren" :key="item.label" :index="item.label">
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{item.label}}</span>
      </template>
      <el-menu-item-group v-for="subItem in item.children" :key="subItem.path" :index="subItem.path" >
        <el-menu-item @click="clickMenu(subItem)" :index="subItem.path">{{subItem.label}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<style lang="less" scopted>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  border-right: none;
  height: 100vh;
  h3 {
    color:#fff;
    text-align: center;
    line-height: 48px;
    font-size: 16px;
    font-weight: 400;
  }
}
</style>

<script>
import Cookie from 'js-cookies'
export default {
  data() {
    return {}
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item){
      if(this.$route.path !== item.path && !(item.path === "/" && this.$route.path ==="/home")){
        this.$router.push(item.path);
      }
      this.$store.commit("selectMenu",item);
    }
  },
  computed: {
    //没有children
    noChildren(){
      return this.menuData.filter(item => !item.children);
    },
    hasChilren(){
      return this.menuData.filter(item => item.children);
    },
    menuData(){
      //判断当前数据,如果缓存中没有,从store中获取
      return JSON.parse(Cookie.getItem('menu')) || this.$store.state.tab.menu;
    },
    isCollapse(){
      console.log("---coloo---{}",this.$store);
      return this.$store.state.tab.isCollapse;
    }
  }
};
</script>
