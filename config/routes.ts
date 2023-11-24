export default [
  { path: '/user', layout: false, routes: [{ path: '/user/login', component: './User/Login' }] },
  { path: '/user/register', layout: false, routes: [{ path: '/user/register', component: './User/Register' }] },
  {
    path: '/analysis',
    icon: 'smile',
    menu: {
      name: '智能分析', // 你希望显示的菜单项文本
    },
    component: './Chart/AddChart',
  },
  {
    path: '/async',
    icon: 'barChart',
    menu: {
      name: '智能分析(异步)', // 你希望显示的菜单项文本
    },
    component: './Chart/AddChartAsync',
  },
  {
    path: '/chart/list',
    icon: 'areaChart',
    menu: {
      name: '图表管理', // 你希望显示的菜单项文本
    },
    component: './Chart/ChartList',
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

  { path: '/', redirect: '/analysis' },
  { path: '*', layout: false, component: './404' },
];
