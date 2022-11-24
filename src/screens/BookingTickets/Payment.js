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
import { ApiPayment } from "../../API/ApiBooking";
import Loading from "../../components/Loading/Loading";

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
const Payment = ({ navigation, route }) => {
  const [chooseMethod, setChooseMethod] = useState(false);
  const [select, setSelect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handlePayment = () => {
    let Data = {
      id: route.params.list[0].paymentId,
      price: route.params.list[0].price * route.params.list.length,
    };
    ApiPayment(Data, navigation, setIsLoading);
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
              <View style={[stylesInfor.flex]}>
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
                <TouchableOpacity
                  style={{
                    width: "70%",
                  }}
                  onPress={() => {}}
                >
                  <Text
                    style={[
                      stylesInfor.touchable,
                      {
                        fontWeight: "600",
                        textDecorationLine: "none",
                        color: "black",
                      },
                    ]}
                  >
                    {formatCurrency(
                      route.params.list[0].price * route.params.list.length
                    )}
                    {"VND"}
                  </Text>
                </TouchableOpacity>
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
                Pay Securely
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>

    // </View>
  );
};

export default Payment;
