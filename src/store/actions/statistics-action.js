import axios from "axios";
import {
  ADD_COUNTRY,
  DEL_COUNTRY,
  EDIT_COUNTRY,
  GET_COUNTRIES,
  GET_HOME_STATISTICS,
} from "../types";
import { keys } from "../../keys";
import Swal from "sweetalert2";

export const getHomePageStatistics = () => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/superStatistics/user-country`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_HOME_STATISTICS,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getCountries = () => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/country`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_COUNTRIES,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const delCountries = (id) => {
  return (dispatch) => {
    axios
      .post(
        `${keys.api}/country/del`,
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
            type: DEL_COUNTRY,
            payload: id,
          });
          Swal.fire({
            position: "center",
            iconColor: "#00a896",
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

export const editCountries = (id, name, short) => {
  return (dispatch) => {
    axios
      .post(
        `${keys.api}/country/edit`,
        { id, name, short },
        {
          headers: {
            Authorization: `Bearer ${keys.token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.succes) {
          dispatch({
            type: EDIT_COUNTRY,
            payload: { id, name, short },
          });
          Swal.fire({
            position: "center",
            iconColor: "#00a896",
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

export const addCountries = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/country/create`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        if (response.data.succes) {
          dispatch({
            type: ADD_COUNTRY,
            payload: { ...data, id: 99 },
          });
          Swal.fire({
            position: "center",
            iconColor: "#00a896",
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
