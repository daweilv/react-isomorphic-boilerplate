const applyMiddleware = require('redux').applyMiddleware;
const createStore = require('redux').createStore;
const MemoryFs = require('memory-fs');
const path = require('path');
const renderToString = require('react-dom/server').renderToString;
const thunkMiddleware = require('redux-thunk').default;
const matchRoutes = require('react-router-config').matchRoutes;
const webpack = require('webpack');
const isObject = require('is-object');
const middleware = require('webpack-dev-middleware');
const serverConfig = require('../../build/webpack.dev.server');
const clientConfig = require('../../build/webpack.dev.client');

let serverCompiler, serverBundle, reducer, routes;
const serverPromise = new Promise(resolve => {
    console.time('serverCompiler');
    serverCompiler = webpack(serverConfig);
    const mfs = new MemoryFs();
    serverCompiler.outputFileSystem = mfs;
    serverCompiler.watch({}, (err, stats) => {
        if (err) throw err;
        stats = stats.toJson();
        stats.errors.forEach(err => console.error(err));
        stats.warnings.forEach(warn => console.warn(warn));

        // 获取bundle文件路径
        const bundlePath = path.join(
            serverConfig.output.path,
            serverConfig.output.filename
        );
        const bundle = mfs.readFileSync(bundlePath, 'utf8');
        const Module = module.constructor;
        const m = new Module();
        m._compile(bundle, 'serverBundle.js');
        serverBundle = m.exports.default;
        reducer = m.exports.reducer;
        routes = m.exports.routes;
        console.timeEnd('serverCompiler');
        resolve();
    });
    // resolve();
});

let clientCompiler;
let instanceMiddleware;
const clientPromise = new Promise(resolve => {
    console.time('clientCompiler');
    clientCompiler = webpack(clientConfig);
    instanceMiddleware = middleware(clientCompiler, { logLevel: 'error' });
    instanceMiddleware.waitUntilValid(() => {
        console.timeEnd('clientCompiler');
        resolve();
    });
});

function normalizeAssets(assets) {
    if (isObject(assets)) {
        return Object.values(assets);
    }

    return Array.isArray(assets) ? assets : [assets];
}

async function devSSR(req, res) {
    const assetsByChunkName = res.locals.webpackStats.toJson()
        .assetsByChunkName;

    await serverPromise;
    const store = createStore(reducer, applyMiddleware(thunkMiddleware));
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
    const html = renderToString(serverBundle(req.originalUrl, store, ctx));
    if (ctx.statusCode === 404) {
        res.status(404).end('404 la');
    } else {
        const preloadedState = store.getState();
        res.render('index', {
            html: html,
            preloadedState: preloadedState,
            asset: {
                jsArray: normalizeAssets(assetsByChunkName.main)
                    .filter(path => path.endsWith('.js'))
                    .map(path => clientConfig.output.publicPath + path),
                cssArray: normalizeAssets(assetsByChunkName.main)
                    .filter(path => path.endsWith('.css'))
                    .map(path => clientConfig.output.publicPath + path),
            },
        });
    }
}

module.exports =async app => {
    console.time('serverstart');
    // const arr = [];
    // arr.push(clientPromise);
    // arr.push(serverPromise);
    await clientPromise
    await serverPromise
    // Promise.all(arr).then(() => {
        app.use(instanceMiddleware);
        app.use(require('webpack-hot-middleware')(clientCompiler));
        app.use(devSSR);
        console.log(`🌏 Server start at http://localhost:${3001}`);
        console.timeEnd('serverstart');
    // });
};
