import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { Alert, Linking } from "react-native";
import moment from "moment";
import { formatDate } from "../../utils/formatDate";
import { formatHour } from "../../utils/formatHour";

const CardItemUnpaid = ({ item, navigation, route }) => {
  // useEffect(() => {
  //   console.warn(item.payment.paymentMethods?.txnRef === true);
  // }, []);
  // payment
  const handleSeeMoreInfor = () => {
    // setModalVisible(true);
    // navigation.navigate("DetailTicket", item);
    if (new Date().valueOf() - new Date(item.dateOrder).valueOf() > 960000) {
      Alert.alert("Transaction was deadlined");
    } else {
      Linking.openURL(item.paymentMethods.url);
    }
  };
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <View
        style={{
          width: "95%",
          paddingVertical: 20,
          borderColor: "rgb(210, 210, 210)",
          borderWidth: 1,
          backgroundColor: "white",
          marginBottom: 20,
          paddingHorizontal: 20,
          borderRadius: 12,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.2,
          shadowRadius: 5.46,

          elevation: 9,
        }}
      >
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              marginBottom: 20,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "600",
                }}
              >
                {item.timeStart.split(":").slice(0, 2).join(":")}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                }}
              >
                {item.dateStart.split("T")[0]}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                paddingHorizontal: 10,
                width: "65%",
                paddingLeft: 15,
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "600",
                }}
              >
                {item.nameVehicle}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                }}
              >
                {item.dep} to {item.des}
              </Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottomColor: "rgb(215, 215, 215)",
              borderBottomWidth: 1,
              paddingBottom: 15,
            }}
          >
            <Text
              style={{
                fontSize: 15,
              }}
            >
              Booking code
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
              }}
            >
              {item.paymentMethods?.txnRef ? item.paymentMethods.txnRef : ""}
            </Text>
          </View>
        </View>
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 15,
            }}
          >
            <Text
              style={{
                fontSize: 15,
              }}
            >
              Status
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                color: "rgb(210,90,107)",
              }}
            >
              {item.paymentMethods?.status === "NO" ? "Unpaid" : "Canceled"}
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "rgb(254,235,237)",
            marginTop: 20,
            borderRadius: 7,
          }}
        >
          <Text
            style={{
              paddingVertical: 15,
              paddingHorizontal: 10,
              fontSize: 14,
            }}
          >
            Please payment before{" "}
            {formatHour(
              new Date(
                new Date(item.dateOrder).getTime() + 16 * 60000
              ).toString()
            )}{" "}
            in{" "}
            {formatDate(
              new Date(
                new Date(item.dateOrder).getTime() + 16 * 60000
              ).toString()
            )}
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingTop: 20,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "rgb(254,210,61)",
              width: "100%",
              borderRadius: 6,
            }}
            onPress={() => {
              handleSeeMoreInfor();
            }}
          >
            <Text
              style={{
                color: "black",
                textAlign: "center",
                paddingVertical: 15,
                fontSize: 15,
                fontWeight: "700",
              }}
            >
              Continuous Payment
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CardItemUnpaid;
