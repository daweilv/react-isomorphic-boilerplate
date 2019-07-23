const applyMiddleware = require('redux').applyMiddleware;
const createStore = require('redux').createStore;
const MemoryFs = require('memory-fs');
const path = require('path');
const ejs = require('ejs');
const renderToString = require('react-dom/server').renderToString;
const thunkMiddleware = require('redux-thunk').default;
const matchRoutes = require('react-router-config').matchRoutes;
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const serverConfig = require('../../build/webpack.config.server');
const clientConfig = require('../../build/webpack.config.client');
const ChunkExtractor = require('@loadable/server').ChunkExtractor;

let serverRoot;
let reducer;
let routes;
let stats;
let serverCompiler = webpack(serverConfig);
const mfs = new MemoryFs();
serverCompiler.outputFileSystem = mfs;
const serverPromise = new Promise(resolve => {
    serverCompiler.watch({}, (err, _stats) => {
        if (err) throw err;
        stats = _stats.toJson();
        stats.errors.forEach(err => console.error(err));
        stats.warnings.forEach(warn => console.warn(warn));

        // 获取bundle文件路径
        const bundlePath = path.join(
            serverConfig.output.path,
            serverConfig.output.filename
        );
        const bundle = mfs.readFileSync(bundlePath, 'utf8');
        // 读取内容并编译模块
        const vm = require('vm');
        const sandbox = {
            console,
            module,
            require,
        };
        vm.runInNewContext(bundle, sandbox);
        let m = sandbox.module;
        serverRoot = m.exports.default;
        reducer = m.exports.reducer;
        routes = m.exports.routes;
        resolve();
    });
});

let clientCompiler;
clientCompiler = webpack(clientConfig);
let instanceMiddleware = middleware(clientCompiler);
const clientPromise = new Promise(resolve => {
    instanceMiddleware.waitUntilValid(resolve);
});

let started = false;

let promises = Promise.all([serverPromise, clientPromise]);

async function renderEjs({ extractor, preloadedState, html }) {
    return new Promise((resolve, reject) => {
        ejs.renderFile(
            path.resolve(__dirname, '../views/index.ejs'),
            {
                extractor,
                preloadedState,
                html,
            },
            function(err, str) {
                if (err) {
                    reject(err);
                } else {
                    resolve(str);
                }
            }
        );
    });
}

async function devSSRServer(req, res, next) {
    if (!started) {
        await promises;
    }
    try {
        const store = createStore(reducer, applyMiddleware(thunkMiddleware));
        const matchedRoutes = matchRoutes(routes, req.path);
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

        const clientStatsFile = path.resolve('dist/client-stats.json');
        const extractor = new ChunkExtractor({ statsFile: clientStatsFile });

        const ctx = {};
        const App = serverRoot(req.originalUrl, store, ctx);
        const jsx = extractor.collectChunks(App);
        const html = renderToString(jsx);

        if (ctx.statusCode === 404) {
            res.status(404).end('404 la');
        } else {
            const preloadedState = store.getState();
            const ejsHTML = await renderEjs({
                extractor,
                preloadedState,
                html,
            });
            res.send(ejsHTML);
        }
    } catch (e) {
        next(e);
    }
}

module.exports = app => {
    app.use(instanceMiddleware);
    app.use(require('webpack-hot-middleware')(clientCompiler));
    app.use(devSSRServer);
    promises.then(() => {
        console.info(`🌏 Server start at http://localhost:${3001}\n`);
    });
};
