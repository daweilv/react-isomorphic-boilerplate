import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fromNow, publishDateFormatter } from '@/shared/util/timeUtil';
import readingTime from 'reading-time';
import {tagFormatter} from "@/shared/util";

class TopicCard extends Component {
    render() {
        const { item } = this.props;
        if (!item) return <div>loading</div>;
        return (
            <div className="topic-card">
                <Link to={`/topic/${item.id}`}>
                    <h3 className="topic-card__title">
                        {item.top && (
                            <span className="topic-card__identifier">置顶</span>
                        )}
                        {!item.top && item.good && (
                            <span className="topic-card__identifier">精华</span>
                        )}
                        {item.title}
                    </h3>
                </Link>
                <div className="topic-card__meta">
                    <Link className="author__avatar" to="/user">
                        <img src={item.author.avatar_url} alt="" />
                    </Link>

                    <span className="author__name">
                        <Link to="/user/xxx">
                            {item.author.loginname}・
                            {publishDateFormatter(item.create_at)}
                        </Link>
                        <span>({fromNow(item.last_reply_at)})</span>
                    </span>
                    <div className="topic-card__tag">
                        <Link to="/tag/zhaop">#{tagFormatter(item.tab)}</Link>
                    </div>
                </div>

                <div className="topic-card__addon">
                    <Link to="/" className="topic-card__views">
                        <img
                            src={require('@/shared/asset/img/outline-visibility-24px.svg')}
                            alt=""
                        />
                        <span>{item.visit_count}</span>
                    </Link>
                    {!!item.reply_count && (
                        <Link to="/" className="topic-card__comments">
                            <img
                                src={require('@/shared/asset/img/outline-mode_comment-24px.svg')}
                                alt=""
                            />
                            <span>{item.reply_count}</span>
                        </Link>
                    )}

                    <span className="topic-card__reading-time">
                        {readingTime(item.content).text}
                    </span>
                </div>
            </div>
        );
    }
}

export default TopicCard;
