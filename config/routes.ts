export default [
  {path: '/user', layout: false, routes: [{path: '/user/login', component: './User/Login'}]},
  {
    path: '/welcome', icon: 'smile', menu: {
      name: 'Welcome', // 你希望显示的菜单项文本
    },
  },
  {
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    menu: {
      name: '管理页面', // 你希望显示的菜单项文本
    },
    routes: [
      {path: '/admin/sub-page', name: "图表管理", component: './Admin'},
    ],
  },

  {
    icon: 'table',
    path: '/list',
    menu: {
      name: '表格', // 你希望显示的菜单项文本
    },
    component: './TableList'
  },
  {path: '/', redirect: '/welcome'},
  {path: '*', layout: false, component: './404'},
];
