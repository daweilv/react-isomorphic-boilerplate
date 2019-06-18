import React from 'react';
import HomeContainer from './containers/HomeContainer';
import TopicContainer from './containers/TopicContainer';
import NotFound from './components/NotFound';

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
