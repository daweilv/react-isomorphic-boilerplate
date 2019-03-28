import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from '../shared/routes';

const App = () => {
    return (
        <BrowserRouter>
            <div>{renderRoutes(routes)}</div>
        </BrowserRouter>
    );
};

ReactDOM.hydrate(<App />, document.getElementById('root'));
