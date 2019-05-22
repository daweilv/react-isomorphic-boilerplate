import React, { Component } from 'react';
import './asset/style/home.less';
import {Link} from "react-router-dom";

class Layout extends Component {
    render() {
        return (
            <>
                <div className="header">
                    <div className="container">
                        <div className="header__left">
                            <button className="btn btn_icon">
                                <img
                                    src={require('@/shared/asset/img/baseline-menu-24px.svg')}
                                    alt=""
                                />
                            </button>
                        </div>
                        <Link className="header__center" to="/"/>
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
                    <div className="container">
                            {/*<div className="navs">*/}
                            {/*<a href="" className="nav-item active">*/}
                            {/*全部*/}
                            {/*</a>*/}
                            {/*<span className="separator" />*/}
                            {/*<a href="" className="nav-item">*/}
                            {/*精华*/}
                            {/*</a>*/}
                            {/*<a href="" className="nav-item">*/}
                            {/*分享*/}
                            {/*</a>*/}
                            {/*<a href="" className="nav-item">*/}
                            {/*问答*/}
                            {/*</a>*/}
                            {/*<a href="" className="nav-item">*/}
                            {/*招聘*/}
                            {/*</a>*/}
                            {/*<a href="" className="nav-item">*/}
                            {/*客测*/}
                            {/*</a>*/}
                            {/*</div>*/}
                            {this.props.children}
                        {/*<div className="side">*/}
                            {/*<div className="logo" />*/}
                            {/*<div className="widget">*/}
                                {/*<div className="widget__header">分类</div>*/}
                                {/*<div className="widget__body">*/}
                                    {/*<div className="navs">*/}
                                        {/*<a href="" className="nav-item active">*/}
                                            {/*全部*/}
                                        {/*</a>*/}
                                        {/*<span className="separator" />*/}
                                        {/*<a href="" className="nav-item">*/}
                                            {/*精华*/}
                                        {/*</a>*/}
                                        {/*<a href="" className="nav-item">*/}
                                            {/*分享*/}
                                        {/*</a>*/}
                                        {/*<a href="" className="nav-item">*/}
                                            {/*问答*/}
                                        {/*</a>*/}
                                        {/*<a href="" className="nav-item">*/}
                                            {/*招聘*/}
                                        {/*</a>*/}
                                        {/*<a href="" className="nav-item">*/}
                                            {/*客测*/}
                                        {/*</a>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    </div>
                </div>


                <div className="footer">
                    <div className="container">
                        <div className="footer__column">
                            <a href="/">Home</a>
                            <a href="/about">Github</a>
                            <a href="/about">About</a>
                        </div>

                        <div className="footer__copyright">
                            &#169; 2015 - {new Date().getFullYear()}{' '}
                            <a href="">David 🚀</a>️.
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Layout;
