import {
  ImageBackground,
  View,
  Text,
  StyleSheets,
  Dimensions,
  Button,
  TouchableOpacity,
  TextInput,
  Image,
  BackHandler,
} from "react-native";
import { useState, useEffect } from "react";
import { useTailwind } from "tailwind-rn";
import Icon from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";

const Register = ({ navigation }) => {
  const tailwind = useTailwind();
  
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
            justifyContent: "space-evenly",
            alignItems: "center",
            marginTop: 30,
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
            placeholder="Phone Number"
            style={{
              paddingLeft: 15,
              height: 40,
              fontSize: 13,
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 6,
              width: Dimensions.get("screen").width / 1.5,
              height: 40,
            }}
          ></TextInput>
        </View>
        <View
          style={{
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
          }}
        >
          <TextInput
            autoComplete="email"
            placeholder="Enter your email"
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
              navigation.navigate("Information");
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
              Continue
            </Text>
          </TouchableOpacity>
        </View>
        <View
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
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
            marginBottom: 25,
          }}
        >
          {/* <Icon size={24} color="black" name="google" /> */}
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
          <Text style={{ marginRight: 10 }}>Haven't you an account yet?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={{ color: "rgb(50,100,255)" }}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
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
