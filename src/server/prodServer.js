const path = require('path');
const fs = require('fs');
const routesConfig = require('../../config/routes.config');
const express = require('express');
const router = express.Router();

for (let route of Object.values(routesConfig)) {
    router.get(route, (req, res) => {
        if (!res.app.locals._tpl) {
            res.app.locals._tpl = fs
                .readFileSync(
                    path.resolve(__dirname, '../../dist/tpl.html'),
                    'utf8'
                )
                .replace('{script}', '')
                .replace('{html}', '');
        }
        res.send(res.app.locals._tpl);
    });
}

module.exports = app => {
    app.use(express.static(path.join(__dirname, '../../dist')));
    app.use('/', router);
    app.use(function(req, res, next) {
        res.status(404).send('Sorry cant find that!');
    });

    console.info(`🌏 Server start at http://localhost:${3001}\n`);
};
