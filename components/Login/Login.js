import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import { useState, useEffect, useRef } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import { ApiLogin } from "../../API/ApiLoginRegister";
import { useDispatch } from "react-redux";
import Loading from "../Loading/Loading";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
  errMsg: {
    color: "red",
    fontSize: 12,
    marginLeft: 20,
    paddingTop: 10,
    // paddingTop: 0,
  },
  errBorder: {
    borderWidth: 1,
    borderColor: "red",
  },
});

const Login = ({ navigation, route }) => {
  const tailwind = useTailwind();
  const [dataLogin, setDataLogin] = useState({
    username: "",
    password: "",
  });
  const [inValidData, setInValidData] = useState({
    errUsername: "",
    errPassword: "",
    errRequire: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  // validation password in login
  const handleValidPassword = (val) => {
    if (!val) {
      setInValidData({
        ...inValidData,
        errPassword: "Password is required",
      });
    } else {
      setInValidData({
        ...inValidData,
        errPassword: "",
      });
    }
  };

  // validation username in login
  const handleValidUsername = (val) => {
    if (!val) {
      setInValidData({
        ...inValidData,
        errUsername: "Username is required",
      });
    } else {
      setInValidData({
        ...inValidData,
        errUsername: "",
      });
    }
  };

  useEffect(() => {
    if (dataLogin.username && dataLogin.password) {
      setInValidData({
        ...inValidData,
        errUsername: "",
        errRequire: "",
        errPassword: "",
      });
    }
  }, [dataLogin.password, dataLogin.username]);

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  // login
  const handleSignin = () => {
    if (!dataLogin.username || !dataLogin.password) {
      setInValidData({
        ...inValidData,
        errRequire: "Please fill out all information",
      });
    } else {
      setInValidData({
        ...inValidData,
        errRequire: "",
      });
      ApiLogin(
        {
          username: dataLogin.username,
          password: dataLogin.password,
        },
        navigation,
        dispatch,
        setIsLoading
      );
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          {isLoading ? (
            <Loading />
          ) : (
            <ScrollView>
              <View
                style={{
                  backgroundColor: "rgb(35,115,228)",
                  height: Dimensions.get("screen").height / 3,
                  width: Dimensions.get("screen").width,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  paddingLeft: 25,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Home");
                  }}
                  style={{ position: "absolute", top: 45, left: 13 }}
                >
                  <Ionicons
                    name="arrow-back"
                    size={30}
                    style={{ color: "white" }}
                  />
                </TouchableOpacity>
                <Text
                  style={[tailwind("text-3xl font-bold"), { color: "white" }]}
                >
                  Welcome!
                </Text>
                <Text style={{ color: "white", fontSize: 15 }}>
                  Sign in to receive more multiple benefits
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: "white",
                  minHeight:
                    Dimensions.get("screen").height -
                    Dimensions.get("screen").height / 3 +
                    45,
                  transform: [{ translateY: -45 }],
                  borderTopRightRadius: 30,
                  borderTopLeftRadius: 30,
                }}
              >
                <Text
                  style={[
                    tailwind("text-xl"),
                    {
                      fontWeight: "600",
                      fontSize: 20,
                      marginTop: 20,
                      textAlign: "center",
                    },
                  ]}
                >
                  Login
                </Text>
                <Text
                  style={[
                    tailwind("text-sm"),
                    {
                      marginLeft: 20,
                      fontWeight: "500",
                      fontSize: 13,
                      marginTop: 10,
                    },
                  ]}
                >
                  Username{""}
                  <Text
                    style={{
                      color: "red",
                    }}
                  >
                    *
                  </Text>
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <TextInput
                    keyboardType="text"
                    placeholder="Enter phone Number or your email"
                    value={dataLogin.username}
                    // defaultValue={route.params.username}
                    style={[
                      {
                        paddingLeft: 15,
                        height: 40,
                        fontSize: 13,
                        borderWidth: 1,
                        borderColor: "gray",
                        borderRadius: 6,
                        width: Dimensions.get("screen").width / 1.1,
                      },
                      inValidData.errUsername && styles.errBorder,
                    ]}
                    onChangeText={(value) => {
                      setDataLogin({
                        ...dataLogin,
                        username: value,
                      });
                      handleValidUsername(value);
                    }}
                  ></TextInput>
                </View>
                {inValidData.errUsername ? (
                  <Text style={styles.errMsg}>{inValidData.errUsername}</Text>
                ) : (
                  ""
                )}
                <Text
                  style={[
                    tailwind("text-sm"),
                    {
                      marginLeft: 20,
                      fontWeight: "500",
                      fontSize: 13,
                      marginTop: 10,
                    },
                  ]}
                >
                  Password{""}
                  <Text
                    style={{
                      color: "red",
                    }}
                  >
                    *
                  </Text>
                </Text>
                <View
                  style={[
                    {
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      marginLeft: 18,
                      // marginBottom: 15,
                      width: Dimensions.get("screen").width / 1.1,
                      height: 40,
                      borderWidth: 1,
                      borderColor: "gray",
                      borderRadius: 6,
                      marginTop: 10,
                    },
                    inValidData.errPassword && styles.errBorder,
                  ]}
                >
                  <TextInput
                    autoComplete="password"
                    placeholder="Enter password"
                    secureTextEntry={showPassword ? false : true}
                    value={dataLogin.password}
                    onChangeText={(value) => {
                      setDataLogin({
                        ...dataLogin,
                        password: value,
                      });
                      handleValidPassword(value);
                    }}
                    style={{
                      paddingLeft: 15,
                      fontSize: 13,
                      width: "100%",
                      height: "100%",
                    }}
                    onEndEditing={(e) => {}}
                  ></TextInput>
                  {showPassword ? (
                    <Entypo
                      name="eye"
                      size={18}
                      color={colors.gray}
                      style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        // color: colors.blue,
                      }}
                      onPress={() => {
                        setShowPassword(!showPassword);
                      }}
                    />
                  ) : (
                    <Entypo
                      name="eye-with-line"
                      size={18}
                      color={colors.gray}
                      style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                      }}
                      onPress={() => {
                        setShowPassword(!showPassword);
                      }}
                    />
                  )}
                </View>
                {inValidData.errPassword ? (
                  <Text style={styles.errMsg}>{inValidData.errPassword}</Text>
                ) : (
                  ""
                )}
                {inValidData.errRequire ? (
                  <Text style={styles.errMsg}>{inValidData.errRequire}</Text>
                ) : (
                  ""
                )}
                <TouchableOpacity
                  onPress={() => {
                    // navigation.navigate("Register");
                  }}
                >
                  <Text
                    style={{
                      color: "rgb(50,100,255)",
                      marginLeft: 20,
                      paddingVertical: 10,
                    }}
                  >
                    Forgot password?
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                    marginBottom: 25,
                  }}
                >
                  <TouchableOpacity
                    // onPress={onPressLearnMore}
                    //   color="#841584"
                    //   accessibilityLabel="Learn more about this purple button"
                    style={{
                      backgroundColor: "rgb(8,27,57)",
                      width: Dimensions.get("screen").width / 1.1,
                      borderRadius: 6,
                    }}
                    onPress={() => {
                      handleSignin();
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                        paddingVertical: 10,
                        fontSize: 14,
                        fontWeight: "500",
                      }}
                    >
                      Sign In
                    </Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                    marginBottom: 25,
                  }}
                >
                  <Text style={{ marginRight: 10 }}>
                    Haven't you an account yet?
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Register");
                    }}
                  >
                    <Text style={{ color: "rgb(50,100,255)" }}>Sign Up</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;

// {/* <View
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             marginTop: 10,
//             marginBottom: 25,
//           }}
//         >
//           {/* <Icon size={24} color="black" name="google" /> */}
//           <TouchableOpacity
//             // onPress={onPressLearnMore}
//             //   color="#841584"
//             //   accessibilityLabel="Learn more about this purple button"
//             style={{
//               backgroundColor: "white",
//               width: Dimensions.get("screen").width / 1.1,
//               borderRadius: 6,
//               borderWidth: 1,
//               borderColor: "gray",
//               display: "flex",
//               flexDirection: "row",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <Icon
//               size={18}
//               color="black"
//               name="google"
//               style={{ position: "absolute", left: 15, top: "25%" }}
//             />
//             <Text
//               style={{
//                 color: "black",
//                 textAlign: "center",
//                 paddingVertical: 10,
//                 fontSize: 14,
//                 fontWeight: "800",
//               }}
//             >
//               Sign In With Google
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             // onPress={onPressLearnMore}
//             //   color="#841584"
//             //   accessibilityLabel="Learn more about this purple button"
//             style={{
//               backgroundColor: "white",
//               width: Dimensions.get("screen").width / 1.1,
//               borderRadius: 6,
//               marginTop: 10,
//               borderWidth: 1,
//               borderColor: "gray",
//               display: "flex",
//               flexDirection: "row",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <Icon
//               size={18}
//               color="black"
//               name="apple1"
//               style={{ position: "absolute", left: 15, top: "25%" }}
//             />
//             <Text
//               style={{
//                 color: "black",
//                 textAlign: "center",
//                 paddingVertical: 10,
//                 fontSize: 14,
//                 fontWeight: "800",
//               }}
//             >
//               Sign In With Apple
//             </Text>
//           </TouchableOpacity>
//         </View> */}
