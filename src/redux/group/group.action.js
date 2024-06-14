import { ADD_GROUP, DELETE_GROUP, GET_TODO_STATUS_FAILURE, GET_TODO_STATUS_LOADING, GET_TODO_STATUS_SUCCESS } from "./group.types";


export const PostGroup = (from, to) => ({
  type: ADD_GROUP,
  payload: { from, to },
});

export const deleteGroup = (groupIndex) => ({
  type: DELETE_GROUP,
  payload: groupIndex,
});

export const gettodo = (group) => async (dispatch) => {
  dispatch({ type: GET_TODO_STATUS_LOADING, payload: group });

  try {
    const statuses = await Promise.all(
      group.map((id) => fetch(`https://jsonplaceholder.typicode.com/todos/${id}`).then((res) => res.json()))
    );
    dispatch({ type: GET_TODO_STATUS_SUCCESS, payload: { group, statuses } });
  } catch (error) {
    dispatch({ type: GET_TODO_STATUS_FAILURE, payload: error.message });
  }
};
