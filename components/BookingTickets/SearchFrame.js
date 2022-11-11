import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  DatePickerIOS,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState, useCallback, useEffect } from "react";
import { useTailwind } from "tailwind-rn/dist";
import Icon from "react-native-vector-icons/AntDesign";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import setTabStyleVisibility from "../../utils/setVisible";
import { useDispatch, useSelector } from "react-redux";
import {
  swapLocation,
  getDate,
  getNewDate,
  swapNewLocation,
} from "../../redux/actions/getLocationAction";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A8E9CA",
  },
  title: {
    textAlign: "left",
    fontSize: 20,
    fontWeight: "bold",
  },
  datePickerStyle: {
    width: 230,
  },
  text: {
    textAlign: "left",
    width: 230,
    fontSize: 16,
    color: "#000",
  },
});
const heightSearchFrame = Dimensions.get("window").height / 3.5;
const SearchFrame = ({ navigation, route, screen, setCheckClickSearch }) => {
  const tailwind = useTailwind();

  var array = new Date().toString().split(" ");
  var currentDate = array[0] + " " + array[1] + " " + array[2] + " " + array[3];
  const [date, setDate] = useState(currentDate);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    var arrayDate = date.toString().split(" ");
    var dateChoosen =
      arrayDate[0] +
      " " +
      arrayDate[1] +
      " " +
      arrayDate[2] +
      " " +
      arrayDate[3];
    setDate(dateChoosen);
    hideDatePicker();
  };

  const dispatch = useDispatch();
  const clickSwapLocation = () => {
    if (screen === "Home") {
      dispatch(swapLocation());
    } else {
      dispatch(swapNewLocation());
    }
  };
  const location = useSelector((state) => state.getLocationReducer);

  // function search ticket depend on dep, des and date
  const SearchTicket = () => {
    if (screen === "Home") {
      if (location.date && location.startPoint && location.stopPoint) {
        navigation.replace("ChooseTrip", { screen: "Home" });
        // setCheckClickSearch(true);
      } else {
        Alert.alert("Cannot Search", "Please fill out information!");
      }
    } else {
      navigation.replace("ChooseTrip", { screen: "ChooseTrip" });
    }
  };

  // dispatch date in search
  useEffect(() => {
    var arrayComapre = new Date().toString().split(" ");
    var currentDateCompare =
      arrayComapre[0] +
      " " +
      arrayComapre[1] +
      " " +
      arrayComapre[2] +
      " " +
      arrayComapre[3];
    if (
      date !== location.date &&
      date === currentDateCompare &&
      location.date !== ""
    ) {
    } else {
      if (screen === "Home") {
        dispatch(getDate(date));
      } else {
        dispatch(getNewDate(date));
      }
    }
  }, [date]);

  return (
    <View>
      <View
        style={[
          tailwind("flex flex-col justify-between"),
          {
            backgroundColor: "white",
            height: Dimensions.get("window").height / 3.5,
            width: Dimensions.get("screen").width / 1.1,
            marginTop: 20,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,

            elevation: 9,
          },
        ]}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            height: "70%",
            width: "100%",
            paddingLeft: 20,
            // backgroundColor: "blue",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              height: "50%",
              width: "100%",
              // backgroundColor: "blue",
              // borderBottomWidth: 1,
              // borderBottomColor: colors.borderGray,
            }}
          >
            <Entypo
              size={18}
              color="black"
              name="location-pin"
              style={{
                marginHorizontal: 15,
                fontSize: 26,
                color: "rgb(35,115,228)",
              }}
            />
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                height: "100%",
                // backgroundColor: "blue",
                borderBottomWidth: 1,
                borderBottomColor: colors.borderGray,
              }}
            >
              <Text
                style={{
                  color: "gray",
                  fontSize: 13,
                }}
              >
                Start point
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.setOptions({
                    ...setTabStyleVisibility(false),
                    headerTitle: "Back",
                  });

                  navigation.navigate("LocationStart", {
                    screen: "startpoint",
                    screenReturn: screen,
                    date: date,
                    // routeCurrent: route,
                  });
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: !location.startPoint ? 15 : 15,
                    width: Dimensions.get("screen").width / 1.6,
                  }}
                >
                  {/* {!location.startPoint
                    ? "Choose start point"
                    : location.startPoint.split("-")[0]} */}
                  {screen === "ChooseTrip"
                    ? location.startPoint !== location.newStartPoint
                      ? location.newStartPoint.split("-")[0]
                      : location.startPoint.split("-")[0]
                    : !location.startPoint
                    ? "Choose start point"
                    : location.startPoint.split("-")[0]}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              // backgroundColor: "red",
              height: 1,
              width: "100%",
            }}
          > */}
          {/* <View
              style={{
                height: heightSearchFrame / 4,
                width: 1,
                backgroundColor: "rgb(120, 120, 120)",
                position: "absolute",
                top: -heightSearchFrame / 8,
                left: 27.5,
              }}
            ></View> */}
          <TouchableOpacity
            style={{
              position: "absolute",
              top: heightSearchFrame * (70 / 100) * (50 / 100) - 22,
              right: 5,
              // borderWidth: 2,
              borderColor: "transparent",
              paddingHorizontal: 8,
              paddingVertical: 7,
              borderRadius: 50,
              backgroundColor: "rgb(240, 240, 240)",
            }}
            onPress={() => {
              clickSwapLocation();
            }}
          >
            <Ionicons
              size={18}
              name="swap-vertical"
              style={{
                // marginHorizontal: 15,
                fontSize: 25,
                color: "rgb(35,115,228)",
              }}
            />
          </TouchableOpacity>
          {/* </View> */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              height: "50%",
              width: "100%",
              // backgroundColor: "yellow"
            }}
          >
            <Entypo
              size={18}
              color="black"
              name="location-pin"
              style={{
                marginHorizontal: 15,
                fontSize: 26,
                color: "red",
              }}
            />
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                height: "50%",
              }}
            >
              <Text
                style={{
                  color: "gray",
                  fontSize: 13,
                }}
              >
                Where to?
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.setOptions({
                    ...setTabStyleVisibility(false),
                    headerTitle: "Back",
                  });
                  navigation.navigate("LocationStop", {
                    screen: "stoppoint",
                    screenReturn: screen,
                    date: date,
                  });
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: !location.stopPoint ? 15 : 15,
                    width: Dimensions.get("screen").width / 1.6,
                  }}
                >
                  {/* {!location.stopPoint
                    ? "Choose stop point"
                    : location.stopPoint.split("-")[0]} */}
                  {screen === "ChooseTrip"
                    ? location.stopPoint !== location.newStopPoint
                      ? location.newStopPoint.split("-")[0]
                      : location.stopPoint.split("-")[0]
                    : !location.stopPoint
                    ? "Choose stop point"
                    : location.stopPoint.split("-")[0]}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            height: "30%",
            alignItems: "center",
            borderTopWidth: 1,
            borderTopColor: colors.borderGray,
            marginLeft: 20,
            paddingBottom: 6,
            // backgroundColor: "red",
          }}
        >
          <Icon
            size={18}
            color="black"
            name="calendar"
            style={{
              marginHorizontal: 15,
              fontSize: 25,
              color: "rgb(35,115,228)",
            }}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Text
              style={{
                color: "gray",
                fontSize: 13,
              }}
            >
              Departure date
            </Text>
            <TouchableOpacity
              onPress={() => {
                showDatePicker();
                // setOpen(true);
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 15,
                }}
              >
                {screen === "ChooseTrip"
                  ? location.date !== location.newDate
                    ? location.newDate
                    : location.date
                  : !location.date
                  ? "Choose date"
                  : location.date}
              </Text>
            </TouchableOpacity>
            {Platform.OS === "ios" ? (
              // <DatePickerModal
              //   // locale="en"
              //   mode="single"
              //   visible={open}
              //   onDismiss={onDismissSingle}
              //   date={dateIphone}
              //   onConfirm={onConfirmSingle}
              // />
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                isDarkModeEnabled={false}
              />
            ) : (
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                isDarkModeEnabled={false}
              />
            )}
          </View>
        </View>
      </View>
      <TouchableOpacity
        // onPress={onPressLearnMore}
        //   color="#841584"
        //   accessibilityLabel="Learn more about this purple button"
        style={{
          backgroundColor: "rgb(8,27,57)",
          width: Dimensions.get("screen").width / 1.1,
          borderRadius: 6,
          marginTop: 15,
        }}
        onPress={() => {
          SearchTicket();
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            paddingVertical: Dimensions.get("window").height / 40,
            fontSize: 14,
            fontWeight: "500",
          }}
        >
          Search Tickets
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchFrame;
