import '@/shared/style/layout.less';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '@/shared/component/Sidebar/drawer.less';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { withRouter } from 'react-router';
import Footer from '@/shared/component/Footer';

function mapStateToProps(state) {
    const { selectedTab } = state;
    return { selectedTab };
}

function activeCls(selectedTab = 'all', tab) {
    return selectedTab === tab && 'active';
}

class Layout extends Component {
    constructor(props) {
        super(props);
        this.toggleSide = this.toggleSide.bind(this);
    }

    componentDidMount() {
        document.body.classList.add('drawer');
    }

    toggleSide() {
        let body = document.body;
        body.classList.toggle('drawer--open');
    }

    navClick(tab) {
        let path = tab ? `/?tab=${tab}` : '/';
        this.props.history.push(path);
        // this.props.dispatch(selectTab(tab));
        this.toggleSide();
    }

    render() {
        const { className, selectedTab } = this.props;
        return (
            <div className={className}>
                <div className="header">
                    <div className="container">
                        <div className="header__left">
                            <button
                                className="btn btn_icon"
                                onClick={this.toggleSide}
                            >
                                <img
                                    src={require('@/shared/asset/img/baseline-menu-24px.svg')}
                                    alt=""
                                />
                            </button>
                        </div>
                        <Link
                            className="header__center header__center--logo"
                            to="/"
                        />
                        <div className="header__right">
                            {/*<a className="btn btn_icon" href="/">*/}
                            {/*<img*/}
                            {/*src={require('@/shared/asset/img/baseline-create-24px.svg')}*/}
                            {/*alt=""*/}
                            {/*/>*/}
                            {/*</a>*/}
                        </div>
                    </div>
                </div>
                <div className="main">
                    <div className="container">
                        {this.props.children}
                        <div className="side drawer__content">
                            <div className="logo" />
                            <div className="widget widget--user">
                                {/*<button className="btn--sign">Token登录</button>*/}
                                <a href="/user/">
                                    <img
                                        src="https://avatars3.githubusercontent.com/u/7405300?v=4&s=120"
                                        alt=""
                                    />
                                </a>
                                <div className="profile">
                                    <div className="profile__name">
                                        david.lv
                                    </div>

                                    <a className="profile__github" href="">
                                        @dawei.lv
                                    </a>
                                </div>
                            </div>
                            <div className="widget">
                                <div className="widget__body">
                                    <div className="navs">
                                        <div
                                            className={classNames(
                                                'nav-item',
                                                activeCls(selectedTab, 'all')
                                            )}
                                            onClick={this.navClick.bind(
                                                this,
                                                'all'
                                            )}
                                        >
                                            全部
                                        </div>
                                        <div
                                            className={classNames(
                                                'nav-item',
                                                activeCls(selectedTab, 'good')
                                            )}
                                            onClick={this.navClick.bind(
                                                this,
                                                'good'
                                            )}
                                        >
                                            # 精华⭐️️
                                        </div>
                                        <div
                                            className={classNames(
                                                'nav-item',
                                                activeCls(selectedTab, 'share')
                                            )}
                                            onClick={this.navClick.bind(
                                                this,
                                                'share'
                                            )}
                                        >
                                            # 分享🚀
                                        </div>
                                        <div
                                            className={classNames(
                                                'nav-item',
                                                activeCls(selectedTab, 'ask')
                                            )}
                                            onClick={this.navClick.bind(
                                                this,
                                                'ask'
                                            )}
                                        >
                                            # 问答🔎
                                        </div>
                                        <div
                                            className={classNames(
                                                'nav-item',
                                                activeCls(selectedTab, 'job')
                                            )}
                                            onClick={this.navClick.bind(
                                                this,
                                                'job'
                                            )}
                                        >
                                            # 招聘💼
                                        </div>
                                        <div
                                            className={classNames(
                                                'nav-item',
                                                activeCls(selectedTab, 'dev')
                                            )}
                                            onClick={this.navClick.bind(
                                                this,
                                                'dev'
                                            )}
                                        >
                                            # 客测🛠
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="widget widget--add">
                                <div className="widget__body">
                                    <div className="navs">
                                        <Link
                                            className={classNames('nav-item')}
                                            to="/message"
                                            onClick={this.toggleSide}
                                        >
                                            消息
                                        </Link>

                                        <Link
                                            className={classNames('nav-item')}
                                            to="/about"
                                            onClick={this.toggleSide}
                                        >
                                            关于
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="drawer__overlay"
                            onClick={this.toggleSide}
                        />
                    </div>
                </div>

                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps)(Layout));
