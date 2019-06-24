import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import reducer from '../shared/reducer';
import routes from '../shared/routes';
import { renderRoutes } from 'react-router-config';

const Root = (location, store, context) => (
    <Provider store={store}>
        <StaticRouter location={location} context={context}>
            {renderRoutes(routes)}
        </StaticRouter>
    </Provider>
);
export default Root;
export { reducer, routes };
