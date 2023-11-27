import axios from "axios";
import { keys } from "../../keys";
import {
  ADD_OWNER,
  ADD_USER,
  CLEAR_DATES,
  DELETE_OWNER,
  EDIT_BOX,
  EDIT_ITEM,
  GET_BOXES,
  GET_BOXES_INFO,
  GET_CALC_INFO,
  GET_CALC_INFO2,
  GET_FILTRED_DATA,
  GET_GENERATED,
  GET_INFO,
  GET_INFO_BENREFITS,
  GET_INFO_BOX,
  GET_INFO_MODES,
  GET_INFO_PRCENT,
  GET_ITEM_CURRENT,
  GET_ITEM_DAYS,
  GET_ITEM_INFO,
  GET_OWNERS_OF_USER,
  GET_SINGLE_BOX,
  GET_SINGLE_ITEM,
  GET_SINGLE_OWNER,
  GET_SINGLE_USER,
  GET_USERS,
} from "../types";
import Swal from "sweetalert2";

export const getUsers = (page, adminId) => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/users/`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
        params: {
          offset: page,
          adminId,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_USERS,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const addUsers = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/users/create`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        if (response.data.succes) {
          dispatch({
            type: ADD_USER,
            payload: response.data.data,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getSingleUser = (id) => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/users/single`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
        params: {
          id,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_SINGLE_USER,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getBoxes = (id, boxId) => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/owner/boxes-owners`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
        params: {
          ownerId: id,
          boxId,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_BOXES,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const changeCredentials = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/admin/changeSettings`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        if (response.data.succes) {
          Swal.fire({
            position: "center",
            iconColor: "#21726A",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const changePassword = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/admin/changePassword`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        if (response.data.succes) {
          Swal.fire({
            position: "center",
            iconColor: "#21726A",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const changeBoxSettings = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/box/edit-box`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        if (response.data.succes) {
          dispatch({
            type: EDIT_BOX,
            payload: data,
          });
          Swal.fire({
            position: "center",
            iconColor: "#21726A",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getSingleOwners = (id) => {
  return (dispatch) => {
    dispatch({
      type: GET_SINGLE_OWNER,
      payload: id,
    });
  };
};

export const getSingleBox = (id) => {
  return (dispatch) => {
    dispatch({
      type: GET_SINGLE_BOX,
      payload: id,
    });
  };
};

export const addOwner = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/owner/create`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        if (response.data.succes) {
          dispatch({
            type: ADD_OWNER,
            payload: response.data.data,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const deleteOwner = (data) => {
  return (dispatch) => {
    axios
      .post(
        `${keys.api}/owner/delete-owner`,
        {
          id: data,
        },
        {
          headers: {
            Authorization: `Bearer ${keys.token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.succes) {
          dispatch({
            type: DELETE_OWNER,
            payload: data,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const editItemChanges = (data) => {
  return (dispatch) => {
    axios
      .post(
        `${keys.api}/owner/edit-item`,
        { data },
        {
          headers: {
            Authorization: `Bearer ${keys.token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.succes) {
          dispatch({
            type: EDIT_ITEM,
            payload: response.data.data,
          });
          Swal.fire({
            position: "center",
            iconColor: "#21726A",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getItemInfo = (id, active) => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/owner/item-info`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
        params: {
          id,
          active,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_INFO,
          payload: response.data.info,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const editItemInfo = (data) => {
  return (dispatch) => {
    axios
      .post(
        `${keys.api}/owner/item-info-edit`,
        { data },
        {
          headers: {
            Authorization: `Bearer ${keys.token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.succes) {
          data.active == 1 &&
            dispatch({
              type: GET_INFO,
              payload: response.data.info,
            });
          Swal.fire({
            position: "center",
            iconColor: "#21726A",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getItemInfoCalc = (id) => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/owner/item-info-calc`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
        params: {
          ownerID: id,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_CALC_INFO,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};
export const getItemInfoCalc2 = (id) => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/owner/item-info-calc2`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
        params: {
          ownerID: id,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_CALC_INFO2,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getItemInfoBenefits = (id) => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/owner/item-info-getBenefitsByDate`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
        params: {
          ownerID: id,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_INFO_BENREFITS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getItemInfoPrcent = (id) => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/owner/item-info-expensesBenefitPrcent`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
        params: {
          ownerID: id,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_INFO_PRCENT,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getItemInfoModes = (id) => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/owner/item-info-getBenefitsByModes`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
        params: {
          ownerID: id,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_INFO_MODES,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getItemSingle = (id) => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/owner/item-single`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
        params: {
          id,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_SINGLE_ITEM,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const generatedId = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/owner/generate`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        if (response.data.succes) {
          dispatch({
            type: GET_GENERATED,
            payload: response.data.newId,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getItemDates = (id) => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/owner/item-calc-dates`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
        params: {
          ownerID: id,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_ITEM_DAYS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getItemFiltred = (data) => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/owner/item-calc-money`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
        params: data,
      })
      .then((response) => {
        dispatch({
          type: GET_FILTRED_DATA,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getItemCurrent = (data) => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/owner/item-calc-current`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
        params: data,
      })
      .then((response) => {
        dispatch({
          type: GET_ITEM_CURRENT,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getBoxInfo = (data) => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/owner/get-info`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
        params: data,
      })
      .then((response) => {
        dispatch({
          type: GET_INFO_BOX,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getBoxesInfo = (data) => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/owner/get-boxes-info`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
        params: data,
      })
      .then((response) => {
        dispatch({
          type: GET_BOXES_INFO,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getSingleInfo = (data) => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/owner/get-item-info`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
        params: data,
      })
      .then((response) => {
        dispatch({
          type: GET_ITEM_INFO,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const clearItemFiltred = (data) => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_DATES,
      payload: data,
    });
  };
};
