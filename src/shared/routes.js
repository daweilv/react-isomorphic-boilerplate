import Home from './page/Home';
import Topic from './page/Topic';
import NotFound from './component/NotFound';
import App from './App';

export default [
    {
        component: App,
        routes: [
            {
                path: '/',
                component: Home,
                exact: true,
                key: 'home',
                loadData: Home.loadData,
            },
            {
                path: '/topic/:id',
                component: Topic,
                exact: true,
                key: 'topic',
                loadData: Topic.loadData,
            },
            // {
            //     component: NotFound,
            // },
        ],
    },
];
