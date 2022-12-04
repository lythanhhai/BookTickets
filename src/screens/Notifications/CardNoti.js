import React from "react";
import { useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import colors from "../../constants/colors";
import { calculateSumHour } from "../../utils/calculateSumHour";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",

    width: "95%",
    borderColor: "rgb(215, 215, 215)",
    borderBottomWidth: 1,
    // borderTopWidth: 1,
    paddingVertical: 15,
  },
  iconStart: {
    fontSize: 21,
    marginHorizontal: 15,
  },
  iconEnd: {
    fontSize: 25,
    color: colors.blue,
  },
  containerBetween: {
    width: "65%",
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
  },
});
const CardNoti = ({ item }) => {
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
        // console.warn("oke");
      }}
    >
      <TouchableOpacity style={[styles.container]} disabled={true}>
        {/* {isChosen === item ? (
          <Feather
            name="check-circle"
            style={[
              styles.iconStart,
              {
                color: colors.blue,
              },
            ]}
          />
        ) : (
          <Feather name="circle" style={styles.iconStart} />
        )} */}

        <Ionicons
          name="notifications-outline"
          style={[styles.iconStart, { color: colors.blue }]}
        />

        <View style={[styles.containerBetween]}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "500",
              color: "rgb(75, 75, 75)",
            }}
          >
            {item.notificationTitle.includes("book")
              ? "You booked successfully ticket"
              : "You canceled successfully ticket"}
          </Text>
          <Text
            style={{
              fontSize: 14,
              //   fontWeight: "500",
              paddingTop: 7,
            }}
          >
            {item.dateBook.split("T")[0]} {", "}
            {"at "}
            {item.dateBook
              .split("T")[1]
              .split(".")[0]
              .split(":")
              .slice(0, 2)
              .join(":")}
          </Text>
        </View>
        {/* <TouchableOpacity style={[styles.containerEnd]}>
          <MaterialIcons name="navigate-next" style={styles.iconEnd} />
        </TouchableOpacity> */}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default CardNoti;
