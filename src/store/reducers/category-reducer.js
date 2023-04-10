import {
  ADD_CATEGORIES,
  DEL_CATEGORIES,
  EDIR_CATEGORIES,
  GET_CATEGORIES,
} from "../types";

const initialState = {
  categories: null,
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return { ...state, categories: action.payload };
    case DEL_CATEGORIES:
      return {
        ...state,
        categories: state.categories.filter((i) => i.id !== action.payload),
      };
    case EDIR_CATEGORIES:
      const { id, nameHy, nameRu, nameEn, nameGe, nameAz } = action.payload;
      const updatedItems = state.categories.map((item) =>
        item.id === id
          ? { ...item, nameHy, nameRu, nameEn, nameGe, nameAz }
          : item
      );
      return { ...state, categories: updatedItems };
    case ADD_CATEGORIES:
      return { ...state, categories: [...state.categories, action.payload] };
    default:
      return state;
  }
};
