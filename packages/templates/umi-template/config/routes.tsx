import { ConfigRoutes } from '@/types/umi';

export default [
  {
    name: '登录',
    path: '/login',
    component: './Login',
    hideInMenu: true,
  },
  {
    name: '首页',
    path: '/',
    component: './Home',
    icon: 'HomeOutlined',
  },
  {
    name: '设置',
    path: '/setting',
    icon: 'SettingOutlined',
    routes: [
      {
        path: '/setting',
        redirect: '/setting/user',
      },
      {
        name: '用户信息',
        path: '/setting/user',
        component: './Setting/User',
      },
    ],
  },
] satisfies ConfigRoutes;
