// @flow
import {ProblemSubmissionRatio} from "../../submissions/domain/ProblemSubmissionRatio";
import * as types from "../../constants/ActionTypes"
import {RankingEntry} from "../domain/RankingEntry";
import {ProblemRankingEntry} from "../domain/ProblemRankingEntry";
import {setErrorMessage} from "../../common/actions";
import * as moment from "moment";
import {Dispatch} from "redux";

type Action = {type:string}
    | {type:string, problemRanking: Array<ProblemRankingEntry>}
    | {type:string, ranking:Array<RankingEntry>}

export function fetchProblemRanking(problemId: string) {
    const options = {
        headers: {
            'Accept': 'application/json'
        },
        method: 'get'
    };

    return (dispatch: Dispatch) => {
        return fetch(`/api/ranking/api/ranking/problem/${problemId}`, options)
            .then(response => response.json())
            .then(json => {
                if (json.error) {
                    dispatch(setErrorMessage("Cannot connect to Ranking Service: \n" + JSON.stringify(json.error)))
                } else {
                    dispatch(setProblemRanking((json: Array<ProblemRankingEntry>)))
                }
            })
            .catch((error) => console.log(`[err] GET /api/ranking/api/ranking/problem/${problemId}:` + error));
    };
}

function setProblemRanking(problemRanking: Array<ProblemRankingEntry>): Action {
    return {
        type: types.FETCH_PROBLEM_RANKING,
        problemRanking
    }
}

export function startRankingRefresh() {
    return {
        type: types.START_RANKING_REFRESH
    }
}

function rankingRefreshFinished() {
    return {
        type: types.RANKING_REFRESH_FINISHED
    }
}

export function fetchRanking() {
    const options = {
        headers: {
            'Accept': 'application/json'
        },
        method: 'get'
    };

    return (dispatch: Dispatch) => {
        return fetch(`/api/ranking/api/ranking/`, options)
            .then(response => response.json())
            .then(json => {
                if (json.error) {
                    dispatch(setErrorMessage("Cannot connect to Ranking Service: " + JSON.stringify(json.error)))
                } else {
                    dispatch(setRanking((json: Array<RankingEntry>)));
                    setTimeout(() => dispatch(rankingRefreshFinished()), 2000);
                }
            })
            .catch((error) => console.log(`[err] GET /api/ranking/api/ranking/:` + error));
    };
}

function setRanking(ranking: Array<RankingEntry>): Action {
    return {
        type: types.FETCH_RANKING,
        ranking
    }
}

function fetchPreviousRanking(date: string) {
    const options = {
        headers: {
            'Accept': 'application/json'
        },
        method: 'get'
    };

    let daysFromStart = moment().dayOfYear() - moment(date).dayOfYear();

    let previousRankingDate = moment().subtract(1, 'days');

    if (daysFromStart > 7) {
        previousRankingDate = moment().subtract(7, 'days');
    }
    let dateToFetch = previousRankingDate.format('YYYY-MM-DD');

    return (dispatch: Dispatch) => {
        return fetch(`/api/ranking/api/ranking/${dateToFetch}`, options)
            .then(response => response.json())
            .then(json => {
                if (json.error) {
                    dispatch(setErrorMessage("Cannot connect to Ranking Service: " + JSON.stringify(json.error)))
                } else {
                    dispatch(setPreviousRanking((json: Array<RankingEntry>)))
                }
            })
            .catch((error) => console.log(`[err] GET /api/ranking/api/ranking/${date}:` + error));
    };
}

function setPreviousRanking(previousRanking: Array<RankingEntry>): Action {
    return {
        type: types.FETCH_PREVIOUS_RANKING,
        previousRanking
    }
}

export function fetchRankingStartDate() {
    const options = {
        headers: {
            'Accept': 'application/json'
        },
        method: 'get'
    };

    return (dispatch: Dispatch) => {
        return fetch(`/api/ranking/api/ranking/startDate`, options)
            .then(response => response.text())
            .then(date => {
                if (/\d\d\d\d-\d\d-\d\d/.test(date)) {
                    dispatch(setRankingStartDate((date: string)));
                    dispatch(fetchPreviousRanking(date));
                } else {
                    dispatch(setErrorMessage("Incorrect format of a date: " + date))
                }
            })
            .catch((error) => console.log(`[err] GET /api/ranking/api/ranking/startDate:` + error));
    };
}

function setRankingStartDate(startDate: string): Action {
    return {
        type: types.FETCH_RANKING_START_DATE,
        startDate
    }
}

export function fetchSolvedProblemsRatio() {
    const options = {
        headers: {
            'Accept': 'application/json'
        },
        method: 'get'
    };

    return (dispatch: Dispatch) => {
        return fetch(`/api/ranking/api/solved-ratio`, options)
            .then(response => response.json())
            .then(json => {
                if (json.error) {
                    dispatch(setErrorMessage("Cannot connect to Ranking Service: " + JSON.stringify(json.error)))
                } else {
                    dispatch(setSolvedProblemsRatio((json: Array<ProblemSubmissionRatio>)))
                }
            })
            .catch((error) => console.log(`[err] GET /api/ranking/api/solved-ratio:` + error));
    };
}

function setSolvedProblemsRatio(solvedProblemsRatio: Array<ProblemSubmissionRatio>): Action {
    return {
        type: types.FETCH_PROBLEMS_SOLUTION_RATIO,
        solvedProblemsRatio
    }
}