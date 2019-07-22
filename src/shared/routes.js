import loadable from '@loadable/component';
const Home = loadable(() => import('./page/Home'));
const Topic = loadable(() => import('./page/Topic'));
const NotFound = loadable(() => import('./page/NotFound'));
const About = loadable(() => import('./page/About'));
import App from './App';
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
