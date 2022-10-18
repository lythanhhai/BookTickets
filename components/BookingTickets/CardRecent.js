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

        backgroundColor: "white",
        paddingVertical: 8,

        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.14,
        shadowRadius: 10,

        elevation: 9,
        borderRadius: 10,
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
        <Icon
          size={18}
          color="black"
          name="calendar"
          style={{
            marginHorizontal: 15,
            fontSize: 13,
            color: "rgb(35,115,228)",
          }}
        />
        <View
          style={{
            height: "15%",
            width: 1,
            backgroundColor: "black",
          }}
        ></View>
        <Icon
          size={18}
          color="black"
          name="calendar"
          style={{
            marginHorizontal: 15,
            fontSize: 13,
            color: "rgb(35,115,228)",
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
            marginTop: -2,
            fontSize: 12,
            fontWeight: "bold",
          }}
        >
          {item.departLocation}
        </Text>
        <Text
          style={{
            color: "black",
            paddingTop: 5,
            fontSize: 12,
            fontWeight: "bold",
          }}
        >
          Quang Tri
        </Text>
        <Text
          style={{
            color: "rgb(110, 110, 110)",
            paddingTop: 5,
            fontSize: 10,
          }}
        >
          19/10/2022
        </Text>
      </View>
      <Icon
        size={18}
        color="black"
        name="calendar"
        style={{
          fontSize: 15,
          color: "rgb(35,115,228)",
          position: "absolute",
          top: 20,
          right: 20,
        }}
      />
    </View>
  );
};

export default CardRecent;
