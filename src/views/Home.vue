<template>
  <el-row>
    <el-col :span="8" stype="padding-right:10px">
      <div class="grid-content bg-purple">
        <el-card class="box-card">
          <div class="user">
            <img src="../assets/images/userimg.png">
            <div class="userinfo">
              <p class="name">Admin</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>
              上次登陆的时间:
              <span>2021-7-9</span>
            </p>
            <p>
              上次登陆的地点:
              <span>西安</span>
            </p>
          </div>
        </el-card>
        <el-card style="margin-top: 20px;height: 460px;">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column v-for="(val,key) in tableLabel" :key="key" :prop="key" :label="val"/>
          </el-table>
        </el-card>
      </div>
    </el-col>
    <el-col :span="16" style="padding-left: 10px">
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{display: 'flex',padding: 0}"
        >
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{background: item.color}"></i>
          <div class="detail">
            <p class="price">¥{{item.value}}</p>
            <p class="desc">{{item.name}}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px">
        <!-- 折线图 -->
      </el-card>
      <div class="graph">
        <el-card style="height: 260px">
          
        </el-card>
        <el-card style="height: 260px">
          
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import {getData} from '../api'
export default {
  data() {
    return {
      tableData: [],
      tableLabel: {
        name: "课程",
        todayBuy: "今天购买",
        monthBuy: "本月购买",
        totalBuy: "总购买"
      },
      countData: [
        {
          name: "今日支付订单",
          value: "210",
          icon: "success",
          color: "#2ec7c9"
        },
        {
          name: "今日收藏订单",
          value: "1234",
          icon: "star-on",
          color: "#ffb980"
        },
        {
          name: "今日未支付订单",
          value: "310",
          icon: "s-goods",
          color: "#5ab1ef"
        },
        {
          name: "本月支付订单",
          value: "1234",
          icon: "success",
          color: "#2ec7c9"
        },
        {
          name: "本月收藏订单",
          value: "210",
          icon: "star-on",
          color: "#ffb980"
        },
        {
          name: "本月末未支付订单",
          value: "1234",
          icon: "s-goods",
          color: "#5ab1ef"
        }
      ]
    };
  },
  mounted() {
    getData().then(({data}) => {
      const {tableData} = data.data;
      this.tableData = tableData;
    });
  }
};
</script>
<style lang="less" scoped>
.user {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  img {
    margin-right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .userinfo {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access {
      color: #999999;
    }
  }
}
.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;
    span {
      color: #666666;
      margin-left: 60px;
    }
  }
}
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .icon {
    width: 80px;
    height: 80px;
    text-align: center;
    line-height: 80px;
    font-size: 30px;
    color: #fff;
  }
  .detail {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .price {
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }
    .desc {
      font-size: 14px;
      text-align: center;
      color: #999999;
    }
  }
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
}
.graph {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .el-card {
      width: 48%
    }
  }
</style>

