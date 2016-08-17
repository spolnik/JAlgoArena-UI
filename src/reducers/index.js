import {combineReducers} from 'redux';

import {
    CHANGE_SOURCE_CODE,
    FETCH_PROBLEMS,
    SUBMISSION_RESULT_RECEIVED,
    SHOW_MODAL,
    SET_CURRENT_PROBLEM
} from '../actions';

const rootReducer = combineReducers({
    sourceCode,
    problems,
    result,
    showModal,
    modalTitle,
    currentProblemId
});

function sourceCode(state = null, action) {
    switch (action.type) {
        case CHANGE_SOURCE_CODE:
            return action.sourceCode;
        case SET_CURRENT_PROBLEM:
            return null;
        default:
            return state;
    }
}

function problems(state = [], action) {
    switch (action.type) {
        case FETCH_PROBLEMS:
            return action.problems;
        default:
            return state;
    }
}

function result(state = { status_code: 'WAITING' }, action) {
    switch (action.type) {
        case SUBMISSION_RESULT_RECEIVED:
            return action.result;
        case SET_CURRENT_PROBLEM:
            return { status_code: 'WAITING' };
        default:
            return state;
    }
}

function showModal(state = false, action) {
    switch (action.type) {
        case SHOW_MODAL:
            return true;
        case SET_CURRENT_PROBLEM:
        case FETCH_PROBLEMS:
        case SUBMISSION_RESULT_RECEIVED:
            return false;
        default:
            return state;
    }
}

function modalTitle(state = "", action) {
    switch (action.type) {
        case SHOW_MODAL:
            return action.title;
        case SET_CURRENT_PROBLEM:
        case FETCH_PROBLEMS:
        case SUBMISSION_RESULT_RECEIVED:
            return "";
        default:
            return state;
    }
}

function currentProblemId(state = null, action) {
    switch (action.type) {
        case SET_CURRENT_PROBLEM:
            return action.problemId;
        default:
            return state;
    }
}

export default rootReducer;