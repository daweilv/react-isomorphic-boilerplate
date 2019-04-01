import React from 'react';
import Home from './components/Home';
import Topic from './components/Topic';
import NotFound from './components/NotFound';
import { getParam } from './util/urlUtil';
import axios from 'axios';

// 当我加载显示HOME组件之前，我希望调用Home.loadData方法，提前获取到必要的异步数据
// 然后再做服务器端渲染，把页面返回给用户
export default [
    {
        path: '/',
        component: Home,
        exact: true,
        key: 'home',
        loadData: async url => {
            console.log(url);
            const params = getParam(url);
            console.log(params);
            const list = await axios.get('https://cnodejs.org/api/v1/topics', {
                params,
            });
            return list.data;
        },
    },
    {
        path: '/topic',
        component: Topic,
        exact: true,
        key: 'topic',
        loadData: async url => {
            console.log(url);
            const params = getParam(url);
            console.log(params);
            const res = await axios.get(
                'https://cnodejs.org/api/v1/topic/' + params.id,
                {
                    params,
                }
            );
            return res.data;
        },
    },
    {
        component: NotFound,
    },
];
