import React from 'react';
import { renderRoutes } from 'react-router-config';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import '@/shared/style/home.less';
import ScrollMemory from 'react-router-scroll-memory';

const App = ({ route, location }) => {
    return (
        <>
            <ScrollMemory />
            <TransitionGroup>
                <CSSTransition
                    key={location.pathname}
                    classNames="transition"
                    timeout={300}
                >
                    {renderRoutes(route.routes, {}, { location })}
                </CSSTransition>
            </TransitionGroup>
        </>
    );
};

export default App;
