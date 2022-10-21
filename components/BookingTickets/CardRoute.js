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

const styles = StyleSheet.create({
  background: {
    backgroundColor: "rgb(35,115,228)",
    height: Dimensions.get("screen").height / 3.4,
    width: Dimensions.get("screen").width,
    display: "flex",
    // flexDirection: "column",
    // justifyContent: "center",
    paddingLeft: Dimensions.get("screen").width / 21,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
});

const CardRoute = ({ item }) => {
  const tailwind = useTailwind();

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginTop: 10,
        width: Dimensions.get("screen").width / 3,
        backgroundColor: "white",
        // paddingVertical: 8,

        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 4,

        borderRadius: 8,
        marginRight: 10,
      }}
    >
      <Image
        source={require("../../assets/Image/busDemonstrate.jpeg")}
        style={{
          width: Dimensions.get("screen").width / 3,
          height: 100,
          objectFit: "cover",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          position: "relative",
          //   top: 0,
          //   left: 0,
          top: 0,
        }}
      ></Image>
      <Text
        style={{
          paddingHorizontal: 6,
          paddingTop: 5,
          fontWeight: "500",
        }}
      >
        {item.departLocation} - {item.arriveLocation}
      </Text>
      <Text style={{ paddingHorizontal: 4, paddingTop: 4 }}>{item.price}</Text>
      <Text
        style={{
          paddingHorizontal: 4,
          paddingTop: 2,
          paddingBottom: 5,
          fontSize: 10,
          textDecorationLine: "line-through",
        }}
      >
        {item.originalPrice}
      </Text>
    </View>
  );
};

export default CardRoute;
