const express = require('express');
const path = require('path');
const compression = require('compression');
const logger = require('morgan');
const devMode = process.env.NODE_ENV !== 'production';
const app = express();

app.use(compression());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(logger(!devMode ? 'tiny' : 'dev'));
if (!devMode) {
    require('./prodSSR')(app);
} else {
    require('./devSSR')(app);
}

app.listen(3001);
