const applyMiddleware = require('redux').applyMiddleware;
const createStore = require('redux').createStore;
const MemoryFs = require('memory-fs');
const path = require('path');
const React = require('react');
const fs = require('fs');
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
        // const bundle = fs.readFileSync(bundlePath, 'utf8');
        const Module = module.constructor;
        const m = new Module();
        m._compile(bundle, 'serverBundle.js');
        serverRoot = m.exports.default;
        reducer = m.exports.reducer;
        routes = m.exports.routes;
        resolve();
    });
    // resolve();
});

let clientCompiler;
clientCompiler = webpack(clientConfig);
let instanceMiddleware = middleware(clientCompiler, {
    writeToDisk(filePath) {
        return /loadable-stats/.test(filePath);
    },
});
const clientPromise = new Promise(resolve => {
    instanceMiddleware.waitUntilValid(resolve);
});

let started = false;

let promises = Promise.all([serverPromise, clientPromise]);

const webStats = path.resolve(__dirname, '../../dist/loadable-stats.json');

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

        // const bundle = mfs.readFileSync(bundlePath, 'utf8');
        //      this.publicPath = publicPath || this.stats.publicPath;
        // this.outputPath = outputPath || this.stats.outputPath;
        console.log('publicPath', stats.publicPath);
        console.log('outputPath', stats.outputPath);
        // let aa = mfs.statSync(path.resolve(stats.outputPath,'./vendors~page-Home~page-Topic.serverBundle.js'))
        // console.log(aa.isFile());
        // const extractor = new ChunkExtractor({
        //     stats,
        //     inputFileSystem: mfs,
        //     // outputPath: path.resolve('dist/server'),
        // });

        const nodeExtractor = new ChunkExtractor({
            stats,
            inputFileSystem: mfs,
        });
        // const { default: App } = nodeExtractor.requireEntrypoint();

        const webExtractor = new ChunkExtractor({ statsFile: webStats });

        const ctx = {};
        // const html = renderToString(
        //     extractor.collectChunks(serverRoot(req.originalUrl, store, ctx))
        // );
        const jsx = nodeExtractor.collectChunks(
            serverRoot(req.originalUrl, store, ctx)
        );
        const html = renderToString(jsx);

        console.log('html==> ', html);

        if (ctx.statusCode === 404) {
            res.status(404).end('404 la');
        } else {
            const preloadedState = store.getState();
            // let tpl = clientCompiler.outputFileSystem.readFileSync(
            //     path.join(clientConfig.output.path, 'tpl.html'),
            //     'utf8'
            // );
            // res.send(
            //     tpl
            //         .replace(
            //             '{script}',
            //             `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(
            //                 preloadedState
            //             )}</script>`
            //         )
            //         .replace('{html}', html)
            // );

            res.set('content-type', 'text/html');
            res.send(`<!DOCTYPE html>
                <html>
                <head>
                ${webExtractor.getLinkTags()}
                ${webExtractor.getStyleTags()}
                <script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}</script>
                </head>
                <body>
                  <div id="main">${html}</div>
                  ${webExtractor.getScriptTags()}
                </body>
                </html>`);
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
