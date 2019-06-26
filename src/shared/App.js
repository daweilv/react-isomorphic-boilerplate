import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';
import '@/shared/style/home.less';
import ScrollMemory from 'react-router-scroll-memory';
import { LastLocationProvider } from 'react-router-last-location';

class App extends Component {
    UNSAFE_componentWillReceiveProps() {
        window.previousLocation = this.props.location;
    }

    render() {
        const { route, location } = this.props;
        return (
            <>
                <LastLocationProvider>
                    <ScrollMemory />
                    {/*<TransitionGroup>*/}
                    {/*<CSSTransition*/}
                    {/*key={location.pathname}*/}
                    {/*classNames="transition"*/}
                    {/*timeout={3000}*/}
                    {/*>*/}
                    {renderRoutes(route.routes, {}, { location })}
                    {/*</CSSTransition>*/}
                    {/*</TransitionGroup>*/}
                </LastLocationProvider>
            </>
        );
    }
}

export default App;
