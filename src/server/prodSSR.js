let serverBundle;
try {
     serverBundle = require('../../dist/serverBundle');
}catch (e) {
    console.error("🛠 Oops! exec 'npm run build' first, before run start:prod ");
    process.exit(0)
}

const serverRoot = serverBundle.default;
const reducer = serverBundle.reducer;
const routes = serverBundle.routes;
const applyMiddleware = require('redux').applyMiddleware;
const createStore = require('redux').createStore;
const renderToString = require('react-dom/server').renderToString;
const thunkMiddleware = require('redux-thunk').default;
const matchRoutes = require('react-router-config').matchRoutes;
const path = require('path');
const fs = require('fs');

const express = require('express');

module.exports = app => {
    app.use(express.static(path.join(__dirname, '../../dist')));
    app.use(async (req, res, next) => {
        try {
            const store = createStore(
                reducer,
                applyMiddleware(thunkMiddleware)
            );
            const matchedRoutes = matchRoutes(routes, req.originalUrl);
            const promises = [];
            matchedRoutes.forEach(item => {
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
            const html = renderToString(
                serverRoot(req.originalUrl, store, ctx)
            );
            if (ctx.statusCode === 404) {
                res.status(404).end('404 la');
            } else {
                const preloadedState = store.getState();
                if (!res.app.locals._tpl) {
                    res.app.locals._tpl = fs.readFileSync(
                        path.resolve(__dirname, '../../dist/tpl.html'),
                        'utf8'
                    );
                }

                res.send(
                    res.app.locals._tpl
                        .replace(
                            '{script}',
                            `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(
                                preloadedState
                            )}</script>`
                        )
                        .replace('{html}', html)
                );
            }
        } catch (e) {
            next(e);
        }
    });
    console.info(`🌏 Server start at http://localhost:${3001}\n`);
};
