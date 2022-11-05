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
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: 20,
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

          // backgroundColor: "blue",
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
          height: height / 2,
          width: width,
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
      <View></View>
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
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            23:00
          </Text>
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
