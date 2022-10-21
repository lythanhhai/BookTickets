import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
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

const CardRecent = ({ item }) => {
  const tailwind = useTailwind();

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginTop: 10,
        width: Dimensions.get("screen").width / 2,
        height: 75,
        backgroundColor: "white",
        paddingVertical: 8,

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
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Entypo
          size={18}
          color="black"
          name="location-pin"
          style={{
            marginHorizontal: 15,
            fontSize: 13,
            color: "rgb(35,115,228)",
          }}
        />
        <View
          style={{
            height: "17%",
            width: 1,
            backgroundColor: "black",
          }}
        ></View>
        <Entypo
          size={18}
          color="black"
          name="location-pin"
          style={{
            marginHorizontal: 15,
            fontSize: 13,
            color: "red",
          }}
        />
      </View>
      <View>
        {/* <Text style={{ color: "black" }}>{data.departLocation}</Text>
        <Text>{data.arriveLocation}</Text>
        <Text>{data.date}</Text>
         */}
        <Text
          style={{
            color: "black",
            position: "absolute",
            top: -1,
            fontSize: 12,
            fontWeight: "bold",
          }}
        >
          {item.departLocation}
        </Text>
        <Text
          style={{
            color: "black",
            position: "absolute",
            top: 21,
            fontSize: 12,
            fontWeight: "bold",
          }}
        >
          {item.arriveLocation}
        </Text>
        <Text
          style={{
            color: "rgb(110, 110, 110)",
            position: "absolute",
            top: 43,
            fontSize: 10,
          }}
        >
          {item.date}
        </Text>
      </View>
      <Icon
        size={18}
        name="arrowright"
        style={{
          fontSize: 18,
          color: "black",
          position: "absolute",
          top: 10,
          right: 15,
        }}
      />
    </View>
  );
};

export default CardRecent;
