// src/reducers/todoReducer.js

import {
    ADD_GROUP,
    DELETE_GROUP,
    GET_TODO_STATUS_LOADING,
    GET_TODO_STATUS_SUCCESS,
    GET_TODO_STATUS_FAILURE,
  } from './group.types';
  
  const initialState = {
    groups: [{ from: 1, to: 10, statuses: [] }],
    loading: false,
    error: null,
  };
  
  const todoReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_GROUP:
        return {
          ...state,
          groups: [...state.groups, { ...action.payload, statuses: [] }],
        };
      case DELETE_GROUP:
        return {
          ...state,
          groups: state.groups.filter((_, index) => index !== action.payload),
        };
      case GET_TODO_STATUS_LOADING:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case GET_TODO_STATUS_SUCCESS:
        return {
          ...state,
          loading: false,
          groups: state.groups.map((group) =>
            group.from === action.payload.group[0]
              ? { ...group, statuses: action.payload.statuses }
              : group
          ),
        };
      case GET_TODO_STATUS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default todoReducer;
  