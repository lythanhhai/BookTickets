import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  VirtualizedList,
  Animated,
  Alert,
  FlatList,
} from "react-native";
import React from "react";
import styleGlobal from "../../constants/styleGlobal";
import Header from "../../components/Header/Header";
import { floor1, floor2 } from "../../constants/DataSeat";
import colors from "../../constants/colors";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState, useEffect } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { useRef } from "react";
import CardPoint from "../../components/BookingTickets/CardPoint";

const styles = StyleSheet.create(styleGlobal);
const widthDevice = Dimensions.get("screen").width;
const heightDevice = Dimensions.get("screen").height;
const heightModalBottom = 130;
const DropoffPoint = ({ navigation, route }) => {
  const [data, setData] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  const [itemChosen, setItemChosen] = useState(0);
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        height: heightDevice,
      }}
    >
      <View style={[styles.background]}>
        <Header whichScreen={"DropoffPoint"} navigation={navigation} />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: itemChosen
            ? heightDevice - heightDevice / 8.5 - heightModalBottom
            : heightDevice - heightDevice / 8.5,
          width: widthDevice,
          backgroundColor: "white",
        }}
      >
        <FlatList
          data={data}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            if (item === itemChosen) {
              return (
                <CardPoint
                  item={item}
                  isChosen={itemChosen}
                  setItemChosen={setItemChosen}
                />
              );
            } else {
              return <CardPoint item={item} setItemChosen={setItemChosen} />;
            }
          }}
          style={{
            marginTop: 10,
            width: "100%",
          }}
          contentContainerStyle={{}}
        />
      </View>
      <View
        style={{
          width: widthDevice,
          height: heightModalBottom,
          backgroundColor: "white",
          position: "position",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          // justifyContent: "center",
          alignItems: "center",
          paddingTop: 15,
          borderWidth: 1,
          borderColor: "rgb(220, 220, 220)",
        }}
      >
        <TouchableOpacity
          //   color="#841584"
          //   accessibilityLabel="Learn more about this purple button"
          style={{
            backgroundColor: "rgb(254,210,61)",
            width: widthDevice / 1.1,
            borderRadius: 6,
            // marginTop: 0,
          }}
          onPress={() => {}}
        >
          <Text
            style={{
              color: "black",
              textAlign: "center",
              paddingVertical: 20,
              fontSize: 16,
              fontWeight: "500",
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DropoffPoint;
