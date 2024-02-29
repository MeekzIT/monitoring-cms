import { REGISTRATE_ORDER } from "../types";

const initialState = {
  status: null,
};

export const subscribeReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTRATE_ORDER:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};
