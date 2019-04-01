import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from "../shared/App";

const initialStates = window.initialStates;

ReactDOM.hydrate(
    <BrowserRouter>
        <App initialStates={initialStates} />
    </BrowserRouter>,
    document.getElementById('root')
);
