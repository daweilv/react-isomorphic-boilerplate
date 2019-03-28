const express = require('express');
const proxy = require('express-http-proxy');
const app = express();
const path = require('path');
const port = 3001;
import renderContent from './server';

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '../../dist/client')));

app.use(
    '/api',
    proxy('cnodejs.org', {
        https: true,
        proxyReqPathResolver: function(req) {
            return '/api' + req.url;
        },
    })
);

app.get('*', function(req, res) {
    const content = renderContent(req);
    res.render('index', { content });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
