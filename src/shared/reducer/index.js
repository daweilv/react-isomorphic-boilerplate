import { RECEIVE_TOPICS, RECEIVE_TOPIC, REQUEST_TOPIC } from '../actions';

function topics(
    state = {
        isFetching: false,
        didInvalidate: false,
        items: [],
    },
    action
) {
    switch (action.type) {
        case RECEIVE_TOPICS:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                items: action.topics,
                // lastUpdated: action.receivedAt,
            };
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
