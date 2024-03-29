import axios from "axios";
import { keys } from "../../keys";
import { REGISTRATE_ORDER } from "../types";

export const registrateOrder = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/order/registrate`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        if (response.data.succes) {
          window.location.href = response.data.data;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getOrderStatus = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/order`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        if (response.data.succes) {
          dispatch({
            type: REGISTRATE_ORDER,
            payload: response.data.data,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};
