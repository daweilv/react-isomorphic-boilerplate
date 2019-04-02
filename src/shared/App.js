import React from 'react';
import { renderRoutes } from 'react-router-config';
import routes from './routes';

const App = () => {
    console.log('App');
    return <div>{renderRoutes(routes)}</div>;
};

export default App;
