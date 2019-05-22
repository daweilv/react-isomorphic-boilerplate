import express from 'express';
import path from 'path';
import server from './server';
import compression from 'compression';

const app = express();
app.use(compression());
// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '../../dist/client')));
app.use(express.static(path.join(__dirname, '../../public')));
console.log('__dirname',__dirname);

// app.use(
//     '/api',
//     proxy('cnodejs.org', {
//         https: true,
//         proxyReqPathResolver: function(req) {
//             return '/api' + req.url;
//         },
//     })
// );

app.get('*', server);

app.listen(3001, () => console.log(`Example app listening on port ${3001}!`));
