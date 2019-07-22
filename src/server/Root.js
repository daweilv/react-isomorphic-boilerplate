import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import reducer from '../shared/reducer';
import routes from '../shared/routes';
import { renderRoutes } from 'react-router-config';
// import {  ChunkExtractorManager } from '@loadable/server'
//
// const Root = (location, store, context, extractor) => (
//     <ChunkExtractorManager extractor={extractor}>
//         <Provider store={store}>
//             <StaticRouter location={location} context={context}>
//                 {renderRoutes(routes)}
//             </StaticRouter>
//         </Provider>
//     </ChunkExtractorManager>
// );
// export default Root;


const Root = (location, store, context) => (
    <Provider store={store}>
        <StaticRouter location={location} context={context}>
            {renderRoutes(routes)}
        </StaticRouter>
    </Provider>
);

export default Root;

export { reducer, routes };
