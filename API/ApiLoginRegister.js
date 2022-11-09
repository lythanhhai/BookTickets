import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { loginAction, signupAction } from "../redux/actions/authenAction";
import { baseUrl } from "./config";

const ApiLogin = (Data, navigation, dispatch, setIsLoading) => {
  // const dispatch = useDispatch()
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
    .then((data) => {
      setIsLoading(false);
      try {
        if (data.message) {
          // console.warn(data.message);
          Alert.alert(data.message, "Your username or password are incorrect");
        } else {
          dispatch(loginAction(data));
          // console.warn(data)
          navigation.navigate("Home");
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
    .then((data) => {
      setIsLoading(false);
      try {
        if (data.message) {
          // console.warn(res.data.message)
          // setErrRegister(data.message);
          Alert.alert(data.message, "Your phone number is existed");
        } else {
          // console.warn(data.accessToken);
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
          navigation.navigate("Home");
        }
      } catch (e) {
        console.warn(e);
      }
    })
    .catch((err) => {
      console.warn(err);
    });
};

export { ApiLogin, ApiRegister };
