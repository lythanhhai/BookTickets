import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ApiLogin = (Data) => {
  axios({
    method: "post",
    url: "https://book-ticket-doan.herokuapp.com/api/auth/login",
    data: Data,
  })
    .then((res) => {
      return res.data;
    })
    .then(async (data) => {
      try {
        await AsyncStorage.setItem("accessToken", data.accessToken);
      } catch (e) {
        console.warn(e);
      }
    })
    .catch((err) => {
      console.warn(err);
    });
};

const ApiRegister = (Data) => {
  axios({
    method: "post",
    url: "https://book-ticket-doan.herokuapp.com/api/auth/signup",
    data: Data,
  })
    .then((res) => {
      return res.data;
    })
    .then(async (data) => {
      try {
        await AsyncStorage.setItem("accessToken", data.accessToken);
        // console.warn(data.accessToken)
      } catch (e) {
        console.warn(e);
      }
    })
    .catch((err) => {
      console.warn(err);
    });
};

export { ApiLogin, ApiRegister };
