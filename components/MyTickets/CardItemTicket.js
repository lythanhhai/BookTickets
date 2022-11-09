import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
const CardItemTicket = () => {
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
                23:00
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                }}
              >
                Nov 07, 2022
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
                An Anh Limousine
              </Text>
              <Text
                style={{
                  fontSize: 14,
                }}
              >
                Da nang - Quang Tri
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
              YY992DZ
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
              Unpaid
            </Text>
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
              Pay your ticket before ...
            </Text>
          </View>
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
            //   color="#841584"
            //   accessibilityLabel="Learn more about this purple button"
            style={{
              backgroundColor: "rgb(254,210,61)",
              width: "100%",
              borderRadius: 6,
            }}
            onPress={() => {}}
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
              Pay now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CardItemTicket;
