import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { useState } from "react";
import Header from "../../components/Header/Header";
import SearchFrame from "../../components/BookingTickets/SearchFrame";
import { registerTranslation } from "react-native-paper-dates";
import data from "../../constants/virtualDataRecent";
import Icon from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import colors from "../../constants/colors";
import AntDesign from "react-native-vector-icons/AntDesign";
import Octicons from "react-native-vector-icons/Octicons";

const styles = StyleSheet.create({
  background: {
    backgroundColor: "rgb(35,115,228)",
    height: Dimensions.get("screen").height / 3.4,
    width: Dimensions.get("screen").width,
    display: "flex",
    // flexDirection: "column",
    // justifyContent: "center",
    paddingLeft: Dimensions.get("screen").width / 21,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
});

const CardTrip = ({ item }) => {
  const tailwind = useTailwind();
  const heightDevice = Dimensions.get("screen").height;
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginTop: 10,
        width: Dimensions.get("screen").width / 1.05,
        height: heightDevice / 3.3,
        backgroundColor: "white",
        paddingVertical: 8,

        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 4,

        borderRadius: 8,
        // marginRight: 10,
        marginBottom: 8,
        paddingHorizontal: 10,
      }}
    >
      <View
        style={[
          tailwind("flex flex-row justify-between items-center pb-3 w-full"),
          {
            height: "30%",
            borderColor: "rgb(240,240,240)",
            borderBottomWidth: 1,
            // backgroundColor: "red"
          },
        ]}
      >
        <View
          style={[
            tailwind("flex flex-col justify-between items-center"),
            { height: "100%", width: "15%" },
          ]}
        >
          <Text style={[tailwind(), { fontSize: 14 }]}>23:00</Text>
          <Text style={[tailwind("text-sm"), { fontSize: 9 }]}>3h</Text>
          <Text style={[tailwind(), { fontSize: 14 }]}>02:00</Text>
        </View>
        <View
          style={{
            width: "55%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              height: "100%",
              width: "100%",
              paddingRight: 10,
            }}
          >
            <Text
              style={{
                color: "black",
                height: "100%",
                fontSize: 14,
                fontWeight: "600",
                width: "100%",
              }}
            >
              Đà Nẵng{" "}
              <AntDesign
                name="swapright"
                style={{
                  color: "black",
                  fontSize: 14,
                  fontWeight: "600",
                  width: "100%",
                }}
              />{" "}
              Quảng Trị
            </Text>
          </View>
        </View>
        <View
          style={[
            tailwind("flex flex-col justify-start items-end"),
            { height: "100%", width: "30%" },
          ]}
        >
          <View
            style={[
              tailwind("flex flex-row justify-end items-center"),
              {
                // backgroundColor: "red",
              },
            ]}
          >
            <Text
              style={{
                fontSize: 11,
              }}
            >
              From{" "}
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "700",
                }}
              >
                120000d
              </Text>
            </Text>
          </View>
          <Text>24 empty seats</Text>
          {/* <Text>350000vnd</Text> */}
        </View>
      </View>
      <View
        style={[
          tailwind("flex flex-col justify-start items-start w-full"),
          {
            // backgroundColor: "red",
            height: "60%",
          },
        ]}
      >
        <View
          style={[
            tailwind("flex flex-row justify-start items-start mt-2 w-full"),
            { height: "65%" },
          ]}
        >
          <Image
            source={require("../../assets/Image/busDemonstrate.jpeg")}
            style={{
              // height: 100,
              // width: 100,
              height: "90%",
              width: "35%",
              objectFit: "cover",
              // resizeMode: "contain",
              borderRadius: 10,
              // backgroundColor: "red",
            }}
          />
          <View
            style={[
              tailwind("flex flex-col justify-start items-start h-full pl-2"),
              {
                // backgroundColor: "red",
                width: "65%",
              },
            ]}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                marginBottom: 1,
              }}
            >
              An Anh Limousine
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: "500",
                marginBottom: 4,
              }}
            >
              Limousine 24 seats
            </Text>
            <View
              style={tailwind("flex flex-row justify-between items-center")}
            >
              <Text
                style={[
                  tailwind("flex flex-row justify-between items-center"),
                  {
                    fontSize: 13,
                    fontWeight: "500",
                  },
                ]}
              >
                4.6{""}
                <Entypo
                  name="star"
                  style={{
                    color: colors.starColor,
                    fontSize: 13,
                    fontWeight: "500",
                  }}
                ></Entypo>{" "}
                <Text style={{ fontSize: 9, color: colors.gray }}>
                  (1500 rating)
                </Text>
              </Text>
            </View>
          </View>
        </View>
        <View
          style={[
            tailwind("flex flex-row justify-between items-start w-full"),
            {
              // backgroundColor: "red",
              height: "30%",
              marginTop: 5,
            },
          ]}
        >
          <View
            style={[
              tailwind("flex flex-col justify-center items-start"),
              { width: "75%" },
            ]}
          >
            <View
              style={[
                tailwind("flex flex-row justify-start items-center"),
                {
                  width: "100%",
                  // backgroundColor: "red",
                },
              ]}
            >
              <Octicons
                name="verified"
                style={{
                  color: colors.greenVerify,
                  fontSize: 13,
                  fontWeight: "500",
                  marginRight: 5,
                }}
              ></Octicons>
              <Text
                style={{
                  fontSize: 13,
                }}
              >
                Verify immediatelly ticket
              </Text>
            </View>
            <View
              style={[
                tailwind("flex flex-row justify-start items-center"),
                {
                  width: "100%",
                  // backgroundColor: "red",
                },
              ]}
            >
              <Octicons
                name="verified"
                style={{
                  color: colors.greenVerify,
                  fontSize: 13,
                  fontWeight: "500",
                  marginRight: 5,
                }}
              ></Octicons>
              <Text
                style={{
                  fontSize: 13,
                }}
              >
                Verify immediatelly ticket
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "rgb(8,27,57)",
              borderRadius: 6,
            }}
            onPress={() => {}}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                paddingVertical: 12,
                paddingHorizontal: 20,
                fontSize: 14,
                fontWeight: "500",
              }}
            >
              Book
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View></View>
    </View>
  );
};

export default CardTrip;
