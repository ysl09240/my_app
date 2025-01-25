import Cookie from 'js-cookies'
export default {
    state: {
        isCollapse: false, //控制菜单展开还是收起
        tabsList: [  //面包屑数据
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home"
            }
        ],
        menu: []
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
        closeTag(state, val) { //删除指定tag数据
            const index = state.tabsList.findIndex(item => val.name === item.name);
            state.tabsList.splice(index, 1);
        },
        //设置menu数据
        setMenu(state,val){
            state.menu = val;
            Cookie.setItem("menu",JSON.stringify(val));
        },
        //动态注册路由
        addMenu(state,router){ 
            //判断当前缓存是否有数据
            if(!Cookie.getItem('menu')) return;
            const menu = JSON.parse(Cookie.getItem('menu'));
            state.menu = menu;
            //组状动态路由的数据
            const menuArray = [];
            menu.forEach(item => {
                if(item.children){
                   item.children =  item.children.map(item =>{
                        item.component = () => import(`../views/${item.url}`);
                        return item;  
                    })
                    menuArray.push(...item.children);
                }else{
                    item.component = () => import(`../views/${item.url}`);
                    menuArray.push(item);
                }
            });
            console.log(menuArray,'menuArray')
            menuArray.forEach(item =>{
                router.addRoute('Main',item);
            });
        }
    }
}