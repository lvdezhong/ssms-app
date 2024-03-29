// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    name: 'Ant Design Pro',
    locale: true,
    ...defaultSettings,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    // {
    //   path: '/user',
    //   layout: false,
    //   routes: [
    //     {
    //       name: 'login',
    //       path: '/user/login',
    //       component: './user/login',
    //     },
    //   ],
    // },
    // {
    //   path: '/welcome',
    //   name: 'welcome',
    //   icon: 'smile',
    //   component: './Welcome',
    // },
    // {
    //   path: '/admin',
    //   name: 'admin',
    //   icon: 'crown',
    //   access: 'canAdmin',
    //   component: './Admin',
    //   routes: [
    //     {
    //       path: '/admin/sub-page',
    //       name: 'sub-page',
    //       icon: 'smile',
    //       component: './Welcome',
    //     },
    //   ],
    // },
    // {
    //   name: 'list.table-list',
    //   icon: 'table',
    //   path: '/list',
    //   component: './ListTableList',
    // },
    // {
    //   path: '/',
    //   redirect: '/welcome',
    // },
    {
      path: '/',
      redirect: '/students',
    },
    {
      name: 'login',
      path: '/login',
      component: './Login',
      layout: false,
    },
    {
      name: 'student.list',
      icon: 'table',
      path: '/students',
      component: './Students',
    },
    {
      name: 'student.detail',
      path: '/students/detail/:id?',
      component: './Students/Detail',
      hideInMenu: true,
    },
    {
      name: 'course.list',
      icon: 'table',
      path: '/course',
      component: './Course',
    },
    {
      name: 'course.detail',
      path: '/course/detail/:id?',
      component: './Course/Detail',
      hideInMenu: true,
    },
    {
      name: 'grade.list',
      icon: 'table',
      path: '/grade',
      component: './Grade',
    },
    {
      name: 'grade.detail',
      path: '/grade/detail/:id?',
      component: './Grade/Detail',
      hideInMenu: true,
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
