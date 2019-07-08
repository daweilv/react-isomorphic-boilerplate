import { Link } from 'react-router-dom';
import React from 'react';

const Footer = () => (
    <div className="footer">
        <div className="container">
            <div className="footer__column">
                <Link to="/">Home</Link>
                <a href="https://github.com/daweilv">Github</a>
                <Link to="/about">About</Link>
            </div>

            <div className="footer__copyright">
                Powered by <a target="_blank" href="https://github.com/daweilv/react-isomorphic-boilerplate">react-isomorphic-boilerplate 🚀</a>
            </div>
        </div>
    </div>
);

export default Footer;
