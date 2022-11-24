import {
  View,
  Text,
  StyleSheets,
  Dimensions,
  TextInput,
  Image,
  BackHandler,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import { useState, useEffect } from "react";
import colors from "../../constants/colors";
import * as screenName from "../../constants/nameScreen";
import { useSelector } from "react-redux";

const radiusInput = 7;
const verticalPadding = 5;
const marginTop = 20;

const SomeInformation = ({
  navigation,
  remind,
  whichScreen,
  setData,
  data,
  inValidData,
  setInValidData,
}) => {
  const tailwind = useTailwind();
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);

  const handleValidPhoneNumber = (val) => {
    if (val.length > 11) {
      setInValidData({
        ...inValidData,
        errPhone: "Phone number no more than 11 number!",
      });
    } else if (!val) {
      setInValidData({
        ...inValidData,
        errPhone: "Phone number is required!",
      });
    } else {
      setInValidData({
        ...inValidData,
        errPhone: "",
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
  const handleValidName = (val) => {
    if (!val) {
      setInValidData({
        ...inValidData,
        errName: "Name is required",
      });
    } else {
      setInValidData({
        ...inValidData,
        errName: "",
      });
    }
  };

  const userCurrent = useSelector((state) => state.authenReducer);
  return (
    <KeyboardAvoidingView
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white",
        height:
          Dimensions.get("screen").height -
          Dimensions.get("screen").height / 8.5,
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View
        style={{
          borderRadius: 7,
          backgroundColor: colors.backgroundCardPoint,
          marginTop: marginTop,
        }}
      >
        <Text
          style={{
            textAlign: "left",
            paddingVertical: 10,
            paddingHorizontal: 15,
            fontSize: 15,
            borderRadius: 6,
            color: "rgb(40, 40, 40)",
          }}
        >
          {remind}
        </Text>
      </View>

      {screenName.inforDetailScreen === whichScreen ? (
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            alignSelf: "flex-start",
            marginLeft: 20,
            marginTop: marginTop,
          }}
        >
          Passenger details
        </Text>
      ) : (
        <Image
          source={require("../../../assets/Image/account.png")}
          style={{
            height: 80,
            width: 80,
            objectFit: "cover",
            resizeMode: "contain",
            marginTop: 20,
          }}
        ></Image>
      )}
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <TextInput
          placeholder="Enter your fullname"
          onChangeText={(value) => {
            // console.warn(value)
            setData({
              ...data,
              name: value,
            });
            handleValidName(value);
          }}
          style={{
            paddingLeft: 15,
            fontSize: 13,
            borderWidth: 1,
            borderColor: inValidData.errName ? "red" : "gray",
            borderRadius: 10,
            width: Dimensions.get("screen").width / 1.1,
            paddingVertical: verticalPadding,
            marginTop: marginTop,
          }}
        ></TextInput>
        {inValidData.errName ? (
          <Text
            style={{
              color: "red",
              fontSize: 12,
              // marginLeft: 20,
              paddingTop: 10,
            }}
          >
            {inValidData.errName}
          </Text>
        ) : (
          ""
        )}
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginTop: marginTop,
          width: Dimensions.get("screen").width / 1.1,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            fontSize: 13,
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: radiusInput,
            width: Dimensions.get("screen").width / 5,
            // paddingVertical: 20,
            height: 40,
          }}
        >
          <Image
            source={require("../../../assets/Image/adaptive-icon.png")}
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
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <TextInput
            keyboardType="numeric"
            label="Your phone number"
            placeholder="Phone Number"
            defaultValue={userCurrent.username}
            onChangeText={(value) => {
              setData({
                ...data,
                phoneNumber: value,
              });
              handleValidPhoneNumber(value);
            }}
            style={{
              paddingLeft: 15,
              fontSize: 13,
              borderWidth: 1,
              borderColor: inValidData.errPhone ? "red" : "gray",
              borderRadius: radiusInput,
              width: Dimensions.get("screen").width / 1.5,
              paddingVertical: verticalPadding,
            }}
          ></TextInput>
          {inValidData.errPhone ? (
            <Text
              style={{
                color: "red",
                fontSize: 12,
                // marginLeft: 20,
                paddingTop: 10,
              }}
            >
              {inValidData.errPhone}
            </Text>
          ) : (
            ""
          )}
        </View>
      </View>
      <View>
        <TextInput
          placeholder="Email to receive E-ticket"
          onChangeText={(value) => {
            setData({
              ...data,
              email: value,
            });
            handleValidEmail(value);
          }}
          style={{
            paddingLeft: 15,
            fontSize: 13,
            borderWidth: 1,
            borderColor: inValidData.errEmail ? "red" : "gray",
            borderRadius: radiusInput,
            width: Dimensions.get("screen").width / 1.1,
            paddingVertical: verticalPadding,
            marginTop: marginTop,
          }}
        ></TextInput>
        {inValidData.errEmail ? (
          <Text
            style={{
              color: "red",
              fontSize: 12,
              // marginLeft: 20,
              paddingTop: 10,
            }}
          >
            {inValidData.errEmail}
          </Text>
        ) : (
          ""
        )}
      </View>
      <View>
        <TextInput
          placeholder="Other requests or contact information"
          multiline={true}
          onChangeText={(value) => {
            // console.warn(value);
            setData({
              ...data,
              note: value,
            });
          }}
          style={{
            paddingLeft: 15,
            fontSize: 13,
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: radiusInput,
            width: Dimensions.get("screen").width / 1.1,
            paddingVertical: verticalPadding,
            marginTop: marginTop,
            height: Dimensions.get("screen").height / 7,
          }}
        ></TextInput>
        {inValidData.errRequire ? (
          <Text
            style={{
              color: "red",
              fontSize: 12,
              marginLeft: 20,
              paddingTop: 10,
            }}
          >
            {inValidData.errRequire}
          </Text>
        ) : (
          ""
        )}
      </View>
      {/* <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 15,
            paddingBottom: 13,
            paddingLeft: 20,
            fontWeight: "600",
          }}
        >
          Gender
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: Dimensions.get("screen").width,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: colors.blue,
              width: Dimensions.get("screen").width / 4,
              borderRadius: 40,
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                paddingVertical: 10,
                fontSize: 13,
              }}
            >
              Male
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: colors.blue,
              width: Dimensions.get("screen").width / 4,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                paddingVertical: 10,
                fontSize: 13,
              }}
            >
              Female
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: colors.blue,
              width: Dimensions.get("screen").width / 4,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                paddingVertical: 10,
                fontSize: 13,
              }}
            >
              Different
            </Text>
          </TouchableOpacity>
        </View>
      </View> */}
    </KeyboardAvoidingView>
  );
};

export default SomeInformation;
