import '@babel/polyfill';
import 'react-hot-loader'
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';

ReactDOM.hydrate(<Root />, document.getElementById('root'));
