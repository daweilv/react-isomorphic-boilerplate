import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from '@/shared/App';
import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import reducer from '@/shared/reducer';
import thunkMiddleware from 'redux-thunk';
import ScrollMemory from "react-router-scroll-memory";

const preloadedState = window.__PRELOADED_STATE__;

const store = createStore(
    reducer,
    preloadedState,
    applyMiddleware(thunkMiddleware)
);

const Root = () => (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

export default Root;
