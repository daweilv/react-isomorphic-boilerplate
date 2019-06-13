import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadTopicsData } from '../actions';
import TopicCard from '@/shared/components/TopicCard';
import TopicCardShell from '@/shared/components/TopicCardShell';

function mapStateToProps(state) {
    return { topics: state.topics.items };
}

const mapDispatchToProps = dispatch => ({
    loadData: data => {
        dispatch(loadTopicsData(data));
    },
});

class HomeContainer extends Component {
    componentDidMount() {
        console.log('HomeContainer componentDidMount');
        if (!this.props.topics.length) {
            console.log('load data home');
            this.props.loadData();
        }
    }

    componentWillUnmount() {
        console.log('HomeContainer componentWillUnmount11');
    }

    render() {
        // console.log('topicstopics=>', this.props.topics);
        const { topics } = this.props;
        const arr = [1, 2, 3, 4, 5, 6];
        return (
            <div className="topic-list">
                {topics.length
                    ? topics.map(o => <TopicCard key={o.id} item={o} />)
                    : arr.map(o => <TopicCardShell key={o} />)}
            </div>
        );
    }
}

HomeContainer.loadData = store => {
    return store.dispatch(loadTopicsData());
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeContainer);
