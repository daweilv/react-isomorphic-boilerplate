import { renderToString } from 'react-dom/server';
import React from 'react';
import { StaticRouter } from 'react-router';
import App from '../shared/App';

const renderContent = (req, initialStates, ctx) => {
    // console.log('renderContent initialStates', initialStates);
    return renderToString(
        <StaticRouter location={req.url} context={ctx}>
            <App initialStates={initialStates} />
        </StaticRouter>
    );
};

export default renderContent;
