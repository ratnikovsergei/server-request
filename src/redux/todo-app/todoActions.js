import {
  ADD_TODO,
  REMOVE_TODO,
  TOGGLE_STATUS,
  SET_SEARCH,
  DELETE_ALL,
  EDIT_TODO,
  TOGGLE_SORT,
} from "./actionTypes";

export const addTodo = (text) => {
  return {
    type: ADD_TODO,
    payload: text,
  };
};

export const removeTodo = (id) => {
  return {
    type: REMOVE_TODO,
    payload: id,
  };
};

export const editTodo = (id, newTitle) => {
  return {
    type: EDIT_TODO,
    payload: { id, newTitle },
  };
};

export const toggleStatus = (id) => {
  return {
    type: TOGGLE_STATUS,
    payload: id,
  };
};

export const setSearch = (search) => {
  return {
    type: SET_SEARCH,
    payload: search,
  };
};

export const deleteAllTodos = () => {
  return {
    type: DELETE_ALL,
  };
};

export const toggleSort = () => {
  return {
    type: TOGGLE_SORT,
  };
};
