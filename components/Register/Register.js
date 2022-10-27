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
  BackHandler,
  Alert,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { useTailwind } from "tailwind-rn";
import Icon from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import ModalCode from "../Modal/ModalCode";
import colors from "../../constants/colors";
import RBSheet from "react-native-raw-bottom-sheet";
import Entypo from "react-native-vector-icons/Entypo";
import { useValidation } from "react-native-form-validator";
import AwesomeAlert from "react-native-awesome-alerts";
// authen with phonenumber
// import auth from '@react-native-firebase/auth';
// import { auth } from "../../firebase/ConfigureFirebase";
// import { auth, signInWithPhoneNumber } from "../../firebase/ConfigureFirebase";

import { initializeApp, getApp } from "firebase/app";
import {
  getAuth,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";

import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import { firebaseConfig } from "../../firebase/ConfigureFirebase";
import firebase from "firebase/compat/app";
import { ApiRegister } from "../../API/ApiLoginRegister";

const styles = StyleSheet.create({
  errMsg: {
    color: "red",
    fontSize: 12,
    marginLeft: 20,
    paddingVertical: 1,
  },
  errBorder: {
    borderWidth: 1,
    borderColor: "red",
  },
});

const Register = ({ navigation }) => {
  const tailwind = useTailwind();
  const attemptInvisibleVerification = false;
  const [isPhoneNumber, setIsPhoneNumber] = useState(true);
  const refRBSheet = useRef();
  const [dataRegister, setDataRegister] = useState({
    phoneNumber: "",
    email: "",
    password: "",
    re_password: "",
  });
  const [inValidData, setInValidData] = useState({
    errPhoneNumber: "",
    errEmail: "",
    errPassword: "",
    errRe_password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  // sign up
  const onSubmitRegister = () => {
    if (isPhoneNumber) {
      if (
        !inValidData.errPhoneNumber &&
        !inValidData.errPassword &&
        !inValidData.errRe_password &&
        dataRegister.password &&
        dataRegister.phoneNumber &&
        dataRegister.re_password
      ) {
        // getConfirmMethod("+84"+dataRegister.phoneNumber.slice(1, dataRegister.phoneNumber.length))
        sendVerification(dataRegister.phoneNumber);
        refRBSheet.current.open();
      }
    } else {
      if (
        !inValidData.errEmail &&
        !inValidData.errPassword &&
        !inValidData.errRe_password
      ) {
      }
    }
  };
  // validate register data
  const handleValidPhoneNumber = (val) => {
    // console.warn("oke");
    if (val.length > 11) {
      setInValidData({
        ...inValidData,
        errPhoneNumber: "Phone number no more than 11 char",
      });
    } else if (!val) {
      setInValidData({
        ...inValidData,
        errPhoneNumber: "Phone number is required",
      });
    } else {
      setInValidData({
        ...inValidData,
        errPhoneNumber: "",
      });
    }
  };
  const handleValidEmail = (val) => {
    if (!val) {
      setInValidData({
        ...inValidData,
        errEmail: "Email is required",
      });
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)) {
      setInValidData({
        ...inValidData,
        errEmail: "You have entered an invalid email address!",
      });
    } else {
      setInValidData({
        ...inValidData,
        errEmail: "",
      });
    }
  };
  const handleValidPassword = (val) => {
    if (!val) {
      setInValidData({
        ...inValidData,
        errPassword: "Password is required",
      });
    } else if (val.length < 8) {
      setInValidData({
        ...inValidData,
        errPassword: "Password must have at least 8 char",
      });
    } else {
      setInValidData({
        ...inValidData,
        errPassword: "",
      });
    }
  };
  const handleValidRePassword = (val) => {
    if (!val) {
      setInValidData({
        ...inValidData,
        errRe_password: "Confirm password is required",
      });
    } else if (val !== dataRegister.password) {
      setInValidData({
        ...inValidData,
        errRe_password: "Confirm password must same with password",
      });
    } else {
      setInValidData({
        ...inValidData,
        errRe_password: "",
      });
    }
  };
  // authentication with phone number in firebase
  // const [confirm, setConfirm] = useState(null);
  // async function getConfirmMethod(phoneNumber) {
  //   try {
  //     const confirmation = await signInWithPhoneNumber(phoneNumber);
  //     setConfirm(confirmation);
  //   } catch (error) {
  //     console.warn("oke1")
  //     alert(error);
  //   }
  // }
  // async function confirmVerificationCode(code) {
  //   try {
  //     await confirm.confirm(code);
  //     setConfirm(null);
  //   } catch (error) {
  //     console.warn("oke2")
  //     alert('Invalid code');
  //   }
  // }
  // const [code, setCode] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);

  const sendVerification = (phoneNumber) => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    var handlePhone = "";
    if (phoneNumber.length === 10) {
      handlePhone = phoneNumber.slice(1, phoneNumber.length);
    } else {
      handlePhone = phoneNumber;
    }

    phoneProvider
      .verifyPhoneNumber("+84" + handlePhone, recaptchaVerifier.current)
      .then(setVerificationId)
      .catch((err) => {
        // Alert.alert(
        //   "Invalid phone number",
        //   "Please enter your valid phone number!",
        //   [
        //     {
        //       text: "Cancel",
        //       onPress: () => Alert.alert("Cancel Pressed"),
        //       style: "cancel",
        //     },
        //     {
        //       text: "Ok",
        //       onPress: () => Alert.alert("Cancel Pressed"),
        //       style: "cancel",
        //     },
        //   ]
        // );
        console.warn(err);
        refRBSheet.current.close();
        handleShowAlert();
      });
  };

  const confirmCode = (code) => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(() => {
        // setCode("");
        ApiRegister({
          username: dataRegister.phoneNumber,
          password: dataRegister.password,
        });
      })
      .catch((err) => {
        alert(err);
      });
    Alert.alert("Register succefully!!!", "Enter Ok to navigate login screen", [
      {
        text: "Ok",
        onPress: () => {
          navigation.navigate("Login", {
            username: dataRegister.phoneNumber,
          });
        },
        style: "cancel",
      },
    ]);
  };

  // show alert
  const [showAlert, setShowAlert] = useState(false);
  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleHideAlert = () => {
    setShowAlert(false);
  };
  return (
    <View>
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
          style={{ position: "absolute", top: 45, left: 13, color: "white" }}
        >
          <Ionicons name="arrow-back" size={30} style={{ color: "white" }} />
        </TouchableOpacity>
        <Text
          style={{
            color: "white",
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          Welcome!
        </Text>
        <Text style={{ color: "white", fontSize: 15 }}>
          Sign up to receive more multiple benefits
        </Text>
      </View>

      <View
        style={{
          //   display: "flex",
          //   flexDirection: "column",
          //   justifyContent: "center",
          //   paddingLeft: 25,
          backgroundColor: "white",
          height:
            Dimensions.get("screen").height -
            Dimensions.get("screen").height / 3,
          transform: [{ translateY: -45 }],
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: 30,
            marginLeft: 20,
            // marginBottom: 12,
            // width: Dimensions.get('screen').width / 1.1,
          }}
        >
          <Text
            style={{
              color: "black",
              textAlign: "center",
              fontSize: 14,
            }}
          >
            Sign up by:
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 15,
            }}
          >
            <TouchableOpacity
              //   color="#841584"
              //   accessibilityLabel="Learn more about this purple button"
              style={{
                backgroundColor: isPhoneNumber ? colors.blue : "transparent",
                borderRadius: 15,
                height: 13,
                width: 13,
                borderWidth: 1,
                borderColor: colors.gray,
              }}
              onPress={() => {
                setIsPhoneNumber(true);
              }}
            ></TouchableOpacity>
            <Text
              style={{
                color: "black",
                textAlign: "center",
                fontSize: 14,
                paddingLeft: 8,
              }}
              onPress={() => {
                setIsPhoneNumber(true);
              }}
            >
              Phone number
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            <TouchableOpacity
              //   color="#841584"
              //   accessibilityLabel="Learn more about this purple button"
              style={{
                backgroundColor: !isPhoneNumber ? colors.blue : "transparent",
                borderRadius: 15,
                height: 13,
                width: 13,
                borderWidth: 1,
                borderColor: colors.gray,
              }}
              onPress={() => {
                setIsPhoneNumber(false);
              }}
            ></TouchableOpacity>
            <Text
              style={{
                color: "black",
                textAlign: "center",
                fontSize: 14,
                paddingLeft: 8,
              }}
              onPress={() => {
                setIsPhoneNumber(false);
              }}
            >
              Email
            </Text>
          </View>
        </View>
        {/* divide method sign up */}
        {isPhoneNumber ? (
          <>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                marginTop: 20,
                marginBottom: 12,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  // paddingLeft: 10,
                  height: 40,
                  fontSize: 13,
                  borderWidth: 1,
                  borderColor: "gray",
                  borderRadius: 6,
                  width: Dimensions.get("screen").width / 5,
                }}
              >
                <Image
                  source={require("../../assets/Image/adaptive-icon.png")}
                  style={{
                    height: "80%",
                    width: "30%",
                    borderRadius: 10,
                    objectFit: "cover",
                    resizeMode: "contain",
                  }}
                />
                <Text style={{}}>+84</Text>
              </View>
              <TextInput
                keyboardType="numeric"
                label="Your phone number"
                placeholder="Enter phone Number"
                value={dataRegister.phoneNumber}
                onChangeText={(value) => {
                  setDataRegister({
                    ...dataRegister,
                    phoneNumber: value,
                  });
                  handleValidPhoneNumber(value);
                }}
                onEndEditing={(e) => {
                  // handleValidPhoneNumber(e.nativeEvent.text);
                }}
                style={[
                  {
                    paddingLeft: 15,
                    height: 40,
                    fontSize: 13,
                    borderWidth: 1,
                    borderColor: "gray",
                    borderRadius: 6,
                    width: Dimensions.get("screen").width / 1.5,
                    height: 40,
                  },
                  inValidData.errPhoneNumber && styles.errBorder,
                ]}
              ></TextInput>
            </View>
            {inValidData.errPhoneNumber ? (
              <Text style={styles.errMsg}>{inValidData.errPhoneNumber}</Text>
            ) : (
              ""
            )}
          </>
        ) : (
          <>
            <View
              style={[
                {
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  marginLeft: 18,
                  marginTop: 3,
                  marginBottom: 8,
                  width: Dimensions.get("screen").width / 1.1,
                  height: 40,
                  borderWidth: 1,
                  borderColor: "gray",
                  borderRadius: 6,
                  marginTop: 20,
                },
                inValidData.errEmail && styles.errBorder,
              ]}
            >
              <TextInput
                autoComplete="email"
                placeholder="Enter your email"
                value={dataRegister.email}
                onChangeText={(value) => {
                  setDataRegister({
                    ...dataRegister,
                    email: value,
                  });
                  handleValidEmail(value);
                }}
                style={{
                  paddingLeft: 15,
                  fontSize: 13,
                  width: "100%",
                  height: "100%",
                  // width: Dimensions.get("screen").width / 1.1,
                  // height: 40,
                }}
              ></TextInput>
            </View>
            {inValidData.errEmail ? (
              <Text style={styles.errMsg}>{inValidData.errEmail}</Text>
            ) : (
              ""
            )}
          </>
        )}
        {/*  */}
        <View
          style={[
            {
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              marginLeft: 18,
              marginTop: 3,
              marginBottom: 8,
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
            value={dataRegister.password}
            onChangeText={(value) => {
              setDataRegister({
                ...dataRegister,
                password: value,
              });
              handleValidPassword(value);
            }}
            style={{
              paddingLeft: 15,
              fontSize: 13,
              width: "100%",
              height: "100%",
              // width: Dimensions.get("screen").width / 1.1,
              // height: 40,
            }}
            onEndEditing={(e) => {
              // handleValidPassword(e.nativeEvent.text);
            }}
          ></TextInput>
          {showPassword ? (
            <Entypo
              name="eye"
              size={18}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
              }}
              onPress={() => {
                setShowPassword(!showPassword);
              }}
            />
          ) : (
            <Entypo
              name="eye-with-line"
              size={18}
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

        <View
          style={[
            {
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              marginLeft: 18,
              marginTop: 3,
              marginBottom: 8,
              width: Dimensions.get("screen").width / 1.1,
              height: 40,
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 6,
              marginTop: 10,
            },
            inValidData.errRe_password && styles.errBorder,
          ]}
        >
          <TextInput
            autoComplete="password"
            placeholder="Enter re-password"
            secureTextEntry={showPassword ? false : true}
            value={dataRegister.re_password}
            onChangeText={(value) => {
              setDataRegister({
                ...dataRegister,
                re_password: value,
              });
              handleValidRePassword(value);
            }}
            style={{
              paddingLeft: 15,
              fontSize: 13,
              width: "100%",
              height: "100%",
              // width: Dimensions.get("screen").width / 1.1,
              // height: 40,
            }}
          ></TextInput>
          {/* {showPassword ? (
            <Entypo
              name="eye"
              size={18}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
              }}
            />
          ) : (
            <Entypo
              name="eye-with-line"
              size={18}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
              }}
            />
          )} */}
        </View>
        {inValidData.errRe_password ? (
          <Text style={styles.errMsg}>{inValidData.errRe_password}</Text>
        ) : (
          ""
        )}
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
            //   color="#841584"
            //   accessibilityLabel="Learn more about this purple button"
            style={{
              backgroundColor: "rgb(8,27,57)",
              width: Dimensions.get("screen").width / 1.1,
              borderRadius: 6,
            }}
            onPress={() => {
              // openModalConfirmationCode(setModalVisible);
              onSubmitRegister();
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
              Sign up
            </Text>
          </TouchableOpacity>
        </View>

        {/* modal */}

        {isPhoneNumber ? (
          <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={false}
            height={280}
            openDuration={500}
            customStyles={{
              wrapper: {
                // backgroundColor: "transparent",
              },
              draggableIcon: {
                backgroundColor: "#000",
              },
            }}
          >
            {/* <YourOwnComponent /> */}
            <ModalCode
              phoneNumber={dataRegister.phoneNumber}
              confirmCode={confirmCode}
            />
            {/* <ModalCode phoneNumber={dataRegister.phoneNumber} /> */}
          </RBSheet>
        ) : (
          <></>
        )}

        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
          androidHardwareAccelerationDisabled={true}
          androidLayerType="software"
          attemptInvisibleVerification={attemptInvisibleVerification}
          // appVerificationDisabledForTesting={__DEV__}
        />
        {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Invalid phone number"
          message="Please enter your valid phone number!"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Cancel"
          confirmText="Ok"
          confirmButtonColor="#008080"
          onCancelPressed={() => {
            handleHideAlert();
          }}
          onConfirmPressed={() => {
            handleHideAlert();
          }}
        />
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
          <Text style={{ marginRight: 10 }}>Have you an account already?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login", {
                username: "",
              });
            }}
          >
            <Text style={{ color: "rgb(50,100,255)" }}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* <ModalCode
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        /> */}
    </View>
    // <View style={tailwind("pt-12 items-center")}>
    //   <View style={tailwind("bg-blue-200 px-3 py-1 rounded-full")}>
    //     <Text style={tailwind("text-blue-800 font-semibold")}>
    //       Hello Tailwind
    //     </Text>
    //   </View>
    // </View>
  );
};

export default Register;

{
  /* <ModalCode modalVisible={modalVisible} setModalVisible={setModalVisible}/> */
}
{
  /* <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 25,
          }}
        >
          <View
            style={{
              height: 1,
              width: Dimensions.get("screen").width / 2.5,
              backgroundColor: "black",
              marginRight: 10,
            }}
          ></View>
          <Text
            style={{
              fontSize: 13,
            }}
          >
            Or
          </Text>
          <View
            style={{
              height: 1,
              width: Dimensions.get("screen").width / 2.5,
              backgroundColor: "black",
              marginLeft: 10,
            }}
          ></View>
        </View> */
}
{
  /* <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
            marginBottom: 25,
          }}
        >
          <Icon size={24} color="black" name="google" />
          <TouchableOpacity
            // onPress={onPressLearnMore}
            //   color="#841584"
            //   accessibilityLabel="Learn more about this purple button"
            style={{
              backgroundColor: "white",
              width: Dimensions.get("screen").width / 1.1,
              borderRadius: 6,
              borderWidth: 1,
              borderColor: "gray",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon
              size={18}
              color="black"
              name="google"
              style={{ position: "absolute", left: 15, top: "25%" }}
            />
            <Text
              style={{
                color: "black",
                textAlign: "center",
                paddingVertical: 10,
                fontSize: 14,
                fontWeight: "800",
              }}
            >
              Sign In With Google
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={onPressLearnMore}
            //   color="#841584"
            //   accessibilityLabel="Learn more about this purple button"
            style={{
              backgroundColor: "white",
              width: Dimensions.get("screen").width / 1.1,
              borderRadius: 6,
              marginTop: 10,
              borderWidth: 1,
              borderColor: "gray",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon
              size={18}
              color="black"
              name="apple1"
              style={{ position: "absolute", left: 15, top: "25%" }}
            />
            <Text
              style={{
                color: "black",
                textAlign: "center",
                paddingVertical: 10,
                fontSize: 14,
                fontWeight: "800",
              }}
            >
              Sign In With Apple
            </Text>
          </TouchableOpacity>
        </View> */
}
