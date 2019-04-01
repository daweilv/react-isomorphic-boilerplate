import React from 'react';
import { renderRoutes } from 'react-router-config';
import routes from './routes';

const App = ({ initialStates }) => {
    console.log('App');
    return <div>{renderRoutes(routes, { ...initialStates })}</div>;
};

export default App;
