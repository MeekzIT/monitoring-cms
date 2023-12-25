import axios from "axios";
import { DEL_CATEGORIES, GET_CATEGORIES } from "../types";
import { keys } from "../../keys";
import { EDIR_CATEGORIES } from "../types";
import { ADD_CATEGORIES } from "../types";
import Swal from "sweetalert2";

export const getCategories = () => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/category`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_CATEGORIES,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const delCategories = (id) => {
  return (dispatch) => {
    axios
      .post(
        `${keys.api}/category/del`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${keys.token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.succes) {
          dispatch({
            type: DEL_CATEGORIES,
            payload: id,
          });
          Swal.fire({
            position: "center",
            iconColor: "#008491",
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

export const editCategories = (id, nameHy, nameRu, nameEn, nameGe, nameAz) => {
  return (dispatch) => {
    axios
      .post(
        `${keys.api}/category/edit`,
        { id, nameHy, nameRu, nameEn, nameGe, nameAz },
        {
          headers: {
            Authorization: `Bearer ${keys.token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.succes) {
          dispatch({
            type: EDIR_CATEGORIES,
            payload: { id, nameHy, nameRu, nameEn, nameGe, nameAz },
          });
          Swal.fire({
            position: "center",
            iconColor: "#008491",
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

export const addCategories = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/category/create`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        if (response.data.succes) {
          dispatch({
            type: ADD_CATEGORIES,
            payload: { ...data, id: 99 },
          });
          Swal.fire({
            position: "center",
            iconColor: "#008491",
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
