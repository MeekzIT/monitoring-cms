import {
  ADD_COUNTRY,
  DEL_COUNTRY,
  EDIT_COUNTRY,
  GET_COUNTRIES,
  GET_HOME_STATISTICS,
} from "../types";

const initialState = {
  home: null,
  countries: null,
};

export const statisticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_HOME_STATISTICS:
      return { ...state, home: action.payload };
    case GET_COUNTRIES:
      return { ...state, countries: action.payload };
    case DEL_COUNTRY:
      return {
        ...state,
        countries: state.countries.filter((i) => i.id !== action.payload),
      };
    case EDIT_COUNTRY:
      const { id, name, short } = action.payload;
      const updatedItems = state.countries.map((item) =>
        item.id === id ? { ...item, name, short } : item
      );
      return { ...state, countries: updatedItems };
    case ADD_COUNTRY:
      return { ...state, countries: [...state.countries, action.payload] };
    default:
      return state;
  }
};
