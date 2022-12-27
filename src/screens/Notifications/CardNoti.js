import React from "react";
import { useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import colors from "../../constants/colors";
import { calculateSumHour } from "../../utils/calculateSumHour";
import moment from "moment";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    borderColor: "rgb(215, 215, 215)",
    borderBottomWidth: 1,
    paddingVertical: 18,
  },
  iconStart: {
    fontSize: 32,
    marginLeft: 6,
    width: "8%",
  },
  iconEnd: {
    fontSize: 25,
    color: colors.blue,
  },
  containerBetween: {
    width: "66%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  containerEnd: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "25%",
    marginRight: 4,
  },
});
const CardNoti = ({ item, navigation }) => {
  // useEffect(() => {
  //   console.warn(item.dateBook);
  // }, []);
  return (
    <TouchableOpacity
      style={{
        width: "100%",
        backgroundColor: "transparent",
        alignItems: "center",
      }}
      onPress={() => {
        if (!item.historyBooking) {
          Alert.alert(item.title, item.content);
        } else {
          navigation.navigate("DetailTicket", item.historyBooking);
        }
      }}
    >
      <TouchableOpacity style={[styles.container]} disabled={true}>
        <Entypo
          name="dot-single"
          style={[styles.iconStart, { color: colors.blue }]}
        />
        <View style={[styles.containerBetween]}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: colors.blue,
              paddingBottom: 5,
            }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              fontSize: 15,
              // fontWeight: "500",
              color: "rgb(60, 60, 60)",
            }}
            numberOfLines={1}
          >
            {item.content}
          </Text>
          <Text
            style={{
              fontSize: 12,
              //   fontWeight: "500",
              paddingTop: 7,
              color: "rgb(100, 100, 100)",
            }}
          >
            {item.createdAt.split("T")[0]} {", "}
            {"at "}
            {item.createdAt
              .split("T")[1]
              .split(".")[0]
              .split(":")
              .slice(0, 2)
              .join(":")}
          </Text>
        </View>
        <View style={[styles.containerEnd]}>
          <Text
            style={{
              fontSize: 10,
            }}
          >
            {moment
              .utc(
                `${item.createdAt.split("T")[0]} ${item.createdAt
                  .split("T")[1]
                  .split(".")[0]
                  .split(":")
                  .slice(0, 3)
                  .join(":")}`
              )
              .local()
              .startOf("seconds")
              .fromNow()}
          </Text>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default CardNoti;
