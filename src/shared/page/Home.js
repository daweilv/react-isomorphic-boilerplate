import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadTopicsData } from '../actions';
import TopicCard from '../component/TopicCard';
import TopicCardShell from '../component/TopicCardShell';
import Layout from '../component/Layout';
import ScrollList from '@/shared/component/ScrollList';

function mapStateToProps(state) {
    return { topics: state.topics.items, status: state.topics.status };
}

const mapDispatchToProps = dispatch => ({
    loadData: page => {
        dispatch(loadTopicsData(page));
    },
});

class Home extends Component {
    constructor(props) {
        super(props);
        this.page = 1;
        this.loadMore = this.loadMore.bind(this);
    }

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

    async query() {
        if (this.props.status === 'loading') return;
        // this.setState({ listStatus: 'loading' });
        ++this.page
        this.props.loadData(this.page);
    }

    loadMore() {
        if (this.props.status === 'nomore') return;
        this.query();
    }

    render() {
        const { topics, status } = this.props;
        console.log('status==>', status);
        const arr = [1, 2, 3, 4, 5, 6];
        return (
            <Layout className="page-home">
                <ScrollList
                    className="topic-list"
                    onTheEnd={this.loadMore}
                    status={status}
                    threshold={200}
                >
                    {topics.length
                        ? topics.map(o => <TopicCard key={o.id} item={o} />)
                        : arr.map(o => <TopicCardShell key={o} />)}
                </ScrollList>
            </Layout>
        );
    }
}

Home.loadData = store => {
    return store.dispatch(loadTopicsData());
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
