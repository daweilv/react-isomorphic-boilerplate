import axios from 'axios';

export const REQUEST_TOPICS = 'REQUEST_TOPICS';
export const RECEIVE_TOPICS = 'RECEIVE_TOPICS';
export const REQUEST_TOPIC = 'REQUEST_TOPIC';
export const RECEIVE_TOPIC = 'RECEIVE_TOPIC';

export const requestTopics = () => {
    return {
        type: REQUEST_TOPICS,
    };
};

export const receiveTopics = topics => {
    return {
        type: RECEIVE_TOPICS,
        topics,
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

export const loadTopicsData = () => {
    return async dispatch => {
        dispatch(requestTopics());
        const res = await axios.get('https://cnodejs.org/api/v1/topics');
        if (res.status === 200 && res.data.success) {
            dispatch(receiveTopics(res.data.data));
        }
    };
};
export const loadTopicData = id => {
    return async (dispatch, getState) => {
        const { topicsById } = getState();
        if (topicsById[id]) {
            return;
        }
        dispatch(requestTopic());
        const res = await axios.get(`https://cnodejs.org/api/v1/topic/${id}`);
        if (res.status === 200 && res.data.success) {
            dispatch(receiveTopic(res.data.data));
        }
    };
};
