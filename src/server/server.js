import { renderToString } from 'react-dom/server';
import React from 'react';
import { StaticRouter, Switch } from 'react-router';
import { renderRoutes } from 'react-router-config';
import routes from '../shared/routes';

const renderContent = req => {
    const ctx = {};
    const App = () => (
        <StaticRouter location={req.url} context={ctx}>
            <div>
                <Switch>{renderRoutes(routes)}</Switch>
            </div>
        </StaticRouter>
    );

    const c = renderToString(<App />);
    return c;
};

export default renderContent;
