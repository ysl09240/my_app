<template>
  <div class="tags">
    <el-tag
      v-for="(item,index) in tags"
      :key="item.path"
      :closable="item.name !== 'home'"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
      @click="changeMenu(item)"
      @close="handleClose(item,index)"
      size="small"
    >
    {{ item.label }}
    </el-tag>
  </div>
</template>

<style lang="less" scoped>
  .tags {
    padding: 20px;
    .el-tag {
      margin-right: 15px;
      cursor: pointer;
    }
  }

</style>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "CommonTag",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tags: state => state.tab.tabsList
    })
  },
  methods: {
    ...mapMutations(['closeTag']),
    changeMenu(item) {
      this.$router.push({name: item.name});
    },
    handleClose(item,index){
      //1,调用store里的mutations方法,
      this.closeTag(item);
      //2,如果关闭的不是当前页面,直接返回
      if(item.name !== this.$route.name){
        return;
      }
      //3,关闭的是当前页面,需处理跳转
      /**
       * 1,如果删除了最后一个,那么页面跳转到tags数组的前一个
       * 2,如果删除的是中间,页面跳转在最后一页
       */
      const length = this.tags.length;
      if(index == length){
        this.$router.push({name:this.tags[index-1].name});
      }else {
        this.$router.push({name:this.tags[index].name});
      }
    }
  }
}
</script>
