import fetch from 'isomorphic-fetch';

export const SUBMISSION_RESULT_RECEIVED = 'SUBMISSION_RESULT_RECEIVED';
export function sendSubmission(sourceCode, problemId) {
    const options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'text/plain'
        },
        method: 'post',
        body: sourceCode
    };

    return dispatch => {
        return fetch(`https://jalgoarena.herokuapp.com/problems/${problemId}/submit`, options)
            .then(response => response.json())
            .then(json => dispatch(setSubmissionResult(json)))
    };
}

function setSubmissionResult(result) {
    return {
        type: SUBMISSION_RESULT_RECEIVED,
        result
    }
}

export const SHOW_MODAL = 'SHOW_MODAL';
export function showModal(title) {
    return {
        type: SHOW_MODAL,
        title
    };
}

export const FETCH_PROBLEMS = 'FETCH_PROBLEMS';
export function fetchProblems() {
    const options = {
        headers: {
            'Accept': 'application/json'
        },
        method: 'get'
    };

    return dispatch => {
        return fetch(`https://jalgoarena.herokuapp.com/problems`, options)
            .then(response => response.json())
            .then(json => dispatch(setProblems(json)))
    };
}

function setProblems(problems) {
    return {
        type: FETCH_PROBLEMS,
        problems
    }
}

export const CHANGE_SOURCE_CODE = 'CHANGE_SOURCE_CODE';
export function changeSourceCode(newValue) {
    return {
        type: CHANGE_SOURCE_CODE,
        sourceCode: newValue
    }
}

export const SET_CURRENT_PROBLEM = 'SET_CURRENT_PROBLEM';
export function setCurrentProblem(problemId) {
    return {
        type: SET_CURRENT_PROBLEM,
        problemId
    }
}