import { SET_SEARCH } from "../actionTypes";

const initialState = {
  searchValue: "",
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH:
      return { searchValue: action.payload };
    default:
      return state;
  }
};
