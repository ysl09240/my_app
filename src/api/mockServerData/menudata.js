``` js 数据
menuData: [
    {
      path: "/",
      name: "home",
      label: "首页",
      icon: "s-home",
      url: "Home/Home"
    },
    {
      path: "/mall",
      name: "mall",
      label: "商品管理",
      icon: "video-play",
      url: "MallManage/MallManage"
    },
    {
      path: "/user",
      name: "user",
      label: "用户管理",
      icon: "user",
      url: "UserManage/UserManage"
    },
    {
      label: "其他",
      icon: "location",
      children: [
        {
          path: "/page1",
          name: "page1",
          label: "页面1",
          icon: "setting",
          url: "Other/PageOne"
        },
        {
          path: "/page2",
          name: "page2",
          label: "页面2",
          icon: "setting",
          url: "Other/PageTwo"
        }
      ]
    }
  ]
```js 数据
   //折线图和柱状图的配置项
   let xOptions = reactive({
    //图例文字颜色
    textStyle: {
      color: "#333"
    },
    grid: {
      left: "20%"
    },
    tooltip: {
      trigger: "axis"
    },
    xAxis: {
      type: "category",
      data: [],
      axisLine: {
        lineStyle: {
          color: "#17b3a3"
        }
      },
      axisLabel: {
        interal: 0,
        color: "#333"
      }
    },
    yAxis: {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#17b3a3"
        }
      }
    },
    color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
    series: []
  });
  // 饼状图的配置项
  let pieOptions = reactive({
      tooltip:{
          trigger:"item"
      },
      color:[
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1ef"
      ],
      series:[]
  });