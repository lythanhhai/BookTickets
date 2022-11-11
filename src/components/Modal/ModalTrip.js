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
import { useSelector } from "react-redux";
import { formatDate } from "../../utils/formatDate";
import { calculateSumHour } from "../../utils/calculateSumHour";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const colorGray = "rgb(170,170,170)";
const paddingHorizontalTab = 20;
const heightModalBottom = 130;
const pickup = "pickup",
  dropoff = "dropoff",
  rating = "rating";
const ModalTrip = ({ navigation, route, RBSheetRefTrip, tripChosen }) => {
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
  const location = useSelector((state) => state.getLocationReducer);
  const [data, setData] = useState([]);
  useEffect(() => {
    // console.warn(route.params.routeStations)
    let arrayRes = [];
    if (currentTab == pickup) {
      tripChosen.routeStations.forEach((item, index) => {
        arrayRes.push(item[0]);
      });
      setData(arrayRes);
    } else if (currentTab == dropoff) {
      tripChosen.routeStations.forEach((item, index) => {
        arrayRes.push(item[1]);
      });
      setData(arrayRes);
    }
  }, [currentTab]);
  return (
    <View
      style={{
        height: "100%",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          marginTop: 20,
          height: "100%",
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
              {tripChosen.nameVehicle}
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
                {tripChosen.timeStart.split(":").slice(0, 2).join(":")}
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
                {location.date.split(" ")[0] + ", " + formatDate(location.date)}
                {/* Wed, 11/06/2022 */}
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
        <View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{
              width: width,
              borderBottomColor: "rgb(200, 200, 200)",
              borderBottomWidth: 1,
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
        </View>
        <View
          style={{
            height: Dimensions.get("screen").height / 2.1,
            width: width,
            marginTop: 10,
          }}
        >
          {currentTab === pickup ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data}
              contentContainerStyle={{}}
              renderItem={({ item, index }) => {
                return (
                  <CartItemPoint
                    item={item}
                    index={index}
                    tripChosen={tripChosen}
                    dropScreen={false}
                  />
                );
              }}
            />
          ) : currentTab === dropoff ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data}
              renderItem={({ item, index }) => {
                return (
                  <CartItemPoint
                    item={item}
                    index={index}
                    tripChosen={tripChosen}
                    dropScreen={true}
                  />
                );
              }}
            />
          ) : (
            <></>
          )}
        </View>
      </View>
      <View
        style={{
          width: width,
          // height: "15%",
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
            marginTop: 15,
            marginBottom: 20,
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
            Book this trip
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

const CartItemPoint = ({ item, index, tripChosen, dropScreen }) => {
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
          <Text>
            {dropScreen
              ? calculateSumHour(
                  tripChosen.timeStart,
                  tripChosen.timeStations.slice(0, index + 1)
                ).endTime
              : calculateSumHour(
                  tripChosen.timeStart,
                  tripChosen.timeStations.slice(0, index)
                ).endTime}
          </Text>
        </View>

        <View style={[styles.containerBetween]}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "500",
              paddingTop: 5,
            }}
          >
            {item}
          </Text>
          <Text
            style={{
              color: colors.gray,
              paddingTop: 5,
            }}
          >
            {item}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ModalTrip;
