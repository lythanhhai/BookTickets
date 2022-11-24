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
// import * as Sentry from 'sentry-expo'

const ApiLogin = (Data, navigation, dispatch, setIsLoading) => {
  setIsLoading(true);
  axios({
    method: "post",
    url: `${baseUrl}auth/login`,
    data: Data,
  })
    .then((res) => {
      // console.warn(res.data);
      return res.data;
    })
    .then(async (data) => {
      setIsLoading(false);
      // Sentry.Native.captureException("hha");
      // throw new Error("hhe");
      try {
        if (data.message) {
          // console.warn(data.message);
          Alert.alert(data.message, "Your username or password are incorrect");
        } else {
          await AsyncStorage.setItem("currentUser", JSON.stringify(data));
          // Sentry.captureException(err)
          dispatch(loginAction(data));
          // console.warn(data)
          navigation.goBack("PickupPoint");
        }
      } catch (e) {
        console.warn(e);
      }
    })
    .catch((err) => {
      console.warn(err);
    });
};

const ApiRegister = (
  Data,
  dataRegister,
  navigation,
  dispatch,
  setIsLoading
) => {
  setIsLoading(true);
  axios({
    method: "post",
    url: `${baseUrl}auth/signup`,
    data: Data,
  })
    .then((res) => {
      return res.data;
    })
    .then(async (data) => {
      setIsLoading(false);
      try {
        if (data.message) {
          // console.warn(res.data.message)
          // setErrRegister(data.message);
          Alert.alert(data.message, "Your phone number is existed");
        } else {
          // console.warn(data.accessToken);
          await AsyncStorage.setItem("currentUser", JSON.stringify(data));
          dispatch(signupAction(data));
          // Alert.alert(
          //   "Register succefully!!!",
          //   "Enter Ok to navigate login screen",
          //   [
          //     {
          //       text: "Ok",
          //       onPress: () => {
          //         navigation.navigate("Login", {
          //           username: dataRegister.phoneNumber,
          //         });
          //       },
          //       style: "cancel",
          //     },
          //   ]
          // );
          // navigation.navigate("Home");
          navigation.goBack("PickupPoint");
        }
      } catch (e) {
        console.warn(e);
      }
    })
    .catch((err) => {
      console.warn(err);
    });
};

const ApiLogout = (dispatch, navigation, setIsLoading) => {
  navigation.navigate("Loading");
  // navigation.replace("My_account");
  axios({
    method: "post",
    url: `${baseUrl}auth/logout`,
  })
    .then((res) => {
      return res.data;
    })
    .then(async (data) => {
      // setIsLoading(false);
      await AsyncStorage.removeItem("currentUser");
      dispatch(
        logoutAction({
          userId: null,
          username: "",
          accessToken: "",
          tokenType: "",
        })
      );
      navigation.navigate("Home");
      // Alert.alert("Logout", "Your username or password are incorrect");
    })
    .catch((err) => {
      console.warn(err);
    });
};

const ApiGetCurrent = (setCurrentUser) => {
  axios({
    method: "get",
    url: `${baseUrl}auth/current`,
  })
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      setCurrentUser(data);
    })
    .catch((err) => {
      console.warn(err);
    });
};

export { ApiLogin, ApiRegister, ApiLogout, ApiGetCurrent };
