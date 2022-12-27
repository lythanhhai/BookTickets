import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
const CardItemTicket = ({
  item,
  setModalVisible,
  currentTab,
  navigation,
  route,
  index,
  length,
  setLoadAfterAction,
}) => {
  // useEffect(() => {
  //   console.warn(item.payment.paymentMethods?.txnRef === true);
  // }, []);
  const handleSeeMoreInfor = () => {
    // setModalVisible(true);
    navigation.navigate("DetailTicket", item.historyBooking);
  };
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        paddingBottom: length - 1 === index ? 100 : 0,
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
                {item.historyBooking.timeStart.split(":").slice(0, 2).join(":")}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                }}
              >
                {item.historyBooking.dateStart.split("T")[0]}
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
                {item.historyBooking.nameVehicle}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                }}
              >
                {item.historyBooking.route}
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
              {item.historyBooking.payment.paymentMethods?.txnRef
                ? item.historyBooking.payment.paymentMethods.txnRef
                : ""}
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
              {item.historyBooking.payment.paymentMethods?.txnRef
                ? "Paid"
                : "Canceled"}
            </Text>
          </View>
          {currentTab === "Upcomming" ? (
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
                Click see more to see detail information ...
              </Text>
            </View>
          ) : currentTab === "Completed" && item.rated ? (
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
                You have already rated this trip ...
              </Text>
            </View>
          ) : (
            <></>
          )}
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
          {currentTab === "Upcomming" ? (
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
                See more
              </Text>
            </TouchableOpacity>
          ) : currentTab === "Completed" ? (
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              {item.rated ? null : (
                <TouchableOpacity
                  style={{
                    backgroundColor: "rgb(254,210,61)",
                    width: "100%",
                    borderRadius: 6,
                    marginBottom: 10,
                  }}
                  onPress={async () => {
                    setModalVisible(true);
                    await AsyncStorage.setItem(
                      "RatingTrip",
                      JSON.stringify(item)
                    );
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
                    Rating this trip
                  </Text>
                </TouchableOpacity>
              )}

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
                  See more
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={{
                backgroundColor: "rgb(254,210,61)",
                width: "100%",
                borderRadius: 6,
              }}
              onPress={() => {
                // setModalVisible(true);
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
                See more
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default CardItemTicket;
