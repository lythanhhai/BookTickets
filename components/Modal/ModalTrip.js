import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import colors from "../../constants/colors";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const colorGray = "rgb(170,170,170)";
const paddingHorizontalTab = 20;
const heightModalBottom = 130;
const pickup = "pickup",
  dropoff = "dropoff",
  rating = "rating";
const ModalTrip = ({ navigation, route, RBSheetRefTrip }) => {
  const [currentTab, setCurrentTab] = useState(pickup);
  const handleClickDropOff = () => {
    setCurrentTab(dropoff);
  };
  const handleClickPickUp = () => {
    setCurrentTab(pickup);
  };
  const handleClickRating = () => {
    setCurrentTab(rating);
  };
  return (
    <View
      style={{
        // backgroundColor: "blue",
        height: "100%",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: 20,
          // backgroundColor: "red",
          height: "80%"
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginLeft: 20,
            }}
          >
            <Text
              style={{
                fontSize: 19,
                fontWeight: "600",
                marginBottom: 5,
              }}
            >
              An Anh Limousine
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "500",
                }}
              >
                23:00
              </Text>
              <View
                style={{
                  height: 5,
                  width: 5,
                  borderRadius: 10,
                  backgroundColor: "black",
                  marginHorizontal: 5,
                }}
              ></View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "500",
                  color: "rgb(50, 50, 50)",
                }}
              >
                Wed, 11/06/2022
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              marginRight: 20,
            }}
            onPress={() => {
              RBSheetRefTrip.current.close();
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color: colors.blue,
                textDecorationLine: "underline",
              }}
            >
              Close
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{
            width: width,
            // backgroundColor: "red",
            borderBottomColor: "rgb(200, 200, 200)",
            borderBottomWidth: 1,
            // marginTop: 10,
          }}
        >
          <TouchableOpacity
            style={{
              paddingHorizontal: paddingHorizontalTab,
              borderBottomColor:
                currentTab === pickup ? colors.blue : "transparent",
              borderBottomWidth: 2,
              paddingVertical: 10,
            }}
            onPress={() => {
              handleClickPickUp();
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontWeight: "600",
                color: currentTab === pickup ? "black" : colorGray,
              }}
            >
              Pick-up
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingHorizontal: paddingHorizontalTab,
              borderBottomColor:
                currentTab === dropoff ? colors.blue : "transparent",

              borderBottomWidth: 2,

              paddingVertical: 10,
            }}
            onPress={() => {
              handleClickDropOff();
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontWeight: "600",
                color: currentTab === dropoff ? "black" : colorGray,
              }}
            >
              Drop-off
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingHorizontal: paddingHorizontalTab,
              borderBottomColor:
                currentTab === rating ? colors.blue : "transparent",
              borderBottomWidth: 2,

              paddingVertical: 10,
            }}
            onPress={() => {
              handleClickRating();
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontWeight: "600",
                color: currentTab === rating ? "black" : colorGray,
              }}
            >
              Rating
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <View
          style={{
            height: "75%",
            width: width,
            marginTop: 10,
          }}
        >
          {currentTab === pickup ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              renderItem={({ item }) => {
                return <CartItemPoint />;
              }}
            />
          ) : currentTab === dropoff ? (
            <></>
          ) : (
            <></>
          )}
        </View>
      </View>
      <View
        style={{
          width: width,
          height: "15%",
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
          paddingTop: 15,
          borderWidth: 1,
          borderColor: "rgb(220, 220, 220)",
        }}
      >
        <TouchableOpacity
          //   color="#841584"
          //   accessibilityLabel="Learn more about this purple button"
          style={{
            backgroundColor: "rgb(254,210,61)",
            width: width / 1.1,
            borderRadius: 6,
            // marginTop: 0,
          }}
          onPress={() => {
            // handleChoosePickup();
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
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "90%",
    borderColor: "rgb(215, 215, 215)",
    borderBottomWidth: 1,
    paddingVertical: 15,
  },
  containerBetween: {
    width: "80%",
  },
});

const CartItemPoint = () => {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "transparent",
        alignItems: "center",
      }}
    >
      <View style={[styles.container]}>
        <View
          style={{
            width: "20%",
          }}
        >
          <Text>23:00</Text>
        </View>

        <View style={[styles.containerBetween]}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "500",
              paddingTop: 5,
            }}
          >
            35 Nguyen Khuyen
          </Text>
          <Text
            style={{
              color: colors.gray,
              paddingTop: 5,
            }}
          >
            35 Nguyen Khuyen, Hoa Khanh Nam, Lien Chieu, Da Nang
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ModalTrip;
