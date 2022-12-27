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
import { useRef } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

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
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
const DetailTicket = ({ navigation, route }) => {
  const inforBookTicket = useSelector((state) => state.inforBookReducer);
  // const [inforTicketData, setInforTicketData] = useState({})
  const currentUser = useSelector((state) => state.authenReducer);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  const dispatch = useDispatch();
  const handleCancel = () => {
    Alert.alert(
      "Cancel ticket",
      "Are you sure delete this trip",
      Platform.OS === "ios"
        ? [
            {
              text: "OK",
              onPress: () => {
                ApiRefund(
                  route.params.payment.id,
                  navigation,
                  sendPushNotification,
                  expoPushToken
                );
              },
            },
            {
              text: "Cancel",
              onPress: () => {},
              style: "cancel",
            },
          ]
        : [
            {
              text: "Cancel",
              onPress: () => {},
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => {
                ApiRefund(
                  route.params.payment.id,
                  navigation,
                  sendPushNotification,
                  expoPushToken
                );
              },
            },
          ]
    );
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
              {formatDate(route.params.payment.dateStart.split("T")[0])}
            </Text>
          </View>
          <View style={[stylesInfor.flex]}>
            <Text style={[stylesInfor.textLeft]}>Date order</Text>
            <Text style={[stylesInfor.textRight]}>
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
                {formatDate(route.params.payment.dateStart.split("T")[0])}
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
            </View>
          </View>
        </View>
        {new Date().valueOf() - Date.parse(route.params.payment.dateStart) >
          0 || route.params.status === "Cancel" ? null : (
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
        )}
      </ScrollView>
    </View>
    // </View>
  );
};
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Cancel ticket successfully!",
    body: `You canceled ticket and will be refunded money in some seconds`,
    data: { cancel: true },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  // if (Device.isDevice) {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }
  token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log(token);
  // } else {
  //   alert('Must use physical device for Push Notifications');
  // }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
export default DetailTicket;
