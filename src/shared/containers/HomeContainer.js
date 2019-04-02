import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadTopicsData } from '../actions';
import Home from '../components/Home';

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
        if (!this.props.topics.length) {
            console.log('load data home');
            this.props.loadData();
        }
    }

    render() {
        console.log('topicstopics=>',this.props.topics);
        return <Home topics={this.props.topics} />;
    }
}

HomeContainer.loadData = store => {
    return store.dispatch(loadTopicsData());
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeContainer);
