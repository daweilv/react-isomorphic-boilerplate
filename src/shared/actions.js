import axios from 'axios';

export const REQUEST_TOPICS = 'REQUEST_TOPICS';
export const RECEIVE_TOPICS = 'RECEIVE_TOPICS';
export const REQUEST_TOPIC = 'REQUEST_TOPIC';
export const RECEIVE_TOPIC = 'RECEIVE_TOPIC';
export const SELECT_TAB = 'SELECT_TAB';

export const ITEMS_STATUS = {
    INIT: 'INIT',
    LOADING: 'LOADING',
    LOADED: 'LOADED',
    EMPTY: 'EMPTY',
    ENDED: 'ENDED',
};

export const requestTopics = ({ tab, page }) => {
    return {
        type: REQUEST_TOPICS,
        tab,
        page,
    };
};

export const receiveTopics = ({ tab, page, items }) => {
    return {
        type: RECEIVE_TOPICS,
        tab,
        page,
        items,
    };
};

export const requestTopic = () => {
    return {
        type: REQUEST_TOPIC,
    };
};

export const receiveTopic = topic => {
    return {
        type: RECEIVE_TOPIC,
        topic,
    };
};
export const selectTab = tab => {
    return {
        type: SELECT_TAB,
        tab,
    };
};

export const shouldLoadTopicsData = (state, tab, loadmore) => {
    const obj = state.topicsByTab[tab];
    if (!obj) {
        return true;
    } else if (obj.status === ITEMS_STATUS.LOADING) {
        return false;
    } else if (obj.status === ITEMS_STATUS.INIT || loadmore) {
        return true;
    } else {
        return false;
    }
};

export const loadTopicsData = _ => {
    let params = Object.assign({ tab: 'all' }, _);
    return async (dispatch, getState) => {
        if (shouldLoadTopicsData(getState(), params.tab, params.loadmore)) {
            let obj = getState().topicsByTab[params.tab];
            if (!obj) {
                params.page = 1;
            } else {
                params.page = obj.page + 1;
            }
            dispatch(
                requestTopics({
                    tab: params.tab,
                    page: params.page,
                })
            );
            console.time('topics load time: ');
            try {
                const res = await axios.get(
                    'https://cnodejs.org/api/v1/topics',
                    {
                        params: params,
                    }
                );
                if (res.status === 200 && res.data.success) {
                    dispatch(
                        receiveTopics({
                            tab: params.tab,
                            page: params.page,
                            items: res.data.data,
                        })
                    );
                }
            } catch (e) {
                console.log(e.code);
            }
            console.timeEnd('topics load time: ');
        } else {
            if (getState().selectedTab !== params.tab) {
                dispatch(selectTab(params.tab))
            }
        }
    };
};

export const loadTopicData = id => {
    return async (dispatch, getState) => {
        const { topicsById } = getState();
        if (topicsById[id]) {
            return;
        }
        let res;
        try {
            res = await axios.get(`https://cnodejs.org/api/v1/topic/${id}`);
        } catch (e) {
            console.log(e);
        }

        if (res.status === 200 && res.data.success) {
            dispatch(receiveTopic(res.data.data));
        }
    };
};
