import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import {
  loginAction,
  logoutAction,
  signupAction,
} from "../redux/actions/authenAction";
import { baseUrl } from "./config";

const GetProfile = (setData, accessToken, setIsLoading) => {
  setIsLoading(true);
  // console.log(accessToken);
  axios({
    method: "get",
    url: `${baseUrl}profile/info`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      // navigation.goBack("PickupPoint");
      return data.body;
    })
    .then((body) => {
      // console.log(body);
      setData(body);
      setIsLoading(false);
    })
    .catch((err) => {
      console.log(err);
    });
};

const EditProfile = (data, accessToken) => {
  // setIsLoading(true);
  // console.log(accessToken);
  axios({
    method: "post",
    url: `${baseUrl}profile/update`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: data,
  })
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      // console.log(data.body);
      Alert.alert("Edit profile successully");
    })
    .catch((err) => {
      console.log(err);
    });
};

export { GetProfile, EditProfile };
