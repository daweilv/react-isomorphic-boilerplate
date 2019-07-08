import {
    RECEIVE_TOPICS,
    RECEIVE_TOPIC,
    REQUEST_TOPIC,
    REQUEST_TOPICS,
    ITEMS_STATUS,
    SELECT_TAB,
} from '../actions';
import { combineReducers } from 'redux';

function topics(
    state = { items: [], page: 0, status: ITEMS_STATUS.INIT },
    action
) {
    switch (action.type) {
        case REQUEST_TOPICS: {
            if (state.status === ITEMS_STATUS.INIT) {
                return state;
            } else {
                return {
                    ...state,
                    page: action.page,
                    status: ITEMS_STATUS.LOADING,
                };
            }
        }
        case RECEIVE_TOPICS:
            return {
                ...state,
                page: action.page,
                items: [...state.items, ...action.items],
                status: ITEMS_STATUS.LOADED,
            };
        default:
            return state;
    }
}

function topicsByTab(state = {}, action) {
    switch (action.type) {
        case REQUEST_TOPICS:
        case RECEIVE_TOPICS: {
            return {
                ...state,
                [action.tab]: topics(state[action.tab], action),
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

function selectedTab(state = 'all', action) {
    switch (action.type) {
        case REQUEST_TOPICS:
        case SELECT_TAB:
            return action.tab;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    topicsByTab,
    topicsById,
    selectedTab,
});

export default rootReducer;
