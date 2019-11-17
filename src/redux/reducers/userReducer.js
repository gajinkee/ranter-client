import {
    SET_USER,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    LIKE_PROBLEM,
    UNLIKE_PROBLEM,
    MARK_NOTIFICATIONS_READ,
  } from '../types';
  
  const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: []
  };

  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_AUTHENTICATED:
        return {
          ...state,
          authenticated: true
        };
      case SET_UNAUTHENTICATED:
        return initialState;
      case SET_USER:
        return {
          authenticated: true,
          loading: false,
          ...action.payload
        };
        case LOADING_USER:
          return{
            ...state,
            loading: true
          };
        case LIKE_PROBLEM:
          return {
             ...state,
            likes: [
             ...state.likes,
              {
                userHandle: state.credentials.handle,
                problemId: action.payload.problemId
              }
            ]
          };
        case UNLIKE_PROBLEM:
          return {
              ...state,
              likes: state.likes.filter(
                (like) => like.problemId !== action.payload.problemId
              )
            };
        case MARK_NOTIFICATIONS_READ:
          state.notifications.forEach((not) => (not.read = true));
          return {
            ...state
            };
      default:
        return state;
    }
  }
  