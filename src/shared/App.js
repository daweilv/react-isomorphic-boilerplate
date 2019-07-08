import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import '@/shared/style/home.less';
import ScrollMemory from 'react-router-scroll-memory';
import { LastLocationProvider } from 'react-router-last-location';

class App extends Component {
    render() {
        const { route, location } = this.props;
        return (
            <>
                <LastLocationProvider>
                    <ScrollMemory />
                    {renderRoutes(route.routes, {}, { location })}
                </LastLocationProvider>
            </>
        );
    }
}

export default App;
