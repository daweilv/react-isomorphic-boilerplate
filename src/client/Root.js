import { hot } from 'react-hot-loader/root';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import routes from '@/shared/routes';
import { renderRoutes } from 'react-router-config';

const Root = () => <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>;

export default hot(Root);
