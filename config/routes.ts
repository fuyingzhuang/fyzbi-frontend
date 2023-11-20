export default [
  { path: '/user', layout: false, routes: [{ path: '/user/login', component: './User/Login' }] },
  { path: '/user/register', layout: false, routes: [{ path: '/user/register', component: './User/Register' }] },
  {
    path: '/welcome',
    icon: 'smile',
    menu: {
      name: 'Welcome', // 你希望显示的菜单项文本
    },
  },
  {
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    menu: {
      name: '管理页面', // 希望显示的菜单项文本
    },
    // routes: [
    //   {path: '/admin/sub-page', name: "图表管理", component: './Admin'},
    // ],
  },

  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
