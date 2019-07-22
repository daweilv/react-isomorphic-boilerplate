// import loadable from '@loadable/component';
// const Home = loadable(() => import('./page/Home'));
// const Topic = loadable(() => import('./page/Topic'));
// const NotFound = loadable(() => import('./page/NotFound'));
// const About = loadable(() => import('./page/About'));

// import loadable from '@loadable/component';
import Home from './page/Home';
import Topic from './page/Topic';
import NotFound from './page/NotFound';
import About from './page/About';

import App from './App';
import routesConfig from '../../config/routes.config';
import { loadTopicData, loadTopicsData } from '@/shared/actions';

export default [
    {
        component: App,
        routes: [
            {
                path: routesConfig.Home,
                component: Home,
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
