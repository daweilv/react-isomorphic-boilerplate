import { renderToString } from 'react-dom/server';
import React from 'react';
import { StaticRouter } from 'react-router';
import App from '../shared/App';
import { matchRoutes } from 'react-router-config';
import routes from '../shared/routes';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from '../shared/reducer';

const renderContent = (location, store, ctx) => {
    return renderToString(
        <Provider store={store}>
            <StaticRouter location={location} context={ctx}>
                <App />
            </StaticRouter>
        </Provider>
    );
};

const server = async (req, res) => {
    const store = createStore(reducer, applyMiddleware(thunkMiddleware));
    const matchedRoutes = matchRoutes(routes, req.path);
    const promises = [];
    matchedRoutes.forEach((item) => {
        const { route, match } = item;
        if (route.loadData) {
            promises.push(
                new Promise(resolve => {
                    route
                        .loadData(store, {
                            params: match.params,
                            query: req.query,
                        })
                        .then(resolve)
                        .catch(resolve);
                })
            );
        }
    });

    await Promise.all(promises);

    const ctx = {};
    // console.log('initialStates===>', initialStates);
    const html = renderContent(req.url, store, ctx);
    console.log('ctx', ctx);
    if (ctx.statusCode === 404) {
        res.status(404).end('404 la');
    } else {
        const preloadedState = store.getState();
        res.render('index', {
            html,
            preloadedState,
        });
    }
};

export default server;
