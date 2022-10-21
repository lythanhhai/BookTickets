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

const EmptyNotification = ({ item }) => {
  const tailwind = useTailwind();

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        height: Dimensions.get("screen").height / 1.3,
      }}
    >
      <Image
        source={require("../../assets/Image/notification-bell.png")}
        style={{
          objectFit: "cover",
          resizeMode: "contain",
          height: 75,
          width: 75,
          marginBottom: 15,
        }}
      />
      <View
        style={{
          height: 9,
          width: 14,
          backgroundColor: "rgb(200, 200, 250)",
          marginBottom: 20,
          borderRadius: 50,
          transform: [{ scaleX: 3 }],
        }}
      ></View>
      <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 6 }}>
        You have no notificatons yet
      </Text>
      <Text
        style={{
          marginBottom: 15,
          textAlign: "center",
          width: Dimensions.get("screen").width / 1.3,
        }}
      >
        When there's any update on ticket status, trips or bonus points, you'll
        see it here.
      </Text>
    </View>
  );
};

export default EmptyNotification;
