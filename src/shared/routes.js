import React from 'react';
import App from './App';
import Home from './components/Home';
import Topic from './components/Topic';
import NotFound from './components/NotFound';

// 当我加载显示HOME组件之前，我希望调用Home.loadData方法，提前获取到必要的异步数据
// 然后再做服务器端渲染，把页面返回给用户
export default [
    {
        path: '/',
        component: App,
        routes: [
            {
                path: '/',
                component: Home,
                exact: true,
                key: 'home',
            },
            {
                path: '/topic',
                component: Topic,
                exact: true,
                key: 'topic',
            },
            {
                component: NotFound,
            },
        ],
    }
];
