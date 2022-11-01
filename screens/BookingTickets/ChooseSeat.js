import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import styleGlobal from "../../constants/styleGlobal";
const styles = StyleSheet.create(styleGlobal);
import Header from "../../components/Header/Header";
import { FlatList } from "react-native-gesture-handler";
import { floor1, floor2 } from "../../constants/DataSeat";
import colors from "../../constants/colors";

const widthScreen = Dimensions.get("screen").width;
const heightScreen = Dimensions.get("screen").height;
const shapeSeat = 60;
const marginSeat = 10;
const ChooseSeat = ({ navigation, route }) => {
  return (
    <View
      style={[
        styles.backgroundBottom,
        {
          backgroundColor: "rgb(245,245,245)",
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
            // height: 700,
            width: (widthScreen * 90) / 100,
            backgroundColor: colors.gray,
            borderRadius: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            // alignItems: "center"
            paddingVertical: 20,
          }}
        >
          <FlatList
            data={floor1}
            horizontal={false}
            numColumns={2}
            contentContainerStyle={{ alignSelf: "center" }}
            renderItem={({ item }) => {
              if (item.status === 0) {
                return (
                  <TouchableOpacity
                    style={{
                      height: shapeSeat,
                      width: shapeSeat,
                      backgroundColor: "red",
                      margin: marginSeat,
                    }}
                  ></TouchableOpacity>
                );
              } else if (item.status === 1) {
                return (
                  <TouchableOpacity
                    style={{
                      height: shapeSeat,
                      width: shapeSeat,
                      backgroundColor: "blue",
                      margin: marginSeat,
                    }}
                  ></TouchableOpacity>
                );
              } else if (item.status === 2) {
                return (
                  <TouchableOpacity
                    style={{
                      height: shapeSeat,
                      width: shapeSeat,
                      backgroundColor: "green",
                      margin: marginSeat,
                    }}
                  ></TouchableOpacity>
                );
              } else {
                return (
                  <TouchableOpacity
                    style={{
                      height: shapeSeat,
                      width: shapeSeat,
                      backgroundColor: "yellow",
                      margin: marginSeat,
                    }}
                  ></TouchableOpacity>
                );
              }
            }}
          />
          <View
            style={{
              height: shapeSeat * 6 + marginSeat * 10,
              width: 2,
              backgroundColor: "white",
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
              if (item.status === 0) {
                return (
                  <TouchableOpacity
                    style={{
                      height: shapeSeat,
                      width: shapeSeat,
                      backgroundColor: "red",
                      margin: marginSeat,
                    }}
                  ></TouchableOpacity>
                );
              } else if (item.status === 1) {
                return (
                  <TouchableOpacity
                    style={{
                      height: shapeSeat,
                      width: shapeSeat,
                      backgroundColor: "blue",
                      margin: marginSeat,
                    }}
                  ></TouchableOpacity>
                );
              } else if (item.status === 2) {
                return (
                  <TouchableOpacity
                    style={{
                      height: shapeSeat,
                      width: shapeSeat,
                      backgroundColor: "green",
                      margin: marginSeat,
                    }}
                  ></TouchableOpacity>
                );
              } else {
                return (
                  <TouchableOpacity
                    style={{
                      height: shapeSeat,
                      width: shapeSeat,
                      backgroundColor: "yellow",
                      margin: marginSeat,
                    }}
                  ></TouchableOpacity>
                );
              }
            }}
          />
          {/* {floor1.map((item, index) => {
            if (item.status === 0) {
              return <View key={index} style={{ height: 30, width: 30, backgroundColor: "red" }}></View>;
            }
          })} */}
        </View>
      </ScrollView>
    </View>
  );
};

export default ChooseSeat;
