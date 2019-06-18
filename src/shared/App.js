import React from 'react';
import { renderRoutes } from 'react-router-config';
import routes from './routes';
import Layout from './components/Layout';
import {hot} from "react-hot-loader/root";

const App = () => <Layout>{renderRoutes(routes)}</Layout>;

export default hot(App);
