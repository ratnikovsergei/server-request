import { TOGGLE_SORT } from "../actionTypes";

const initialState = {
  ascending: true,
};

export const sortReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SORT:
      return {
        ...state,
        ascending: !state.ascending,
      };
    default:
      return state;
  }
};
