export default {
    state: {
        isCollapse: false, //控制菜单展开还是收起
        tabsList: [
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home"
            }
        ]
    },
    mutations: {
        //修改菜单展开收起的方法
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse;
        },
        //更新面包屑数据
        selectMenu(state, val) {
            console.log('val', val);
            //判断添加的数据是不是首页
            if (val.name !== 'home') {
                const index = state.tabsList.findIndex(item => item.name === val.name);
                if (index === -1) {
                    state.tabsList.push(val);
                }
            }
        },
        closeTag(state, val) {
            const index = state.tabsList.findIndex(item => val.name === item.name);
            state.tabsList.splice(index, 1);
        }
    }
}