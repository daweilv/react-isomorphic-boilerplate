import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '../shared/App';
import reducer from '../shared/reducer';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { logger } from 'redux-logger';

const preloadedState = window.__PRELOADED_STATE__;

const store = createStore(
    reducer,
    preloadedState,
    applyMiddleware(thunkMiddleware, logger)
);

ReactDOM.hydrate(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
