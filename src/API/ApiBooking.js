import axios from "axios";
import { baseUrl } from "./config";
import * as screenName from "../constants/nameScreen";
import { Linking } from "react-native";

const ApiBookingPartSeat = (Data, navigation, setIsLoading, dataTrip) => {
  setIsLoading(true);
  axios({
    method: "post",
    url: `${baseUrl}book/book-part-seat`,
    data: Data,
  })
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      setIsLoading(false);
      // console.warn(data);
      navigation.replace(screenName.inforTicketScreen, {
        list: data,
        dataTrip: dataTrip,
      });
    })
    .catch((err) => {
      console.warn(err);
    });
};

const ApiBookingSeat = (Data, navigation, setIsLoading, dataTrip) => {
  setIsLoading(true);
  axios({
    method: "post",
    url: `${baseUrl}book/book-seat`,
    data: Data,
  })
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      setIsLoading(false);
      // console.warn(data);
      if (data.length > 0) {
        navigation.replace(screenName.inforTicketScreen, {
          list: data,
          dataTrip: dataTrip,
        });
      } else {
      }
    })
    .catch((err) => {
      console.warn(err);
    });
};

const ApiPayment = (Data, navigation, setIsLoading) => {
  setIsLoading(true)
  axios({
    method: "post",
    url: `${baseUrl}payment`,
    data: Data,
  })
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      // console.warn(data);
      setIsLoading(false)
      Linking.openURL(data.toString());
      navigation.navigate("Home");
    })
    .catch((err) => {
      console.warn(err);
    });
};

export { ApiBookingPartSeat, ApiBookingSeat, ApiPayment };
