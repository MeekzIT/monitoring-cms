import {
  ADD_BOX_EXSPENSE,
  ADD_OWNER,
  ADD_USER,
  CLEAR_DATES,
  DESTROY_BOX_EXSPENSE,
  EDIT_BOX,
  EDIT_BOX_EXSPENSES,
  EDIT_ITEM,
  GET_BOXES,
  GET_BOX_EXPENSES,
  GET_CALC_INFO,
  GET_FILTRED_DATA,
  GET_GENERATED,
  GET_INFO,
  GET_INFO_BENREFITS,
  GET_INFO_MODES,
  GET_INFO_PRCENT,
  GET_ITEM_CURRENT,
  GET_ITEM_DAYS,
  GET_OWNERS_OF_USER,
  GET_SINGLE_BOX,
  GET_SINGLE_OWNER,
  GET_SINGLE_USER,
  GET_USERS,
  DELETE_OWNER,
  GET_SINGLE_ITEM,
  GET_CALC_INFO2,
  GET_INFO_BOX,
  GET_BOXES_INFO,
  GET_ITEM_INFO,
  GET_BOX_INFO,
  ADD_BOX,
} from "../types";

const initialState = {
  users: null,
  count: null,
  single: null,
  boxes: null,
  items: null,
  owner: null,
  box: null,
  itemInfo: null,
  calcData: null,
  calcData2: null,
  benefits: null,
  infoPrcent: null,
  infoByModes: null,
  boxExpernses: null,
  generated: null,
  dates: null,
  filtredDates: null,
  currentValues: null,
  singleItem: null,
  boxInfo: null,
  boxesInfo: null,
  singleBoxInfo: null,
  singleInfo: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEM_CURRENT:
      return {
        ...state,
        currentValues: action.payload,
      };
    case GET_INFO_BOX:
      return {
        ...state,
        boxInfo: action.payload,
      };
    case GET_BOXES_INFO:
      return {
        ...state,
        boxesInfo: action.payload,
      };
    case GET_BOX_INFO:
      return {
        ...state,
        singleBoxInfo: action.payload,
      };
    case GET_ITEM_INFO:
      return {
        ...state,
        singleInfo: action.payload,
      };
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
    case GET_BOXES:
      return {
        ...state,
        boxes: action.payload.paginateData,
        items: action.payload.items,
      };
    case EDIT_BOX:
      const { id, name, geolocation } = action.payload;
      const updatedItems = state.boxes.map((item) =>
        item.id === id ? { ...item, name, geolocation } : item
      );
      return { ...state, boxes: updatedItems };
    case ADD_BOX:
      return {
        ...state,
        boxes: [...state.boxes, action.payload],
      };
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
    case DELETE_OWNER:
      const editedData = state.single.Owners.filter(
        (i) => i.id !== action.payload
      );
      return {
        ...state,
        single: {
          ...state.single,
          Owners: editedData,
        },
      };
    case EDIT_ITEM:
      let editedBox = state.box?.filter((i) =>
        i.id == action.payload.id ? action.payload : i
      );
      return { ...state, box: { ...state.box, Items: editedBox } };
    case GET_INFO:
      return {
        ...state,
        itemIinfo: action.payload,
      };
    case GET_CALC_INFO:
      return {
        ...state,
        calcData: action.payload,
      };
    case GET_CALC_INFO2:
      return {
        ...state,
        calcData2: action.payload,
      };
    case GET_INFO_BENREFITS:
      return {
        ...state,
        benefits: action.payload,
      };
    case GET_INFO_MODES:
      return {
        ...state,
        infoByModes: action.payload,
      };
    case GET_INFO_PRCENT:
      return {
        ...state,
        infoPrcent: action.payload,
      };
    case GET_BOX_EXPENSES:
      return {
        ...state,
        boxExpernses: action.payload,
      };
    case EDIT_BOX_EXSPENSES:
      return {
        ...state,
        boxExpernses: action.payload,
      };
    case ADD_BOX_EXSPENSE:
      return {
        ...state,
        boxExpernses: action.payload,
      };
    case DESTROY_BOX_EXSPENSE:
      let editedExspense = state.boxExpernses?.filter(
        (i) => i.id !== action.payload
      );
      return { ...state, boxExpernses: editedExspense };
    case GET_GENERATED:
      return { ...state, generated: action.payload };
    case GET_ITEM_DAYS:
      return { ...state, dates: action.payload };
    case GET_FILTRED_DATA:
      return { ...state, filtredDates: action.payload };
    case CLEAR_DATES:
      return { ...state, filtredDates: action.payload };
    case GET_SINGLE_ITEM:
      return { ...state, singleItem: action.payload };
    default:
      return state;
  }
};
