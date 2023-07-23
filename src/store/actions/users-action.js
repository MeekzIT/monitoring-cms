import axios from "axios";
import { keys } from "../../keys";
import {
  ADD_OWNER,
  ADD_USER,
  EDIT_BOX,
  EDIT_ITEM,
  GET_BOXES,
  GET_INFO,
  GET_OWNERS_OF_USER,
  GET_SINGLE_BOX,
  GET_SINGLE_OWNER,
  GET_SINGLE_USER,
  GET_USERS,
} from "../types";
import Swal from "sweetalert2";

export const getUsers = (page) => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/users/`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
        params: {
          offset: page,
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

export const getBoxes = (id) => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/owner/boxes-owners`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
        params: {
          ownerId: id,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_BOXES,
          payload: response.data.paginateData,
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

export const getOwnersOfUser = (id) => {
  return (dispatch) => {
    dispatch({
      type: GET_OWNERS_OF_USER,
      payload: id,
    });
  };
};

export const changeBoxSettings = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/users/edit-box`, data, {
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

export const getItemInfo = (id) => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/owner/item-info`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
        params: {
          id,
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
