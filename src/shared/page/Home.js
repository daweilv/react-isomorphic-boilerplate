import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ITEMS_STATUS, loadTopicsData } from '../actions';
import TopicCard from '../component/TopicCard';
import TopicCardShell from '../component/TopicCardShell';
import Layout from '../component/Layout';
import ScrollList from '@/shared/component/ScrollList';
import { parseSearch } from '@/shared/util/urlUtil';

function mapStateToProps(state) {
    const { topicsByTab, selectedTab } = state;
    const { items, status } = topicsByTab[selectedTab] || {
        items: [],
        page: 0,
        status: ITEMS_STATUS.INIT,
    };
    return { items, status, selectedTab };
}

const mapDispatchToProps = dispatch => ({
    loadData: query => {
        dispatch(loadTopicsData(query));
    },
});

class Home extends Component {
    constructor(props) {
        super(props);
        this.loadMore = this.loadMore.bind(this);
    }

    componentDidMount() {
        console.log('HomeContainer componentDidMount');
        const { selectedTab } = this.props;
        this.props.loadData({ tab: selectedTab });
    }

    componentDidUpdate(prevProps) {
        console.log('HomeContainer componentDidUpdate');
        if (prevProps.location !== this.props.location) {
            let tab = parseSearch(this.props.location.search).tab;
            this.props.loadData({
                tab: tab || 'all',
            });
        }
    }

    loadMore() {
        if (this.props.status === ITEMS_STATUS.ENDED) return;
        this.query();
    }

    query() {
        const { selectedTab } = this.props;
        this.props.loadData({ tab: selectedTab, loadmore: true });
    }

    render() {
        const { items, status, selectedTab } = this.props;
        return (
            <Layout className="page-home">
                <ScrollList
                    className="topic-list"
                    onTheEnd={this.loadMore}
                    status={status}
                    threshold={200}
                    key={selectedTab}
                >
                    {status === ITEMS_STATUS.INIT ? (
                        <TopicCardShell />
                    ) : (
                        items.map(o => <TopicCard key={o.id} item={o} />)
                    )}
                </ScrollList>
            </Layout>
        );
    }
}

Home.loadData = (store, { query, params }) => {
    return store.dispatch(loadTopicsData({ ...query, ...params }));
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
