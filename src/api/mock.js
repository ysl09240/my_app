import Mock from 'mockjs'
import homeApi from './mockServerData/home'
import userApi from './mockServerData/user'
import permissionApi from './mockServerData/permission'


//定议mock请求拦截
Mock.mock('/api/home/getData',homeApi.getStatisticalData);

//用户数据
Mock.mock('/api/user/add', 'post', userApi.createUser);
Mock.mock('/api/user/edit', 'post',userApi.updateUser);
Mock.mock('/api/user/del', 'post',userApi.deleteUser);
Mock.mock(/api\/user\/getUser/, userApi.getUserList);

//登陆数据
Mock.mock(/api\/permission\/getMenu/, permissionApi.getMenu);


