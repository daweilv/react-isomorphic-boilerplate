import React from 'react';
import HomeContainer from './containers/HomeContainer';
import TopicContainer from './containers/TopicContainer';
import NotFound from './components/NotFound';

// 当我加载显示HOME组件之前，我希望调用Home.loadData方法，提前获取到必要的异步数据
// 然后再做服务器端渲染，把页面返回给用户
export default [
    {
        path: '/',
        component: HomeContainer,
        exact: true,
        key: 'home',
        loadData: HomeContainer.loadData,
    },
    {
        path: '/topic/:id',
        component: TopicContainer,
        exact: true,
        key: 'topic',
        loadData: TopicContainer.loadData,
    },
    {
        component: NotFound,
    },
];
