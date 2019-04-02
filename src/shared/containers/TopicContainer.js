import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadTopicData } from '../actions';
import Topic from '../components/Topic';
import { withRouter } from "react-router";

function mapStateToProps(state) {
    return { topic: state.currentTopic};
}

const mapDispatchToProps = dispatch => ({
    loadData: id => {
        dispatch(loadTopicData(id));
    },
});

class TopicContainer extends Component {
    componentDidMount() {
        const {topic,match} = this.props;
        if (!topic ||topic.id !== match.params.id) {
            console.log('load data Topic');
            this.props.loadData(match.params.id);
        }
    }

    render() {
        console.log('topicstopics=>', this.props.topic);
        return <Topic topic={this.props.topic} />;
    }
}

TopicContainer.loadData = (store, { params }) => {
    return store.dispatch(loadTopicData(params.id));
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(TopicContainer));
