import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { useState } from "react";
import Header from "../../components/Header/Header";
import SearchFrame from "../../components/BookingTickets/SearchFrame";
import { registerTranslation } from "react-native-paper-dates";
import data from "../../constants/virtualDataRecent";
import Icon from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
  background: {
    backgroundColor: "rgb(35,115,228)",
    height: Dimensions.get("screen").height / 3.4,
    width: Dimensions.get("screen").width,
    display: "flex",
    paddingLeft: Dimensions.get("screen").width / 21,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
});

const RequireLogin = ({ item }) => {
  const tailwind = useTailwind();

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        height: Dimensions.get("screen").height / 1.5,
      }}
    >
      <Image
        source={require("../../assets/Image/account.png")}
        style={{
          objectFit: "cover",
          resizeMode: "contain",
          height: 75,
          width: 75,
          marginBottom: 10,
        //   shadowColor: "#000",
        //   shadowOffset: {
        //     width: 0,
        //     height: 100,
        //   },
        //   shadowOpacity: 0.8,
        //   shadowRadius: 5.46,

        //   elevation: 24,
        }}
      />
      <View style={{
        height: 8,
        width: 11,
        backgroundColor: "rgb(220, 220, 220)",
        marginBottom: 20,
        borderRadius: 50,
        transform: [{ scaleX: 3 }],
      }}></View>
      <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 6 }}>
        Signin required
      </Text>
      <Text style={{ marginBottom: 15 }}>
        Sign in to see your booking history
      </Text>
      <TouchableOpacity
        // onPress={onPressLearnMore}
        //   color="#841584"
        //   accessibilityLabel="Learn more about this purple button"
        style={{
          backgroundColor: colors.colorButton,
          width: Dimensions.get("screen").width / 1.3,
          borderRadius: 6,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            paddingVertical: 13,
            fontSize: 14,
            fontWeight: "500",
          }}
        >
          Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RequireLogin;
