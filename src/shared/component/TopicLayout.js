import '@/shared/style/layout.less';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { withLastLocation } from 'react-router-last-location';

class Layout extends Component {
    constructor(props) {
        super(props);
        this.back = this.back.bind(this);
    }

    back() {
        let { history, lastLocation } = this.props;
        if (lastLocation && lastLocation.pathname === '/') {
            history.goBack();
        } else {
            history.replace('/');
        }
    }

    render() {
        const { className } = this.props;
        return (
            <div className={className}>
                <div className="header">
                    <div className="container">
                        <div className="header__left">
                            <button
                                className="btn btn_icon"
                                onClick={this.back}
                            >
                                <img
                                    src={require('@/shared/asset/img/baseline-arrow_back_ios-24px.svg')}
                                    alt=""
                                />
                            </button>
                        </div>
                        {/*<Link*/}
                        {/*className="header__center header__center--logo"*/}
                        {/*to="/"*/}
                        {/*/>*/}
                        <div className="header__right">
                            <a className="btn btn_icon" href="/">
                                <img
                                    src={require('@/shared/asset/img/baseline-create-24px.svg')}
                                    alt=""
                                />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="main">
                    <div className="container">{this.props.children}</div>
                </div>

                <div className="footer">
                    <div className="container">
                        <div className="footer__column">
                            <a href="/">Home</a>
                            <a href="https://github.com/daweilv">Github</a>
                            <a href="/about">About</a>
                        </div>

                        <div className="footer__copyright">
                            &#169; 2015 - {new Date().getFullYear()}{' '}
                            <a href="https://github.com/daweilv">David 🚀</a>️.
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withLastLocation(withRouter(Layout));
