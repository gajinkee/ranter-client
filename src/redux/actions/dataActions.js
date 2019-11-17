import {SET_PROBLEMS, LOADING_DATA, LIKE_PROBLEM, UNLIKE_PROBLEM, DELETE_PROBLEM,SET_ERRORS, POST_PROBLEM, CLEAR_ERRORS,LOADING_UI, SET_PROBLEM, STOP_LOADING_UI,SUBMIT_COMMENT} from '../types';
import axios from 'axios';

//getting app problems
export const getProblems=() => dispatch =>{
    dispatch({type: LOADING_DATA});
    axios.get('/problems')
        .then(res =>{
            dispatch({
                type: SET_PROBLEMS,
                payload: res.data
            })
        })
        .catch(err =>{
            dispatch({
                type: SET_PROBLEMS,
                payload: []
            })
        })
}
export const getProblem = (problemId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .get(`/problem/${problemId}`)
      .then((res) => {
        dispatch({
          type: SET_PROBLEM,
          payload: res.data
        });
        dispatch({ type: STOP_LOADING_UI });
      })
      .catch((err) => console.log(err));
  };


//post
export const postProblem = (newProblem) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .post('/problem', newProblem)
      .then((res) => {
        dispatch({
          type: POST_PROBLEM,
          payload: res.data
        });
        dispatch(clearErrors());
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
  };

//like
export const likeProblem = (problemId) => dispatch =>{
    axios.get(`/problem/${problemId}/like`)
        .then(res=>{
            dispatch({
                type: LIKE_PROBLEM,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}

//unlike
export const unlikeProblem = (problemId) => dispatch =>{
    axios.get(`/problem/${problemId}/unlike`)
        .then(res=>{
            dispatch({
                type: UNLIKE_PROBLEM,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}

//comment submit
export const submitComment = (problemId, commentData) => (dispatch) => {
  axios
    .post(`/problem/${problemId}/comment`, commentData)
    .then((res) => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deleteProblem = (problemId) => (dispatch) => {
    axios
      .delete(`/problem/${problemId}`)
      .then(() => {
        dispatch({ type: DELETE_PROBLEM, payload: problemId });
      })
      .catch((err) => console.log(err));
  };
export const getUserData = (userHandle) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .get(`/user/${userHandle}`)
      .then((res) => {
        dispatch({
          type: SET_PROBLEMS,
          payload: res.data.problems
        });
      })
      .catch(() => {
        dispatch({
          type: SET_PROBLEMS,
          payload: null
        });
      });
  };

export const clearErrors = () => (dispatch) => {
    dispatch({type: CLEAR_ERRORS});
  };