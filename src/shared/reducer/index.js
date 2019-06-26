import {
    RECEIVE_TOPICS,
    RECEIVE_TOPIC,
    REQUEST_TOPIC,
    REQUEST_TOPICS,
} from '../actions';

function topics(
    state = {
        isFetching: false,
        didInvalidate: false,
        items: [],
        status: 'loading',
    },
    action
) {
    switch (action.type) {
        case REQUEST_TOPICS:
            return {
                ...state,
                status: action.status,
            };
        case RECEIVE_TOPICS: {
            let status;
            let items = [...state.items, ...action.topics];
            if (items.length === 0) status = 'empty';
            if (action.topics.length === 0) status = 'nomore';
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                status,
                items,
            };
        }
        default:
            return state;
    }
}

function topicsById(state = {}, action) {
    switch (action.type) {
        case REQUEST_TOPIC:
            return {
                ...state,
            };
        case RECEIVE_TOPIC:
            return {
                ...state,
                [action.topic.id]: {
                    isFetching: false,
                    ...action.topic,
                },
            };
        default:
            return state;
    }
}

export default function(state = {}, action) {
    return {
        topics: topics(state.topics, action),
        topicsById: topicsById(state.topicsById, action),
    };
}
