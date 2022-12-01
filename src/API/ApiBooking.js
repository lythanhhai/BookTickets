import axios from "axios";
import { baseUrl } from "./config";
import * as screenName from "../constants/nameScreen";
import { Alert, Linking } from "react-native";

const ApiBookingPartSeat = (
  Data,
  navigation,
  setIsLoading,
  dataTrip,
  setUrl
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
      // console.warn(data);
      ApiPaymentAfterBooking(
        {
          id: data.paymentId,
          price: data.totalPrice,
        },
        setUrl
      );
      navigation.replace(screenName.inforTicketScreen, {
        list: data,
        dataTrip: dataTrip,
      });
    })
    .catch((err) => {
      console.warn(err);
    });
};

const ApiBookingSeat = (Data, navigation, setIsLoading, dataTrip, setUrl) => {
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
      // if (data.length > 0) {
      // } else {
      // }
      ApiPaymentAfterBooking(
        {
          id: data.paymentId,
          price: data.totalPrice,
        },
        setUrl
      );
      navigation.replace(screenName.inforTicketScreen, {
        list: data,
        dataTrip: dataTrip,
      });
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

const ApiPaymentAfterBooking = (Data, setUrl) => {
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
      setUrl(data.url.toString());
    })
    .catch((err) => {
      console.warn(err);
    });
};

const ApiRefund = (idPayment, navigation) => {
  axios({
    method: "post",
    url: `${baseUrl}refund${idPayment}`,
  })
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      navigation.navigate("Home");
      Alert.alert("This book removed successfully");
    })
    .catch((err) => {
      console.warn(err);
    });
};

const ApiRefundEdit = (idPayment, Data, nameScreen) => {
  axios({
    method: "post",
    url: `${baseUrl}refund${idPayment}`,
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
