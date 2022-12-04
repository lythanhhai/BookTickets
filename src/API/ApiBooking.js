import axios from "axios";
import { baseUrl } from "./config";
import * as screenName from "../constants/nameScreen";
import { Alert, Linking } from "react-native";
import { create } from "tailwind-rn/dist";

const ApiBookingPartSeat = (
  Data,
  navigation,
  setIsLoading,
  dataTrip,
  setUrl,
  setResponseDataTicket,
  createNoti
) => {
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
      if (data?.paymentId) {
        setResponseDataTicket(data);
        ApiPaymentAfterBooking(
          {
            id: data.paymentId,
            price: data.totalPrice,
          },
          setUrl,
          navigation,
          createNoti,
          data
        );
      } else {
        Alert.alert("Sorry, booking isn't successfully!");
      }
      // console.warn("booking oke");
      // navigation.replace(screenName.inforTicketScreen, {
      //   list: data,
      //   dataTrip: dataTrip,
      // });
    })
    .catch((err) => {
      console.warn(err);
    });
};

const ApiBookingSeat = (
  Data,
  navigation,
  setIsLoading,
  dataTrip,
  setUrl,
  setResponseDataTicket,
  createNoti
) => {
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
      if (data?.paymentId) {
        setResponseDataTicket(data);
        ApiPaymentAfterBooking(
          {
            id: data.paymentId,
            price: data.totalPrice,
          },
          setUrl,
          navigation,
          createNoti,
          data
        );
      } else {
        Alert.alert("Sorry, booking isn't successfully!");
      }
      // console.warn("booking oke");
      // console.warn(data);
      // navigation.replace(screenName.inforTicketScreen, {
      //   list: data,
      //   dataTrip: dataTrip,
      // });
    })
    .catch((err) => {
      console.warn(err);
    });
};

const ApiPayment = (Data, navigation, setIsLoading) => {
  setIsLoading(true);
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
      setIsLoading(false);
      Linking.openURL(data.url.toString());
      navigation.navigate("Home");
    })
    .catch((err) => {
      console.warn(err);
    });
};

const ApiPaymentAfterBooking = (
  Data,
  setUrl,
  navigation,
  createNoti,
  response
) => {
  axios({
    method: "post",
    url: `${baseUrl}payment`,
    data: Data,
  })
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      createNoti({ ...response, url: data.url.toString() });
      setUrl(data.url.toString());
      Linking.openURL(data.url.toString());
      navigation.navigate("Home");
    })
    .catch((err) => {
      console.warn(err);
    });
};

const ApiRefund = (idPayment, navigation) => {
  axios({
    method: "post",
    url: `${baseUrl}refund/${idPayment}`,
  })
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      Alert.alert("This book removed successfully");
      navigation.navigate("Home");
    })
    .catch((err) => {
      console.warn(err);
    });
};

const ApiRefundEdit = (idPayment, Data, nameScreen) => {
  axios({
    method: "post",
    url: `${baseUrl}refund/${idPayment}`,
  })
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      navigation.replace(nameScreen, Data);
    })
    .catch((err) => {
      console.warn(err);
    });
};

export {
  ApiBookingPartSeat,
  ApiBookingSeat,
  ApiPayment,
  ApiRefund,
  ApiRefundEdit,
};
