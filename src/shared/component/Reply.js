import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fromNow } from '@/shared/util/timeUtil';

class Reply extends Component {
    render() {
        const { item } = this.props;
        return (
            <div className="reply">
                <div className="reply__meta">
                    <Link className="author__avatar" to="/user">
                        <img src={item.author.avatar_url} alt="" />
                    </Link>

                    <span className="author__name">
                        <Link to="/user/xxx">{item.author.loginname}</Link>
                    </span>

                    <span className="reply__time">
                        {fromNow(item.create_at)}
                    </span>
                </div>
                <div
                    className="reply__content"
                    dangerouslySetInnerHTML={{ __html: item.content.replace('markdown-text','markdown-body')  }}
                />
                <div className="reply__add">
                    <div className="reply__up">
                        <img
                            src={require('@/shared/asset/img/outline-thumb_up-24px.svg')}
                            alt=""
                        />
                        <span>{item.ups.length}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Reply;
