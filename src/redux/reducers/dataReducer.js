import {
    SET_PROBLEMS,
    LIKE_PROBLEM,
    UNLIKE_PROBLEM,
    LOADING_DATA,
    DELETE_PROBLEM,
    POST_PROBLEM,
    SET_PROBLEM,
    SUBMIT_COMMENT
  } from '../types';

  const initialState = {
    problems: [],
    problem: {},
    loading: false
  };

  export default function(state = initialState, action){
    switch (action.type) {
        case LOADING_DATA:
          return {
            ...state,
            loading: true
          };
        case SET_PROBLEMS:
          return {
            ...state,
            problems: action.payload,
            loading: false
          };
        case SET_PROBLEM:
            return {
              ...state,
              problem: action.payload
            };
        case LIKE_PROBLEM:
        case UNLIKE_PROBLEM:
          let index = state.problems.findIndex(
            (problem) => problem.problemId === action.payload.problemId
          );
          state.problems[index] = action.payload;
          if (state.problem.problemId === action.payload.problemId) {
            state.problem = { ...state.problem, ...action.payload };
          }
          return {
            ...state
          };
        case DELETE_PROBLEM:
          //found a work around but not sure why his worked
          let indexnum = state.problems.findIndex(
            problem => problem.problemId === action.payload
          );
          state.problems.splice(indexnum, 1);
          return {
            ...state
          };
        case POST_PROBLEM:
            return {
              ...state,
              problems: [action.payload, ...state.problems]
            };
        case SUBMIT_COMMENT:
            return {
                ...state,
                problem: {
                  ...state.problem,
                  comments: [action.payload, ...state.problem.comments]
                }
              };
        default:
          return state;
      }
  }