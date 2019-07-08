import '@/shared/style/layout.less';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { withLastLocation } from 'react-router-last-location';
import {Link} from "react-router-dom";
import Footer from "@/shared/component/Footer";

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

                        <div className="header__right">
                        </div>
                    </div>
                </div>
                <div className="main">
                    <div className="container">{this.props.children}</div>
                </div>

                <Footer/>
            </div>
        );
    }
}

export default withLastLocation(withRouter(Layout));
