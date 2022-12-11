import axios from "axios";
import { baseUrl } from "./config";

const getNotification = (setListNotification) => {
  axios({
    method: "get",
    url: `${baseUrl}get-notification`,
  })
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      return data.body;
    })
    .then((body) => {
      setListNotification(body);
    })
    .catch((err) => console.warn(err));
};

const getUnpaidTicket = (setListUnpaidTicket) => {
  axios({
    method: "get",
    url: `${baseUrl}get-payment`,
  })
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      let arr = data.sort((a, b) => {
        return b.id - a.id;
      });
      setListUnpaidTicket(arr);
    })
    .catch((err) => console.warn(err));
};

export { getNotification, getUnpaidTicket };
