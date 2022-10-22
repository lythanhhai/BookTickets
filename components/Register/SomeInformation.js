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
import { useTailwind } from "tailwind-rn";
import { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../constants/colors";

const SomeInformation = ({ navigation }) => {
  const tailwind = useTailwind();
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        height: Dimensions.get("window").height / 1.2,
        // flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "transparent",
      }}
    >
      <View
        style={{
          
          paddingVertical: 40,
          width: Dimensions.get("screen").width / 1.1,
        }}
      >
        <Text
          style={{
            textAlign: "justify",
            paddingVertical: 5,
            paddingHorizontal: 8,
            backgroundColor: colors.blueLess,
            fontSize: 13,
            fontWeight: "500"
          }}
        >
          Add extra information in order that we can support you better when
          booking tickets
        </Text>
      </View>
      <Image
        source={require("../../assets/Image/account.png")}
        style={{
          height: 80,
          width: 80,
          objectFit: "cover",
          resizeMode: "contain",
          marginBottom: 20,
        }}
      ></Image>
      <TextInput
        placeholder="Enter your fullname"
        style={{
          paddingLeft: 15,
          height: 40,
          fontSize: 13,
          borderWidth: 1,
          borderColor: colors.gray,
          borderRadius: 6,
          width: Dimensions.get("screen").width / 1.1,
          height: 40,
        }}
      ></TextInput>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 20,
          marginBottom: 20,
          width: Dimensions.get("screen").width / 1.1,
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
            paddingVertical: 10,
          }}
        ></TextInput>
      </View>
      <TextInput
        placeholder="Enter your fullname"
        style={{
          paddingLeft: 15,
          height: 40,
          fontSize: 13,
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 6,
          width: Dimensions.get("screen").width / 1.1,
          height: 40,
          paddingVertical: 0,
        }}
      ></TextInput>
      <View
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
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          borderTopWidth: 1,
          borderTopColor: "rgb(200, 200, 200)",
          width: Dimensions.get("screen").width,
          height: 60,
          backgroundColor: "transparent",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          //   shadowColor: "#000",
          //   shadowOffset: {
          //     width: 0,
          //     height: 4,
          //   },
          //   shadowOpacity: 0.32,
          //   shadowRadius: 5.46,

          //   elevation: 9,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "rgb(170, 170, 170)",
            width: Dimensions.get("screen").width / 1.1,
            borderRadius: 6,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              paddingVertical: 10,
              fontSize: 14,
              fontWeight: "600",
            }}
          >
            Sign up
          </Text>
        </TouchableOpacity>
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

export default SomeInformation;
