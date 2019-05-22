import React from 'react';
import { renderRoutes } from 'react-router-config';
import routes from './routes';
import Layout from "./Layout";

const App = () => {
    console.log('App');
    return <Layout>{renderRoutes(routes)}</Layout>;
};

export default App;
