import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    // height: 100,

    width: "90%",
    borderColor: "rgb(215, 215, 215)",
    borderBottomWidth: 1,
    // borderTopWidth: 1,
    paddingVertical: 15,
  },
  iconStart: {
    fontSize: 25,
  },
  iconEnd: {
    fontSize: 20,
    color: colors.blue,
  },
  containerBetween: {
    width: "65%",
  },
  containerEnd: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
const CardPoint = ({ item, isChosen, setItemChosen }) => {
  // const [itemChosen, setItemChosen] = useState(-1);
  const choosePickupPoint = () => {
    setItemChosen(item);
    // console.warn(item + " " + itemChosen)
  };
  return (
    <View
      style={{
        width: "100%",
        backgroundColor:
          isChosen === item ? colors.backgroundCardPoint : "transparent",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={[styles.container]}
        onPress={() => {
          choosePickupPoint();
        }}
      >
        {isChosen === item ? (
          <Feather name="check-circle" style={[styles.iconStart, {
            color: colors.blue,
          }]} />
        ) : (
          <Feather name="circle" style={styles.iconStart} />
        )}

        <View style={[styles.containerBetween]}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            23:00
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "500",
              paddingTop: 5,
            }}
          >
            35 Nguyen Khuyen
          </Text>
          <Text
            style={{
              color: colors.gray,
              paddingTop: 5,
            }}
          >
            35 Nguyen Khuyen, Hoa Khanh Nam, Lien Chieu, Da Nang
          </Text>
        </View>
        <TouchableOpacity style={[styles.containerEnd]}>
          <Feather name="map-pin" style={styles.iconEnd} />
          <Text
            style={{
              color: colors.blue,
            }}
          >
            View map
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

export default CardPoint;
