import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import React from "react";
import styleGlobal from "../../constants/styleGlobal";
import Header from "../../components/Header/Header";
import { useState, useEffect } from "react";
import * as screenName from "../../constants/nameScreen";
import colors from "../../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../utils/formatDate";
import { cancelTicket } from "../../redux/actions/inforBookAction";
import { formatCurrency } from "../../utils/formatCurrency";
import { calculateSumHour } from "../../utils/calculateSumHour";
import { ApiRefund, ApiRefundEdit } from "../../API/ApiBooking";

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
    fontWeight: "600",
  },
  textLeft: {
    fontSize: 16,
    width: "35%",
    textAlign: "left",
    color: "rgb(50, 50, 50)",
    fontWeight: "500",
  },
  textRightPassenger: {
    fontSize: 16,
    width: "60%",
    textAlign: "right",
    fontWeight: "500",
  },
  textLeftPassenger: {
    fontSize: 16,
    width: "35%",
    textAlign: "left",
    color: "rgb(50, 50, 50)",
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
    fontSize: 16,
    color: "rgb(60, 60, 60)",
    paddingVertical: 5,
  },
});
const InforTicket = ({ navigation, route }) => {
  const inforBookTicket = useSelector((state) => state.inforBookReducer);
  // const [inforTicketData, setInforTicketData] = useState({})
  useEffect(() => {
    // console.warn(route.params.list);
    // // console.warn(route.params.dataTrip.dep);
    // console.warn(inforBookTicket);
  }, []);
  const dispatch = useDispatch();
  const handleCancelBooking = () => {
    // Alert.alert(
    //   "Comfirm cancel book tickets",
    //   "Are you sure remove this book?",
    //   Platform.OS === "ios"
    //     ? [
    //         {
    //           text: "Ok",
    //           onPress: () => {
    //             // dispatch(cancelTicket());
    //             // navigation.navigate("Home");
    //             // Alert.alert("This book removed successfully");
    //             // ApiRefund(route.params.list.paymentId, navigation);
    //             // console.warn(route.params.list.paymentId);
    //             navigation.replace(screenName.inforDetailScreen);
    //           },
    //           style: "cancel",
    //         },
    //         {
    //           text: "Cancel",
    //           onPress: () => {},
    //           style: "cancel",
    //         },
    //       ]
    //     : [
    //         {
    //           text: "Cancel",
    //           onPress: () => {},
    //           style: "cancel",
    //         },
    //         {
    //           text: "Ok",
    //           onPress: () => {
    //             // dispatch(cancelTicket());
    //             // ApiRefund(route.params.list.paymentId, navigation);
    //             navigation.replace(screenName.inforDetailScreen);
    //           },
    //           style: "cancel",
    //         },
    //       ]
    // );
    navigation.replace(screenName.inforDetailScreen, route.params.dataTrip);
  };
  return (
    <View
      style={[
        styles.backgroundBottom,
        {
          backgroundColor: "white",
          height: height,
        },
      ]}
    >
      <View style={[styles.background]}>
        <Header
          whichScreen={screenName.inforTicketScreen}
          navigation={navigation}
          handleCancelBooking={handleCancelBooking}
        />
      </View>
      <ScrollView
        style={{
          width: width,
        }}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          // height: height - height / 8,
          // backgroundColor: "yellow",
        }}
        nestedScrollEnabled={true}
      >
        <View
          style={{
            width: "100%",
            paddingVertical: 20,
            borderBottomColor: "rgb(210, 210, 210)",
            borderBottomWidth: 1,
            paddingHorizontal: 10,
            height: 500,
          }}
        >
          <View style={[stylesInfor.flex]}>
            <Text style={[stylesInfor.textLeft]}>Route</Text>
            <Text style={[stylesInfor.textRight]}>
              {route.params.dataTrip.dep} {"->"} {route.params.dataTrip.des}
            </Text>
          </View>
          <View style={[stylesInfor.flex]}>
            <Text style={[stylesInfor.textLeft]}>Bus Operator</Text>
            <Text style={[stylesInfor.textRight]}>
              {route.params.dataTrip.nameVehicle}
            </Text>
          </View>
          <View style={[stylesInfor.flex]}>
            <Text style={[stylesInfor.textLeft]}>Trip</Text>
            <Text style={[stylesInfor.textRight]}>
              {route.params.dataTrip.timeStart.split(":").slice(0, 2).join(":")}
              {", "}
              {formatDate(route.params.dataTrip.date)}
            </Text>
          </View>
          <View style={[stylesInfor.flex]}>
            <Text style={[stylesInfor.textLeft]}>Number of tickets</Text>
            <Text style={[stylesInfor.textRight]}>
              {/* {route.params.list.ticketInfoResponseList.length} ticket */}
              {route.params.name === "bookSeat"
                ? inforBookTicket.seatIds.length
                : inforBookTicket.quantity}{" "}
              tickets
            </Text>
          </View>
          <View style={[stylesInfor.flex]}>
            <Text style={[stylesInfor.textLeft]}>Total</Text>
            <Text style={[stylesInfor.textRight]}>
              {/* {formatCurrency(route.params.list.totalPrice)} */}
              {route.params.name === "bookSeat"
                ? formatCurrency(
                    route.params.dataTrip.price * inforBookTicket.seatIds.length
                  )
                : formatCurrency(
                    route.params.dataTrip.price * inforBookTicket.quantity
                  )}
              VND
            </Text>
          </View>
          <View>
            <View style={[stylesInfor.flex]}>
              <Text style={[stylesInfor.textLeft, { width: "35%" }]}>
                Pick-up point
              </Text>
              {/* <TouchableOpacity
                style={{
                  width: "65%",
                }}
                onPress={() => {
                  handleCancelBooking();
                }}
              >
                <Text
                  style={[
                    stylesInfor.touchable,
                    {
                      fontWeight: "600",
                    },
                  ]}
                >
                  Change
                </Text>
              </TouchableOpacity> */}
            </View>
            <View style={[stylesInfor.detailPoint]}>
              <Text style={[stylesInfor.textDetailPoint]}>
                {route.params.dataTrip.dep}
              </Text>
              <Text style={[stylesInfor.textDetailPoint]}>
                B???n xe {route.params.dataTrip.dep}
              </Text>
              <Text style={[stylesInfor.textDetailPoint]}>
                Boarding at{" "}
                {route.params.dataTrip.timeStart
                  .split(":")
                  .slice(0, 2)
                  .join(":")}
                {", "}
                {formatDate(route.params.dataTrip.date)}
              </Text>
            </View>
          </View>
          <View>
            <View style={[stylesInfor.flex]}>
              <Text style={[stylesInfor.textLeft, { width: "35%" }]}>
                Drop-off point
              </Text>
              {/* <TouchableOpacity
                style={{
                  width: "65%",
                }}
                onPress={() => {
                  handleCancelBooking();
                }}
              >
                <Text
                  style={[
                    stylesInfor.touchable,
                    {
                      fontWeight: "600",
                    },
                  ]}
                >
                  Change
                </Text>
              </TouchableOpacity> */}
            </View>
            <View style={[stylesInfor.detailPoint]}>
              <Text style={[stylesInfor.textDetailPoint]}>
                {route.params.dataTrip.des}
              </Text>
              <Text style={[stylesInfor.textDetailPoint]}>
                B???n xe {route.params.dataTrip.des}
              </Text>
              <Text style={[stylesInfor.textDetailPoint]}>
                Boarding at{" "}
                {
                  calculateSumHour(
                    route.params.dataTrip.timeStart,
                    route.params.dataTrip.timeStations.slice(
                      0,
                      route.params.dataTrip.timeStations.length
                    )
                  ).endTime
                }
                {", "}
                {formatDate(route.params.dataTrip.date)}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            // height: 400,
            width: "100%",
            paddingVertical: 20,
            borderBottomColor: "rgb(210, 210, 210)",
            borderBottomWidth: 1,
            paddingHorizontal: 10,
          }}
        >
          <View style={[stylesInfor.flex]}>
            <Text
              style={[
                stylesInfor.textLeftPassenger,
                {
                  fontWeight: "600",
                  fontSize: 20,
                  color: "black",
                  width: "50%",
                },
              ]}
            >
              Passenger details
            </Text>
            <TouchableOpacity
              style={{
                width: "50%",
              }}
              onPress={() => {
                // ApiRefundEdit(
                //   route.params.list.paymentId,
                //   route.params,
                //   screenName.inforDetailScreen
                // );
                navigation.replace(
                  screenName.inforDetailScreen,
                  route.params.dataTrip
                );
              }}
            >
              <Text
                style={[
                  stylesInfor.touchable,
                  {
                    fontWeight: "600",
                  },
                ]}
              >
                Edit
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[stylesInfor.flex]}>
            <Text style={[stylesInfor.textLeftPassenger]}>Full name</Text>
            <Text style={[stylesInfor.textRightPassenger]}>
              {/* {route.params.list.passengerInfo.name} */}
              {inforBookTicket.name}
            </Text>
          </View>
          <View style={[stylesInfor.flex]}>
            <Text style={[stylesInfor.textLeftPassenger]}>Phone number</Text>
            <Text style={[stylesInfor.textRightPassenger]}>
              {/* {route.params.list.passengerInfo.phone} */}
              {inforBookTicket.phoneNumber}
            </Text>
          </View>
          <View style={[stylesInfor.flex]}>
            <Text style={[stylesInfor.textLeftPassenger]}>Email address</Text>
            <Text style={[stylesInfor.textRightPassenger]}>
              {/* {route.params.list.passengerInfo.email} */}
              {inforBookTicket.email}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginBottom: 150,
            // backgroundColor: "red"
          }}
        >
          {/* <TouchableOpacity
            //   color="#841584"
            //   accessibilityLabel="Learn more about this purple button"
            style={{
              backgroundColor: "rgb(237,88,90)",
              width: width / 1.1,
              borderRadius: 6,
              marginTop: 30,
            }}
            onPress={() => {
              handleCancelBooking();
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                paddingVertical: 20,
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              Cancel booking
            </Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
      <View
        style={{
          width: width,
          backgroundColor: "white",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
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
            width: width / 1.1,
            borderRadius: 6,
          }}
          onPress={() => {
            navigation.replace(screenName.paymentScreen, route.params);
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
            Comfirm
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    // </View>
  );
};

export default InforTicket;
