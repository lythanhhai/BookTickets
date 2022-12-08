import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import styleGlobal from "../../constants/styleGlobal";
import Header from "../../components/Header/Header";
import * as screenName from "../../constants/nameScreen";
import colors from "../../constants/colors";
import Feather from "react-native-vector-icons/Feather";
import { formatCurrency } from "../../utils/formatCurrency";
import { useState } from "react";
import {
  ApiBookingPartSeat,
  ApiBookingSeat,
  ApiPayment,
} from "../../API/ApiBooking";
import Loading from "../../components/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { onValue, ref, set } from "firebase/database";
import { db } from "../../firebase/ConfigRealtimeDB";
import { useEffect } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useRef } from "react";

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
  iconStart: {
    fontSize: 17,
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

const Payment = ({ navigation, route }) => {
  const [chooseMethod, setChooseMethod] = useState(false);
  const [select, setSelect] = useState(false);
  const [seeSeat, setSeeSeat] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inforBookTicket = useSelector((state) => state.inforBookReducer);
  const [responseDataTicket, setResponseDataTicket] = useState({});
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.authenReducer);
  const [count, setCount] = useState(0);
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
  useEffect(() => {
    let res = [];
    // let res1 = 0;
    onValue(
      ref(db, "notifications/" + currentUser.username),
      async (snapshot) => {
        const data = await snapshot.val();
        for (const [key, value] of Object.entries(data)) {
          // res1 = key.split("-")[0].slice(1, key.split("-")[0].length);
          // console.warn(res1);
          let object = {
            ...value,
            notificationTitle: key,
          };
          res.push(object);
        }
        setCount(res.length);
      }
    );
  }, []);
  const createNoti = async (data) => {
    await set(
      ref(
        db,
        "notifications/" + `${currentUser.username}/` + `N${count + 1}-book`
      ),
      data
    )
      .then(async () => {
        await sendPushNotification(expoPushToken, data);
        Alert.alert("Booking successfully!");
      })
      .catch((err) => {
        console.warn(err);
      });
  };
  const handlePayment = () => {
    // let Data = {
    //   id: route.params.list.paymentId,
    //   price: route.params.list.totalPrice,
    // };
    // ApiPayment(Data, navigation, setIsLoading);
    let inforTicketData = {};
    if (inforBookTicket.routeStationBook.length === 0) {
      inforTicketData = {
        email: inforBookTicket.email,
        name: inforBookTicket.name,
        note: inforBookTicket.note,
        phoneNumber: inforBookTicket.phoneNumber,
        // price: inforBookTicket.price,
        // quantity: inforBookTicket.quantity,
        // routeStationBook: inforBookTicket.routeStationBook,
        seatIds: inforBookTicket.seatIds,
        tripId: inforBookTicket.tripId,
        nameAgency: inforBookTicket.nameAgency,
        nameVehicle: inforBookTicket.nameVehicle,
      };
      // console.warn(inforTicketData)
      ApiBookingSeat(
        inforTicketData,
        navigation,
        setIsLoading,
        route.params,
        setUrl,
        setResponseDataTicket,
        createNoti
      );
    } else {
      inforTicketData = {
        email: inforBookTicket.email,
        name: inforBookTicket.name,
        note: inforBookTicket.note,
        phoneNumber: inforBookTicket.phoneNumber,
        price: inforBookTicket.price,
        quantity: inforBookTicket.quantity,
        routeStationBook: inforBookTicket.routeStationBook,
        tripId: inforBookTicket.tripId,
        nameAgency: inforBookTicket.nameAgency,
        nameVehicle: inforBookTicket.nameVehicle,
      };
      ApiBookingPartSeat(
        inforTicketData,
        navigation,
        setIsLoading,
        route.params,
        setUrl,
        setResponseDataTicket,
        createNoti
      );
    }
  };
  return (
    <View>
      {isLoading ? (
        <Loading></Loading>
      ) : (
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
              whichScreen={screenName.paymentScreen}
              navigation={navigation}
              item={route.params}
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
                // height: 400,
                width: "100%",
                paddingVertical: 20,
                borderBottomColor: "rgb(210, 210, 210)",
                borderBottomWidth: 1,
                paddingHorizontal: 20,
              }}
            >
              <View style={[stylesInfor.flex]}>
                <Text
                  style={[
                    stylesInfor.textLeftPassenger,
                    {
                      fontWeight: "600",
                      fontSize: 19,
                      color: "black",
                      width: "50%",
                    },
                  ]}
                >
                  Coupon
                </Text>
                <TouchableOpacity
                  style={{
                    width: "50%",
                  }}
                  onPress={() => {}}
                >
                  <Text
                    style={[
                      stylesInfor.touchable,
                      {
                        fontWeight: "600",
                        fontSize: 17,
                      },
                    ]}
                  >
                    Select code
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                // height: 400,
                width: "100%",
                paddingVertical: 20,
                borderBottomColor: "rgb(210, 210, 210)",
                borderBottomWidth: 1,
                paddingHorizontal: 20,
              }}
            >
              <View style={[stylesInfor.flex]}>
                <Text
                  style={[
                    stylesInfor.textLeftPassenger,
                    {
                      fontWeight: "600",
                      fontSize: 18,
                      color: "black",
                      width: "50%",
                    },
                  ]}
                >
                  Payment method
                </Text>
                <TouchableOpacity
                  style={{
                    width: "50%",
                  }}
                  onPress={() => {
                    if (select === true) {
                      setChooseMethod(false);
                    }
                    setSelect(!select);
                  }}
                >
                  <Text
                    style={[
                      stylesInfor.touchable,
                      {
                        fontWeight: "600",
                        fontSize: 17,
                      },
                    ]}
                  >
                    Select
                  </Text>
                </TouchableOpacity>
              </View>
              {select ? (
                <TouchableOpacity
                  style={{
                    // height: 400,
                    width: "100%",
                    paddingVertical: 17,
                    marginTop: 10,
                    // paddingHorizontal: 10,
                    // backgroundColor: !chooseMethod ? "transparent" : colors.backgroundCardPoint,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    // borderWidth: 1,
                    // borderColor: "black"
                  }}
                  onPress={() => {
                    setChooseMethod(!chooseMethod);
                  }}
                >
                  {chooseMethod ? (
                    <Feather
                      name="check-circle"
                      style={[
                        stylesInfor.iconStart,
                        {
                          color: colors.blue,
                        },
                      ]}
                    />
                  ) : (
                    <Feather name="circle" style={stylesInfor.iconStart} />
                  )}
                  <View style={[{ width: "90%" }]}>
                    <Text
                      style={[
                        stylesInfor.textLeftPassenger,
                        {
                          fontWeight: "600",
                          fontSize: 18,
                          // color: !chooseMethod ? "black" : "white",
                          width: "50%",
                          textAlign: "left",
                          width: "100%",
                        },
                      ]}
                    >
                      Online payment with VNPAY - QR Code
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <></>
              )}
            </View>

            <View
              style={{
                // height: 400,
                width: "100%",
                paddingVertical: 20,
                borderBottomColor: "rgb(210, 210, 210)",
                borderBottomWidth: 1,
                paddingHorizontal: 20,
              }}
            >
              <View style={[stylesInfor.flex, { alignItems: "flex-start" }]}>
                <Text
                  style={[
                    stylesInfor.textLeftPassenger,
                    {
                      fontWeight: "600",
                      fontSize: 20,
                      color: "black",
                      width: "30%",
                    },
                  ]}
                >
                  Total
                </Text>
                <View
                  style={{
                    width: "70%",
                    display: "flex",
                    flexDirection: "column",
                    // backgroundColor: "red",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                    onPress={() => {
                      setSeeSeat(!seeSeat);
                    }}
                  >
                    <Text
                      style={[
                        stylesInfor.touchable,
                        {
                          fontWeight: "600",
                          textDecorationLine: "none",
                          color: "black",
                          marginRight: 7,
                        },
                      ]}
                    >
                      {route.params.name === "bookSeat"
                        ? formatCurrency(
                            route.params.dataTrip.price *
                              inforBookTicket.seatIds.length
                          )
                        : formatCurrency(
                            route.params.dataTrip.price *
                              inforBookTicket.quantity
                          )}
                      {"VND"}
                    </Text>
                    {seeSeat ? (
                      <Feather
                        name="chevron-up"
                        style={{
                          fontSize: 20,
                          fontWeight: "500",
                        }}
                      />
                    ) : (
                      <Feather
                        name="chevron-down"
                        style={{
                          fontSize: 20,
                          fontWeight: "500",
                        }}
                      />
                    )}
                  </TouchableOpacity>
                  {seeSeat ? (
                    <View
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        marginTop: 10,
                      }}
                    >
                      {/* <Text
                        style={{
                          fontSize: 15,
                          fontWeight: "500",
                        }}
                      >
                        Seats:{" "}
                      </Text>
                      {route.params.list.ticketInfoResponseList.map(
                        (item, index) => {
                          if (
                            index ===
                            route.params.list.ticketInfoResponseList.length - 1
                          ) {
                            return (
                              <Text
                                style={{
                                  fontSize: 15,
                                  fontWeight: "500",
                                }}
                                key={index}
                              >
                                {item.nameSeat}
                              </Text>
                            );
                          } else {
                            return (
                              <Text
                                style={{
                                  fontSize: 15,
                                  fontWeight: "500",
                                }}
                                key={index}
                              >
                                {item.nameSeat}
                                {", "}
                              </Text>
                            );
                          }
                        }
                      )} */}
                    </View>
                  ) : (
                    <></>
                  )}
                </View>
              </View>
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
                backgroundColor: !chooseMethod
                  ? "rgb(224,224,224)"
                  : "rgb(254,210,61)",
                width: width / 1.1,
                borderRadius: 6,
              }}
              // disabled={!chooseMethod}
              onPress={() => {
                if (!chooseMethod) {
                  Alert.alert("Please choose method to processing payment");
                  setSelect(true);
                } else {
                  handlePayment();
                }
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
                Book and Proceed Payment
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>

    // </View>
  );
};
async function sendPushNotification(expoPushToken, data) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Booking ticket successfully!",
    body: `You booked ticket, see detail information below: From ${
      data.dep
    } To ${data.des} at ${data.timeStart.split(":").slice(0, 2).join(":")} in ${
      data.date
    }`,
    data: data,
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

export default Payment;
