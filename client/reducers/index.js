import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux'

import {
    CHANGE_SOURCE_CODE,
    FETCH_PROBLEMS,
    JUDGE_RESULT_RECEIVED,
    SHOW_MODAL,
    SET_CURRENT_PROBLEM,
    SUBMISSION_SAVED,
    FETCH_SUBMISSIONS,
    FETCH_RANKING
} from '../actions';

import {
    Checked_Session_Status,
    Login_Fail,
    Login_Success,
    Logout_Success,
    SignUp_Fail,
    SignUp_Success
} from '../actions/AuthActions';

import {updateUserInfo} from "./AuthReducers";

const rootReducer = combineReducers({
    sourceCode,
    problems,
    result,
    showModal,
    currentProblemId,
    routing: routerReducer,
    userAuthSession: updateUserInfo,
    submissions,
    ranking
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
        case JUDGE_RESULT_RECEIVED:
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
        case JUDGE_RESULT_RECEIVED:
        case SUBMISSION_SAVED:
        case FETCH_SUBMISSIONS:
        case FETCH_RANKING:
        case Checked_Session_Status:
        case Login_Fail:
        case Login_Success:
        case Logout_Success:
        case SignUp_Fail:
        case SignUp_Success:
            return false;
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

function submissions(state = [], action) {
    switch (action.type) {
        case SUBMISSION_SAVED:
        case FETCH_SUBMISSIONS:
            return action.submissions;
        default:
            return state;
    }
}

function ranking(state = [], action) {
    switch (action.type) {
        case FETCH_RANKING:
            return action.ranking;
        default:
            return state;
    }
}

export default rootReducer;