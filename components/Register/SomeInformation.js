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

const radiusInput = 10;
const verticalPadding = 15;
const marginTop = 20;

const SomeInformation = ({ navigation, remind, whichScreen }) => {
  const tailwind = useTailwind();
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);
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
          source={require("../../assets/Image/account.png")}
          style={{
            height: 80,
            width: 80,
            objectFit: "cover",
            resizeMode: "contain",
            marginTop: 20,
          }}
        ></Image>
      )}
      <TextInput
        placeholder="Enter your fullname"
        style={{
          paddingLeft: 15,
          fontSize: 13,
          borderWidth: 1,
          borderColor: colors.gray,
          borderRadius: 10,
          width: Dimensions.get("screen").width / 1.1,
          paddingVertical: verticalPadding,
          marginTop: marginTop,
        }}
      ></TextInput>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
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
            // paddingVertical: verticalPadding,
            height: 45,
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
          placeholder="Phone Number"
          style={{
            paddingLeft: 15,
            fontSize: 13,
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: radiusInput,
            width: Dimensions.get("screen").width / 1.5,
            paddingVertical: verticalPadding,
          }}
        ></TextInput>
      </View>
      <TextInput
        placeholder="Email to receive E-ticket"
        style={{
          paddingLeft: 15,
          fontSize: 13,
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: radiusInput,
          width: Dimensions.get("screen").width / 1.1,
          paddingVertical: verticalPadding,
          marginTop: marginTop,
        }}
      ></TextInput>
      <TextInput
        placeholder="Other requests or contact information"
        multiline={true}
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
