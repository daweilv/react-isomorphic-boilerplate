import Home from './page/Home';
import Topic from './page/Topic';
import NotFound from './component/NotFound';
import App from './App';
import About from '@/shared/page/About';
import routesConfig from '../../config/routes.config';

export default [
    {
        component: App,
        routes: [
            {
                path: routesConfig.Home,
                component: Home,
                exact: true,
                key: 'home',
                loadData: Home.loadData,
            },
            {
                path: routesConfig.Topic,
                component: Topic,
                key: 'topic',
                loadData: Topic.loadData,
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
