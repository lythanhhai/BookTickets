import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import styleGlobal from "../../constants/styleGlobal";
import Header from "../../components/Header/Header";
import { useState, useEffect } from "react";
import CardPoint from "../../components/BookingTickets/CardPoint";
import * as screenName from "../../constants/nameScreen";

const styles = StyleSheet.create(styleGlobal);
const widthDevice = Dimensions.get("screen").width;
const heightDevice = Dimensions.get("screen").height;
const heightModal = (20 * heightDevice) / 100;
const heightModalBottom = 130;
const PickupPoint = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const [itemChosen, setItemChosen] = useState(0);
  const handleChoosePickup = () => {
    navigation.replace("DropoffPoint", route.params);
  };
  useEffect(() => {
    // console.warn(route.params.routeStations)
    let arrayRes = [];
    route.params.routeStations.forEach((item, index) => {
      arrayRes.push(item[0]);
    });
    setData(arrayRes);
  }, []);
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        height: heightDevice,
      }}
    >
      <View style={[styles.background]}>
        <Header
          whichScreen={screenName.pickupPointScreen}
          navigation={navigation}
          item={route.params}
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: itemChosen
            ? heightDevice - heightDevice / 8.5 - 110
            : heightDevice - heightDevice / 8.5,
          width: widthDevice,
          backgroundColor: "white",
        }}
      >
        <FlatList
          data={data}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            if (item === itemChosen) {
              return (
                <CardPoint
                  item={item}
                  isChosen={itemChosen}
                  setItemChosen={setItemChosen}
                  route={route}
                  index={index}
                  dropScreen={false}
                />
              );
            } else {
              return (
                <CardPoint
                  item={item}
                  setItemChosen={setItemChosen}
                  route={route}
                  index={index}
                  dropScreen={false}
                />
              );
            }
          }}
          style={{
            marginTop: 10,
            width: "100%",
          }}
          contentContainerStyle={{}}
        />
      </View>
      {itemChosen ? (
        <View
          style={{
            width: widthDevice,
            // height: heightModal,
            backgroundColor: "white",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            // justifyContent: "center",
            alignItems: "center",
            // paddingTop: 15,
            borderWidth: 1,
            borderColor: "rgb(220, 220, 220)",
            paddingTop: 20,
            paddingBottom: Platform.OS === "ios" ? 30 : 70,
          }}
        >
          <TouchableOpacity
            //   color="#841584"
            //   accessibilityLabel="Learn more about this purple button"
            style={{
              backgroundColor: "rgb(254,210,61)",
              width: widthDevice / 1.1,
              borderRadius: 6,
            }}
            onPress={() => {
              handleChoosePickup();
            }}
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
      ) : (
        <></>
      )}
    </View>
  );
};

export default PickupPoint;
