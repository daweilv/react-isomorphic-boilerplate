import loadable from '@loadable/component';
import React from 'react'
// import loadable from '@loadable/component';
// import Home from './page/Home';
// import Topic from './page/Topic';
// import NotFound from './page/NotFound';
// import About from './page/About';

import App from './App';
import routesConfig from '../../config/routes.config';
import { loadTopicData, loadTopicsData } from '@/shared/actions';

import Loading from '@/shared/component/Loading';
// const Home = loadable(() => import('./page/Home'), { fallback: <Loading/> });
const Topic = loadable(() => import('./page/Topic'), { fallback: <Loading/> });
const NotFound = loadable(() => import('./page/NotFound'), { fallback: <Loading/> });
const About = loadable(() => import('./page/About'), { fallback: <Loading/> });

export default [
    {
        component: App,
        routes: [
            {
                path: routesConfig.Home,
                component: loadable(() => import('./page/Home'), { fallback: <Loading/> }),
                exact: true,
                key: 'home',
                loadData: (store, { query, params }) =>
                    store.dispatch(loadTopicsData({ ...query, ...params })),
            },
            {
                path: routesConfig.Topic,
                component: Topic,
                key: 'topic',
                loadData: (store, { params }) =>
                    store.dispatch(loadTopicData(params.id)),
            },
            {
                path: routesConfig.About,
                component: About,
                key: 'about',
            },
            {
                component: NotFound,
            },
        ],
    },
];
