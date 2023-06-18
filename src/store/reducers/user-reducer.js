import {
  ADD_OWNER,
  ADD_USER,
  EDIT_BOX,
  EDIT_ITEM,
  GET_BOXES,
  GET_OWNERS_OF_USER,
  GET_SINGLE_BOX,
  GET_SINGLE_OWNER,
  GET_SINGLE_USER,
  GET_USERS,
} from "../types";

const initialState = {
  users: null,
  count: null,
  single: null,
  boxes: null,
  owner: null,
  box: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload.paginateData,
        count: action.payload.count,
      };
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
        count: Number(state.count) + 1,
      };
    case GET_SINGLE_USER:
      return {
        ...state,
        single: action.payload,
      };
    case GET_OWNERS_OF_USER:
      const userBoxes = state.single?.Owners?.filter(
        (i) => i.id == action.payload
      )[0]?.Boxes;
      return {
        ...state,
        boxes: userBoxes,
      };
    case GET_BOXES:
      console.log(action.payload, "action.payloadaction.payloadaction.payload");
      return {
        ...state,
        boxes: action.payload,
      };
    case EDIT_BOX:
      const { id, name, geolocation } = action.payload;
      const updatedItems = state.boxes.map((item) =>
        item.id === id ? { ...item, name, geolocation } : item
      );
      return { ...state, boxes: updatedItems };
    case GET_SINGLE_OWNER:
      let singleOwner = state.single?.Owners?.filter(
        (i) => i.id == action.payload
      );
      return {
        ...state,
        owner: singleOwner[0],
      };
    case GET_SINGLE_BOX:
      let singleBox = state.boxes?.filter((i) => i.id == action.payload);
      console.log(state.boxes, "-------------");
      return {
        ...state,
        box: singleBox[0],
      };
    case ADD_OWNER:
      return {
        ...state,
        single: {
          ...state.single,
          Owners: [...state.single.Owners, action.payload],
        },
      };
    case EDIT_ITEM:
      let editedBox = state.box?.filter((i) =>
        i.id == action.payload.id ? action.payload : i
      );
      return { ...state, box: { ...state.box, Items: editedBox } };
    default:
      return state;
  }
};
