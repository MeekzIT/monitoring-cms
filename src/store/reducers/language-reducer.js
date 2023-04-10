import { CHANGE_CURRENCY, CHANGE_LANGUAGE } from "../types";

const initialState = {
  lang: localStorage.getItem("language"),
};

export const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return {
        ...state,
        lang: action.payload,
      };
    default:
      return state;
  }
};
