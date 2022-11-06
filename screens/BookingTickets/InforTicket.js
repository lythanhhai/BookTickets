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
import * as screenName from "../../constants/nameScreen";
import colors from "../../constants/colors";

const styles = StyleSheet.create(styleGlobal);
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
const stylesInfor = StyleSheet.create({
  flex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 7,
  },
  textRight: {
    fontSize: 16,
    width: "65%",
    textAlign: "right",
  },
  textLeft: {
    fontSize: 16,
    width: "25%",
    textAlign: "left",
    color: "rgb(100, 100, 100)",
  },
  textRightPassenger: {
    fontSize: 16,
    width: "60%",
    textAlign: "right",
  },
  textLeftPassenger: {
    fontSize: 16,
    width: "35%",
    textAlign: "left",
    color: "rgb(100, 100, 100)",
  },
  touchable: {
    fontSize: 16,
    textAlign: "right",
    color: colors.blue,
    textDecorationLine: "underline",
  },
  detailPoint: {
    width: "100%",
    paddingVertical: 7,
    // backgroundColor: "red",
  },
  textDetailPoint: {
    fontSize: 14,
    paddingVertical: 5,
  },
});
const InforTicket = ({ navigation, route }) => {
  return (
    <View>
      <View style={[styles.background]}>
        <Header
          whichScreen={screenName.inforTicketScreen}
          navigation={navigation}
        />
      </View>
      <ScrollView
        style={{
          width: width,
          marginTop: 10,
        }}
        contentContainerStyle={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            // height: 400,
            width: "100%",
            paddingBottom: 10,
            borderBottomColor: "rgb(210, 210, 210)",
            borderBottomWidth: 1,
            paddingHorizontal: 10,
          }}
        >
          <View style={[stylesInfor.flex]}>
            <Text style={[stylesInfor.textLeft]}>Route</Text>
            <Text style={[stylesInfor.textRight]}>
              Da Nang {"->"} Quang Tri
            </Text>
          </View>
          <View style={[stylesInfor.flex]}>
            <Text style={[stylesInfor.textLeft]}>Bus Operator</Text>
            <Text style={[stylesInfor.textRight]}>An Anh Limousine</Text>
          </View>
          <View style={[stylesInfor.flex]}>
            <Text style={[stylesInfor.textLeft]}>Trip</Text>
            <Text style={[stylesInfor.textRight]}>
              23:00 {"-"} Wed, 11/06/2022
            </Text>
          </View>
          <View style={[stylesInfor.flex]}>
            <Text style={[stylesInfor.textLeft]}>Number of tickets</Text>
            <Text style={[stylesInfor.textRight]}>1 ticket</Text>
          </View>
          <View style={[stylesInfor.flex]}>
            <Text style={[stylesInfor.textLeft]}>Total</Text>
            <Text style={[stylesInfor.textRight]}>850,000VND</Text>
          </View>
          <View>
            <View style={[stylesInfor.flex]}>
              <Text style={[stylesInfor.textLeft, { width: "35%" }]}>
                Pick-up point
              </Text>
              <TouchableOpacity
                style={{
                  width: "65%",
                }}
              >
                <Text style={[stylesInfor.touchable]}>Change</Text>
              </TouchableOpacity>
            </View>
            <View style={[stylesInfor.detailPoint]}>
              <Text style={[stylesInfor.textDetailPoint]}>
                35 Nguyen Khuyen
              </Text>
              <Text style={[stylesInfor.textDetailPoint]}>
                Hoa Khanh Nam, Lien Chieu, Da Nang
              </Text>
              <Text style={[stylesInfor.textDetailPoint]}>
                Boarding at 23:00 11/06/2022
              </Text>
            </View>
          </View>
          <View>
            <View style={[stylesInfor.flex]}>
              <Text style={[stylesInfor.textLeft, { width: "35%" }]}>
                Drop-off point
              </Text>
              <TouchableOpacity
                style={{
                  width: "65%",
                }}
              >
                <Text style={[stylesInfor.touchable]}>Change</Text>
              </TouchableOpacity>
            </View>
            <View style={[stylesInfor.detailPoint]}>
              <Text style={[stylesInfor.textDetailPoint]}>
                35 Nguyen Khuyen
              </Text>
              <Text style={[stylesInfor.textDetailPoint]}>
                Hoa Khanh Nam, Lien Chieu, Da Nang
              </Text>
              <Text style={[stylesInfor.textDetailPoint]}>
                Boarding at 23:00 11/06/2022
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            // height: 400,
            width: "100%",
            paddingBottom: 10,
            borderBottomColor: "rgb(210, 210, 210)",
            borderBottomWidth: 1,
            paddingHorizontal: 10,
          }}
        >
          <View style={[stylesInfor.flex]}>
            <Text style={[stylesInfor.textLeftPassenger]}>
              Passenger details
            </Text>
            <TouchableOpacity
              style={{
                width: "65%",
              }}
            >
              <Text style={[stylesInfor.touchable]}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={[stylesInfor.flex]}>
            <Text style={[stylesInfor.textLeftPassenger]}>Full name</Text>
            <Text style={[stylesInfor.textRightPassenger]}>Ly Thanh Hai</Text>
          </View>
          <View style={[stylesInfor.flex]}>
            <Text style={[stylesInfor.textLeftPassenger]}>Phone number</Text>
            <Text style={[stylesInfor.textRightPassenger]}>097833744*</Text>
          </View>
          <View style={[stylesInfor.flex]}>
            <Text style={[stylesInfor.textLeftPassenger]}>Email address</Text>
            <Text style={[stylesInfor.textRightPassenger]}>
              lythanhhait@gmail.com
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default InforTicket;
