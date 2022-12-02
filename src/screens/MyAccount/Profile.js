import React from "react";
import {
  Button,
  Container,
  ScreenContainer,
  TextField,
  withTheme,
} from "@draftbit/ui";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import CustomInput from "../../components/CustomInput/CustomInput";
import colors from "../../constants/colors";
import { useState } from "react";
import { useEffect } from "react";
import { useLayoutEffect } from "react";
import { EditProfile, GetProfile } from "../../API/ApiProfile";
import { useSelector } from "react-redux";

const Profile = (props) => {
  const [textFieldValue, setTextFieldValue] = React.useState(undefined);
  const { theme } = props;
  React.useEffect(() => {
    StatusBar.setBarStyle("dark-content");
  }, []);
  const accessToken = useSelector((state) => state.authenReducer).accessToken;
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [wards, setWards] = useState("");
  const [address, setAddress] = useState("");
  useLayoutEffect(() => {
    GetProfile(setData, accessToken, setIsLoading);
    // console.warn(data);
  }, []);

  const handleEditProfile = () => {
    const Data = {
      address: address,
      city: city,
      country: country,
      email: email,
      name: name,
      phone: phone,
      wards: wards,
    };
    // console.warn(Data)
    EditProfile(Data, accessToken);
  };
  return (
    // <View
    //   style={{
    //     display: "flex",
    //     flexDirection: "column",
    //     backgroundColor: "white",
    //     // justifyContent: "center",
    //     alignItems: "center",
    //     height: Dimensions.get("screen").height,
    //   }}
    // >
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
      {isLoading ? (
        <View
          style={[
            {
              marginTop: 40,
            },
          ]}
        >
          <ActivityIndicator size="large" color={colors.blue} />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            // justifyContent: "center",
            alignItems: "center",
            height:
              Dimensions.get("screen").height -
              Dimensions.get("screen").height / 9,
          }}
        >
          <View
            style={{
              borderRadius: 7,
              backgroundColor: colors.backgroundCardPoint,
              marginVertical: 20,
              marginTop: 30,
              width: "90%",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                paddingVertical: 10,
                paddingHorizontal: 15,
                fontSize: 16,
                borderRadius: 6,
                color: "rgb(40, 40, 40)",
              }}
            >
              {
                "Provide your basic information so that we can help you easily book tickets"
              }
            </Text>
          </View>
          <CustomInput
            label={"Name"}
            defaultValue={data.name}
            setIsLoading={setIsLoading}
            setData={setName}
          />
          <CustomInput
            label={"Email"}
            defaultValue={data.email}
            setIsLoading={setIsLoading}
            setData={setEmail}
          />
          <CustomInput
            label={"Phone number"}
            defaultValue={data.phone}
            setIsLoading={setIsLoading}
            setData={setPhone}
          />
          <CustomInput
            label={"Country"}
            defaultValue={data.country}
            setIsLoading={setIsLoading}
            setData={setCountry}
          />
          <CustomInput
            label={"City"}
            defaultValue={data.city}
            setIsLoading={setIsLoading}
            setData={setCity}
          />
          <CustomInput
            label={"Ward"}
            defaultValue={data.wards}
            setIsLoading={setIsLoading}
            setData={setWards}
          />
          <CustomInput
            label={"Address"}
            defaultValue={data.address}
            setIsLoading={setIsLoading}
            setData={setAddress}
          />
          <View
            style={{
              width: Dimensions.get("screen").width,
              backgroundColor: "white",
              // position: "absolute",
              // bottom: 0,
              // left: 0,
              // right: 0,
              // zIndex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "rgb(220, 220, 220)",
              borderBottomColor: "transparent",
              paddingTop: 20,
              paddingBottom: Platform.OS === "ios" ? 30 : 70,
            }}
          >
            <TouchableOpacity
              //   color="#841584"
              //   accessibilityLabel="Learn more about this purple button"
              style={{
                backgroundColor: "rgb(254,210,61)",
                width: Dimensions.get("screen").width / 1.1,
                borderRadius: 6,
              }}
              onPress={() => {
                handleEditProfile();
              }}
            >
              <Text
                style={{
                  color: "black",
                  textAlign: "center",
                  paddingVertical: 20,
                  fontSize: 16,
                  fontWeight: "500",
                }}
              >
                SAVE
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
      {/* </TouchableWithoutFeedback> */}
    </KeyboardAvoidingView>

    // </View>
  );
};
const styles = StyleSheet.create({
  container9T: {
    marginTop: 24,
    alignItems: "center",
  },
  buttonUf: {
    height: 48,
    alignSelf: "stretch",
  },
  keyboardAvoidingView5A: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  textEa: {
    textAlign: "center",
  },
  containerVk: {
    alignItems: "center",
  },
  textUm: {
    marginTop: 16,
    textAlign: "center",
  },
  imageSq: {
    width: 100,
    height: 100,
    marginTop: 24,
  },
  textFieldK7: {
    height: 82,
    marginTop: 16,
  },
  textField8U: {
    height: 82,
    marginTop: 16,
    width: "100%",
  },
});
export default withTheme(Profile);
