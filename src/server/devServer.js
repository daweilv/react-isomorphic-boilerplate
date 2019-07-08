const path = require('path');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const clientConfig = require('../../build/webpack.config.client');
const routesConfig = require('../../config/routes.config');

let clientCompiler;
clientCompiler = webpack(clientConfig);
let instanceMiddleware = middleware(clientCompiler);
const clientPromise = new Promise(resolve => {
    instanceMiddleware.waitUntilValid(resolve);
});

let started = false;

module.exports = app => {
    app.use(instanceMiddleware);
    app.use(require('webpack-hot-middleware')(clientCompiler));

    for (let route of Object.values(routesConfig)) {
        app.use(route, async (req, res) => {
            if (!started) {
                await clientPromise;
            }
            let tpl = clientCompiler.outputFileSystem
                .readFileSync(
                    path.join(clientConfig.output.path, 'tpl.html'),
                    'utf8'
                )
                .replace('{script}', '')
                .replace('{html}', '');
            res.send(tpl);
        });
    }

    app.use(function(req, res, next) {
        res.status(404).send('Sorry cant find that!');
    });

    clientPromise.then(() => {
        console.info(`🌏 Server start at http://localhost:${3001}\n`);
    });
};
