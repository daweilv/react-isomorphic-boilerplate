import React from 'react';
import { Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

const App = props => {
    console.log('App');
    return (
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/topic">Topic</Link>
                </li>
            </ul>

            {renderRoutes(props.route.routes)}
        </div>
    );
};

export default App;
