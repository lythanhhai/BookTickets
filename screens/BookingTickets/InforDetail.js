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
import Header from "../../components/Header/Header";
import { useState, useEffect } from "react";
import SomeInformation from "../../components/Register/SomeInformation";
import * as screenName from "../../constants/nameScreen";

const styles = StyleSheet.create(styleGlobal);
const widthDevice = Dimensions.get("screen").width;
const heightDevice = Dimensions.get("screen").height;
const heightModalBottom = 130;

const InforDetail = ({ navigation, route }) => {
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
        <Header
          whichScreen={screenName.inforDetailScreen}
          navigation={navigation}
        />
      </View>
      <ScrollView>
        <SomeInformation
          remind={"We only use your personal information to confirm tickets"}
          whichScreen={screenName.inforDetailScreen}
        />
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          borderTopWidth: 1,
          borderTopColor: "rgb(200, 200, 200)",
          width: Dimensions.get("screen").width,
          height: 130,
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "rgb(254,210,61)",
            width: Dimensions.get("screen").width / 1.1,
            borderRadius: 6,
            marginTop: 20,
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

export default InforDetail;