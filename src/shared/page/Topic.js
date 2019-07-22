import '../style/topic.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadTopicData } from '../actions';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Reply from '@/shared/component/Reply';
import { fromNow, publishDateFormatter } from '@/shared/util/timeUtil';
import TopicShell from '@/shared/component/TopicShell';
import Layout from '@/shared/component/Layout';
import TopicLayout from '@/shared/component/TopicLayout';

function mapStateToProps(state, ownProps) {
    return { topic: state.topicsById[ownProps.match.params.id] };
}

const mapDispatchToProps = dispatch => ({
    loadData: id => {
        dispatch(loadTopicData(id));
    },
});

class Topic extends Component {
    componentDidMount() {
        const { topic, match } = this.props;
        if (!topic) {
            console.log('load data TopicCard');
            this.props.loadData(match.params.id);
        }
    }

    render() {
        const { topic } = this.props;
        return (
            <TopicLayout className="page-topic">
                {!topic && <TopicShell />}

                {topic && (
                    <div className="topic">
                        <h1 className="topic__title">{topic.title}</h1>
                        <div className="topic__meta">
                            <Link className="author__avatar" to="/user">
                                <img src={topic.author.avatar_url} alt="" />
                            </Link>

                            <span className="author__name">
                                <Link to="/user/xxx">
                                    {topic.author.loginname}・
                                    {publishDateFormatter(topic.create_at)}
                                </Link>
                                <span>({fromNow(topic.last_reply_at)})</span>
                            </span>
                        </div>
                        <div
                            className="topic__content"
                            dangerouslySetInnerHTML={{
                                __html: topic.content.replace(
                                    'markdown-text',
                                    'markdown-body'
                                ),
                            }}
                        />
                    </div>
                )}
                {topic && (
                    <div className="replies">
                        {topic.replies.map(o => (
                            <Reply key={o.id} item={o} />
                        ))}
                    </div>
                )}
            </TopicLayout>
        );
    }
}

// Topic.loadData = (store, { params }) => {
//     return store.dispatch(loadTopicData(params.id));
// };

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Topic)
);
