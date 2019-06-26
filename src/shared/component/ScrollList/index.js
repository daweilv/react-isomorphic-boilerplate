import React, { Component } from 'react';
import classNames from 'classnames';
import './style.less';

// todo: 待提供功能
// 1. 连续加载N页后停止加载，显示继续加载提示，防止永远点不到footer
// 2. container模式
class ScrollList extends Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.handlerScroll = this.handlerScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handlerScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handlerScroll);
    }

    handlerScroll() {
        let ele = this.ref.current;
        let { threshold, onTheEnd } = this.props;
        let bottom = ele.getBoundingClientRect().bottom;
        let viewportHeight = window.innerHeight;
        let offset = bottom - viewportHeight;
        if (offset < threshold) {
            console.log('onTheEnd');
            onTheEnd();
        }
    }

    render() {
        const { children, className, status } = this.props;
        return (
            <div
                ref={this.ref}
                className={classNames('scroll_more', className)}
            >
                {children}
                {status === 'empty' && <Empty />}
                {status === 'loading' && <Loading />}
                {status === 'nomore' && <NoMore />}
            </div>
        );
    }
}

ScrollList.defaultProps = {
    threshold: 100,
};

const Empty = () => {
    return (
        <div className="tips">
            <span>暂无相关数据</span>
        </div>
    );
};

const NoMore = () => {
    return (
        <div className="tips">
            <span>到底啦</span>
        </div>
    );
};

const Loading = () => {
    return (
        <div className="tips">
            <span>加载中...</span>
        </div>
    );
};

export default ScrollList;
