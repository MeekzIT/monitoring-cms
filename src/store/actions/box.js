import axios from "axios";
import { keys } from "../../keys";
import {
  ADD_BOX_EXSPENSE,
  DESTROY_BOX_EXSPENSE,
  EDIT_BOX_EXSPENSES,
  GET_BOX_EXPENSES,
} from "../types";
import Swal from "sweetalert2";

export const getBoxExpenses = (boxId) => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/box`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
        params: {
          boxId,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_BOX_EXPENSES,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const editBoxExpenses = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/box/edit`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        if (response.data.succes) {
          dispatch({
            type: EDIT_BOX_EXSPENSES,
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

export const addBoxExpenses = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/box/create`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        if (response.data.succes) {
          dispatch({
            type: ADD_BOX_EXSPENSE,
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

export const destroyBoxExpenses = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/box/del`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        if (response.data.succes) {
          dispatch({
            type: DESTROY_BOX_EXSPENSE,
            payload: data.id,
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
