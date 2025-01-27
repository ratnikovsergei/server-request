import { SET_FILTER } from "../actionTypes";

const initialState = {
  filter: "",
};

export const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER:
      return { ...state, filter: action.payload };
    default:
      return state;
  }
};
