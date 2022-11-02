import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import styleGlobal from "../../constants/styleGlobal";
import Header from "../../components/Header/Header";
import { FlatList } from "react-native-gesture-handler";
import { floor1, floor2 } from "../../constants/DataSeat";
import colors from "../../constants/colors";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

const widthScreen = Dimensions.get("screen").width;
const heightScreen = Dimensions.get("screen").height;
const shapeSeat = 55;
const marginSeat = 10;
const backgroundColorReversed = "rgb(225,225,225)";
const styles = StyleSheet.create(styleGlobal);
const stylesItem = StyleSheet.create({
  icon: {
    fontSize: 35,
    fontWeight: "300",
    color: "white",
    // textAlign: "center"
  },
});
const ChooseSeat = ({ navigation, route }) => {
  const hanldeClickSeat = () => {};
  return (
    <View
      style={[
        styles.backgroundBottom,
        {
          backgroundColor: "rgb(240,240,240)",
        },
      ]}
    >
      <View style={[styles.background]}>
        <Header whichScreen={"ChooseSeat"} navigation={navigation} />
      </View>
      <ScrollView
        contentContainerStyle={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        horizontal={false}
        // style={{
        //   display: "flex",
        //   flexDirection: "column",
        //   justifyContent: "center",
        //   alignItems: "center",
        // }}
      >
        <View
          style={{
            height: 130,
            width: widthScreen,
            // backgroundColor: "blue",
          }}
        ></View>
        <View
          style={{
            backgroundColor: "rgb(255, 255, 255)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Image
            source={require("../../assets/Image/Seat/icons8-steering-wheel-96.png")}
            style={{
              height: shapeSeat,
              width: shapeSeat,
              objectFit: "cover",
              // alignSelf: "center",
              marginLeft: marginSeat * 2.7,
              marginTop: 10,
            }}
          />
          <View
            style={{
              // height: 700,
              width: (widthScreen * 90) / 100,
              borderRadius: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              // alignItems: "center"
              paddingVertical: 20,
            }}
          >
            {floor1.map((item, index) => {
              return (
                <TouchableOpacity
                  style={{
                    height: shapeSeat,
                    width: shapeSeat,
                    // backgroundColor:
                    //   item.status === 0
                    //     ? "red"
                    //     : item.status === 1
                    //     ? "green"
                    //     : item.status === 2
                    //     ? "blue"
                    //     : "yellow",
                    margin: marginSeat,
                    borderColor:
                      item.status === 0 ? colors.blue : "transparent",
                    backgroundColor:
                      item.status === 1
                        ? colors.blue
                        : item.status === 2 || item.status === 3
                        ? backgroundColorReversed
                        : "transparent",
                    borderWidth: 1.5,
                    borderRadius: 10,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    hanldeClickSeat();
                  }}
                  disabled={
                    item.status === 2 ? true : item.status === 3 ? true : false
                  }
                >
                  {item.status === 2 ? (
                    <MaterialIcons name="done" style={stylesItem.icon} />
                  ) : item.status === 3 ? (
                    <Ionicons
                      name="remove-circle-outline"
                      style={stylesItem.icon}
                    />
                  ) : (
                    ""
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ChooseSeat;


{/* <FlatList
              data={floor1}
              horizontal={false}
              numColumns={2}
              contentContainerStyle={{ alignSelf: "center" }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={{
                      height: shapeSeat,
                      width: shapeSeat,
                      // backgroundColor:
                      //   item.status === 0
                      //     ? "red"
                      //     : item.status === 1
                      //     ? "green"
                      //     : item.status === 2
                      //     ? "blue"
                      //     : "yellow",
                      margin: marginSeat,
                      borderColor:
                        item.status === 0 ? colors.blue : "transparent",
                      backgroundColor:
                        item.status === 1
                          ? colors.blue
                          : item.status === 2 || item.status === 3
                          ? backgroundColorReversed
                          : "transparent",
                      borderWidth: 1.5,
                      borderRadius: 10,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={() => {
                      hanldeClickSeat();
                    }}
                    disabled={
                      item.status === 2
                        ? true
                        : item.status === 3
                        ? true
                        : false
                    }
                  >
                    {item.status === 2 ? (
                      <MaterialIcons name="done" style={stylesItem.icon} />
                    ) : item.status === 3 ? (
                      <Ionicons
                        name="remove-circle-outline"
                        style={stylesItem.icon}
                      />
                    ) : (
                      ""
                    )}
                  </TouchableOpacity>
                );
              }}
            />
            <View
              style={{
                height: shapeSeat * 6 + marginSeat * 10,
                width: 2,
                backgroundColor: "rgb(0, 0, 0)",
                opacity: 0.3,
                //   margin: marginSeat,
                marginTop: marginSeat,
              }}
            ></View>
            <FlatList
              data={floor1}
              horizontal={false}
              numColumns={2}
              contentContainerStyle={{ alignSelf: "center" }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={{
                      height: shapeSeat,
                      width: shapeSeat,
                      // backgroundColor:
                      //   item.status === 0
                      //     ? "red"
                      //     : item.status === 1
                      //     ? "green"
                      //     : item.status === 2
                      //     ? "blue"
                      //     : "yellow",
                      margin: marginSeat,
                      borderColor:
                        item.status === 0 ? colors.blue : "transparent",
                      backgroundColor:
                        item.status === 1
                          ? colors.blue
                          : item.status === 2 || item.status === 3
                          ? backgroundColorReversed
                          : "transparent",
                      borderWidth: 1.5,
                      borderRadius: 10,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={() => {
                      hanldeClickSeat();
                    }}
                    disabled={
                      item.status === 2
                        ? true
                        : item.status === 3
                        ? true
                        : false
                    }
                  >
                    {item.status === 2 ? (
                      <MaterialIcons name="done" style={stylesItem.icon} />
                    ) : item.status === 3 ? (
                      <Ionicons
                        name="remove-circle-outline"
                        style={stylesItem.icon}
                      />
                    ) : (
                      ""
                    )}
                  </TouchableOpacity>
                );
              }}
            /> */}