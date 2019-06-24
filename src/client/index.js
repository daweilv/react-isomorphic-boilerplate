import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import reducer from '@/shared/reducer';
import thunkMiddleware from 'redux-thunk';

const preloadedState = window.__PRELOADED_STATE__;

const store = createStore(
    reducer,
    preloadedState,
    applyMiddleware(thunkMiddleware)
);

const App = () => (
    <Provider store={store}>
        <Root/>
    </Provider>
);

ReactDOM.hydrate(<App />, document.getElementById('root'));
