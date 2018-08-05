// @flow

import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"

import * as types from "../../client/constants/ActionTypes"
import * as actions from "../../client/problems/actions"

import Submission from "../../client/problems/domain/Submission";
import Problem from "../../client/problems/domain/Problem";

jest.mock('sockjs-client');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("async actions", () => {
    beforeEach(() => {
        fetch.resetMocks()
    });

    it("creates SUBMISSION_PUBLISHED when judgement has been done", () => {
        let submission = new Submission(
            "dummy source code", "user-id", "fib", "submission-id", "token"
        );

        fetch.mockResponseOnce(JSON.stringify(submission));

        const SOURCE_CODE = "dummy_source_code";
        const PROBLEM_ID = "fib";

        const expectedActions = [{
            type: types.SUBMISSION_PUBLISHED,
            submissionId: "submission-id"
        }];

        const store = mockStore({sourceCode: "", result: "", problemId: ""});

        return store.dispatch(actions.judgeCode(SOURCE_CODE, PROBLEM_ID, "0-0", "dummy_token"))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it("creates FETCH_PROBLEMS_SUCCESS when fetching of problems has been done", () => {
        let problems = [
            FIB_PROBLEM
        ];

        fetch.mockResponseOnce(JSON.stringify(problems));

        const expectedActions = [{
            type: types.FETCH_PROBLEMS_SUCCESS,
            problems
        }];

        const store = mockStore({problems: []});

        return store.dispatch(actions.fetchProblems())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });
});

let FIB_PROBLEM = new Problem(
    "fib",
    "Fibonacci",
    "Write the `fib` function to return the N'th term.\r\nWe start counting from:\r\n* fib(0) = 0\r\n* fib(1) = 1.\r\n\r\n### Examples\r\n\r\n* `0` -> `0`\r\n* `6` -> `8`",
    1,
    "",
    1
);
