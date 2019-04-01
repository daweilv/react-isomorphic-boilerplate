import express from 'express';
import proxy from 'express-http-proxy';
import path from 'path';
const app = express();
import { matchRoutes } from 'react-router-config';
import renderContent from './server';
import routes from '../shared/routes';

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '../../dist/client')));

// app.use(
//     '/api',
//     proxy('cnodejs.org', {
//         https: true,
//         proxyReqPathResolver: function(req) {
//             return '/api' + req.url;
//         },
//     })
// );

app.get('*', async function(req, res) {
    const branch = matchRoutes(routes, req.path);
    const arr = [];
    const promises = [];
    branch.forEach(({ route }) => {
        if (route.loadData) {
            const prom = route.loadData(req.path);
            promises.push(prom);
            arr.push(route.key);
        }
    });
    const awaits = await Promise.all(promises);
    const initialStates = awaits.reduce((acc, item, idx) => {
        acc[arr[idx]] = item;
        return acc;
    }, {});
    const ctx = {};
    // console.log('initialStates===>', initialStates);
    const content = renderContent(req, initialStates, ctx);
    console.log('ctx', ctx);
    if (ctx.statusCode === 404) {
        res.status(404).end('404 la');
    } else {
        res.render('index', {
            content,
            initialStates,
        });
    }
});

app.listen(3001, () => console.log(`Example app listening on port ${3001}!`));
