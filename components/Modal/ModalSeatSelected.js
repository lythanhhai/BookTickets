import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Modal,
  Button,
  TextInput,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import RBSheet from "react-native-raw-bottom-sheet";

import colors from "../../constants/colors";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: { paddingVertical: 30 },
  cellRoot: {
    width: width / 7 - 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginRight: 10,
  },
  cellText: {
    color: "#000",
    fontSize: 36,
    textAlign: "center",
  },
  focusCell: {
    borderBottomColor: colors.blue,
    // color: "gray",
    borderBottomWidth: 2,
  },
});

const CELL_COUNT = 6;

const ModalSeatSelected = ({
  navigation,
  route,
  showModalSeat,
  heightBottomSheet,
  dataModalSeat
}) => {
  return (
    <View
      style={{
        // position: "absolute",
        // bottom: 0,
        // left: 0,
        // marginTop: 20,
        height: heightBottomSheet,
        width: "100%",
        backgroundColor: "white",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        // transform: [{ translateY: 0 }],
        marginBottom: showModalSeat ? 0 : -heightBottomSheet,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        borderTopColor: "rgb(220, 220, 220)",
        borderTopWidth: 1,
        borderEndColor: "rgb(220, 220, 220)",
        borderEndWidth: 1,
        borderStartColor: "rgb(220, 220, 220)",
        borderStartWidth: 1,
      }}
    >
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          height: "40%",
        }}
      >
        <View
          style={{
            width: "60%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Text>{dataModalSeat.numberSeat} seat selected</Text>
          <Text>
            {dataModalSeat.nameSeats.map((item, index) => {
              if (
                index ===
                dataModalSeat.nameSeats.length -
                  1
              ) {
                return dataModalSeat.nameSeats[index];
              }
              return `${dataModalSeat.nameSeats[index]}, `;
            })}
          </Text>
        </View>
        <Text>{dataModalSeat.price}VND</Text>
      </View>
      <TouchableOpacity
        //   color="#841584"
        //   accessibilityLabel="Learn more about this purple button"
        style={{
          backgroundColor: "rgb(254,210,61)",
          width: Dimensions.get("screen").width / 1.1,
          borderRadius: 6,
          // marginTop: 0,
        }}
        onPress={() => {}}
      >
        <Text
          style={{
            color: "black",
            textAlign: "center",
            paddingVertical: 15,
            fontSize: 16,
            fontWeight: "500",
          }}
        >
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalSeatSelected;
