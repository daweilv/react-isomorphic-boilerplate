const express = require('express');
const path = require('path');
const compression = require('compression');
const logger = require('morgan');
const devMode = process.env.NODE_ENV !== 'production';
const app = express();
const defaultConfig = require('../../config/config.default');

app.use(compression());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(logger(!devMode ? 'tiny' : 'dev'));
if (defaultConfig.mode === 'ssr') {
    if (!devMode) {
        require('./prodSSRServer')(app);
    } else {
        require('./devSSRServer')(app);
    }
} else {
    if (!devMode) {
        require('./prodServer')(app);
    } else {
        require('./devServer')(app);
    }
}

app.listen(3001);
