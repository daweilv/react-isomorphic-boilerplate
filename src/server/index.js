const express = require('express');
const path = require('path');
const compression = require('compression');
const devSSR = require('./devSSR');

const app = express();
app.use(compression());
app.use(express.static(path.join(__dirname, '../../public')));

if (process.env.NODE_ENV === 'development') {
    // app.use(express.static(path.join(__dirname, '../../dist')));
    // app.use(prodSSR);
} else {
    devSSR(app);
}

app.listen(3001);
