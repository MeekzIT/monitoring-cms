import { CRATE_ADMIN, DESTSROY_ADMIN, EDIT_ADMIN, GET_ADMINS } from "../types";

const initialState = {
  admins: null,
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADMINS:
      return {
        ...state,
        admins: action.payload,
      };
    case CRATE_ADMIN:
      return {
        ...state,
        admins: [...state.admins, action.payload],
      };
    case EDIT_ADMIN:
      let edited = state.admins?.filter((i) =>
        i.id == action.payload.id ? { ...i, block: !i.block } : i
      );
      return { ...state, admins: edited };
    case DESTSROY_ADMIN:
      let mutable = state.admins?.filter((i) => i.id !== action.payload);
      return { ...state, admins: mutable };
    default:
      return state;
  }
};
