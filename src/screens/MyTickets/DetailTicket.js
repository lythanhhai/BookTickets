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
// import firebase from "firebase/compat/app";
// import { Permissions, Notifications } from "expo";
import { ref as sRef, set } from "firebase/database";
import { db } from "../../firebase/ConfigRealtimeDB";

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
const DetailTicket = ({ navigation, route }) => {
  const inforBookTicket = useSelector((state) => state.inforBookReducer);
  // const [inforTicketData, setInforTicketData] = useState({})
  useEffect(() => {}, []);
  const currentUser = useSelector((state) => state.authenReducer);
  const dispatch = useDispatch();
  const handleCancel = () => {
    ApiRefund(route.params.payment.id, navigation);
    // createNoti();
  };
  const createNoti = () => {
    set(sRef(db, "notifications/" + currentUser.username), {
      token: currentUser.accessToken,
    })
      .then(() => {
        console.warn("Data submitted");
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  // useEffect(() => {
  //   if (requestUserPermission()) {
  //     messaging()
  //       .getToken()
  //       .then((token) => {
  //         console.warn(token);
  //       });
  //   } else {
  //     console.warn("Failed to get token", authStatus);
  //   }
  // }, []);
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
      {/* <View style={[styles.background]}>
        <Header
          whichScreen={screenName.inforTicketScreen}
          navigation={navigation}
          handleCancelBooking={handleCancelBooking}
        />
      </View> */}
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
            // borderBottomColor: "rgb(210, 210, 210)",
            // borderBottomWidth: 1,
            paddingHorizontal: 10,
            height: 500,
          }}
        >
          <View style={[stylesInfor.flex]}>
            <Text style={[stylesInfor.textLeft]}>Route</Text>
            <Text style={[stylesInfor.textRight]}>
              {route.params.payment.dep} {"->"} {route.params.payment.des}
            </Text>
          </View>
          <View style={[stylesInfor.flex]}>
            <Text style={[stylesInfor.textLeft]}>Bus Operator</Text>
            <Text style={[stylesInfor.textRight]}>
              {route.params.payment.nameVehicle}
            </Text>
          </View>
          <View style={[stylesInfor.flex]}>
            <Text style={[stylesInfor.textLeft]}>Trip</Text>
            <Text style={[stylesInfor.textRight]}>
              {route.params.payment.timeStart.split(":").slice(0, 2).join(":")}
              {", "}
              {formatDate(route.params.payment.dateOrder.split("T")[0])}
            </Text>
          </View>
          <View style={[stylesInfor.flex]}>
            <Text style={[stylesInfor.textLeft]}>Number of tickets</Text>
            <Text style={[stylesInfor.textRight]}>
              {/* {route.params.list.ticketInfoResponseList.length} ticket */}
              {route.params.numberTicket} tickets
            </Text>
          </View>
          <View style={[stylesInfor.flex]}>
            <Text style={[stylesInfor.textLeft]}>Total</Text>
            <Text style={[stylesInfor.textRight]}>
              {/* {formatCurrency(route.params.list.totalPrice)} */}
              {formatCurrency(route.params.totalPrice)}
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
                {route.params.payment.dep}
              </Text>
              <Text style={[stylesInfor.textDetailPoint]}>
                Bến xe {route.params.payment.dep}
              </Text>
              <Text style={[stylesInfor.textDetailPoint]}>
                Boarding at{" "}
                {route.params.payment.timeStart
                  .split(":")
                  .slice(0, 2)
                  .join(":")}
                {", "}
                {formatDate(route.params.payment.dateOrder.split("T")[0])}
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
                {route.params.payment.des}
              </Text>
              <Text style={[stylesInfor.textDetailPoint]}>
                Bến xe {route.params.payment.des}
              </Text>
              {/* <Text style={[stylesInfor.textDetailPoint]}>
                Boarding at{" "}
                {
                  calculateSumHour(
                    route.params.payment.timeStart,
                    route.params.payment.timeStations.slice(
                      0,
                      route.params.payment.timeStations.length
                    )
                  ).endTime
                }
                {", "}
                {formatDate(route.params.payment.dateOrder.split("T")[0])}
              </Text> */}
            </View>
          </View>
        </View>
        {/* <View
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
              {inforBookTicket.name}
            </Text>
          </View>
          <View style={[stylesInfor.flex]}>
            <Text style={[stylesInfor.textLeftPassenger]}>Phone number</Text>
            <Text style={[stylesInfor.textRightPassenger]}>
              {inforBookTicket.phoneNumber}
            </Text>
          </View>
          <View style={[stylesInfor.flex]}>
            <Text style={[stylesInfor.textLeftPassenger]}>Email address</Text>
            <Text style={[stylesInfor.textRightPassenger]}>
              {inforBookTicket.email}
            </Text>
          </View>
        </View> */}
        <View
          style={{
            marginBottom: 150,
            // backgroundColor: "red"
          }}
        >
          <TouchableOpacity
            //   color="#841584"
            //   accessibilityLabel="Learn more about this purple button"
            style={{
              backgroundColor: "rgb(237,88,90)",
              width: width / 1.1,
              borderRadius: 6,
            }}
            onPress={() => {
              handleCancel();
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
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
    // </View>
  );
};

export default DetailTicket;
