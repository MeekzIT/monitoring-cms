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
          window.location.href = `/payment/${response.data.data.mdOrder}`;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const createOrder = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/order/`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        
      })
      .catch((error) => {
        console.error(error);
      });
  };
};
