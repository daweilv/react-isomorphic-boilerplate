import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import App from '@/shared/App';
import reducer from '../shared/reducer';
import routes from '../shared/routes';

const Root = (location, store, context) => (
    <Provider store={store}>
        <StaticRouter location={location} context={context}>
            <App />
        </StaticRouter>
    </Provider>
);
export default Root;
export { reducer, routes };
