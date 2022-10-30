import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  DatePickerIOS,
  TouchableOpacity,
} from "react-native";
import { useState, useCallback, useEffect } from "react";
import { useTailwind } from "tailwind-rn/dist";
import Icon from "react-native-vector-icons/AntDesign";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { DatePickerModal } from "react-native-paper-dates";
import { registerTranslation } from "react-native-paper-dates";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import setTabStyleVisibility from "../../utils/setVisible";
import { useDispatch, useSelector } from "react-redux";
import { getLocationReducer } from "../../redux/reducers/getLocationReducer";
import { swapLocation } from "../../redux/actions/getLocationAction";
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
const SearchFrame = ({ navigation, route, screen }) => {
  registerTranslation("pl", {
    save: "Save",
    selectSingle: "Select date",
    selectMultiple: "Select dates",
    selectRange: "Select period",
    notAccordingToDateFormat: (inputFormat) =>
      `Date format must be ${inputFormat}`,
    mustBeHigherThan: (date) => `Must be later then ${date}`,
    mustBeLowerThan: (date) => `Must be earlier then ${date}`,
    mustBeBetween: (startDate, endDate) =>
      `Must be between ${startDate} - ${endDate}`,
    dateIsDisabled: "Day is not allowed",
    previous: "Previous",
    next: "Next",
    typeInDate: "Type in date",
    pickDateFromCalendar: "Pick date from calendar",
    close: "Close",
  });
  const tailwind = useTailwind();

  var array = new Date().toString().split(" ");
  var currentDate = array[0] + " " + array[1] + " " + array[2] + " " + array[3];
  const [date, setDate] = useState(currentDate);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [open, setOpen] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    // var date1 = date.split("")[0];
    // console.warn("A date has been picked: ", typeof date);
    // var currentDateChange = new Date(date1)
    // setDate(currentDateChange);
    // // console.warn("A date has been picked: ", currentDateChange);
    // console.warn("A date has been picked: ", currentDateChange);
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

  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate]
  );
  // useSelector
  const selector = useSelector((state) => state.getLocationReducer);
  // useEffect(() => {
  //   console.warn(selector)
  // })
  const dispatch = useDispatch();
  const clickSwapLocation = () => {
    dispatch(swapLocation());
  };
  const location = useSelector(state => state.getLocationReducer)
  const SearchTicket = () => {
    navigation.navigate("ChooseTrip", {
      departLocation: location.startPoint,
      arrivalLocation: location.stopPoint,
      date: date,
      showModal: false,
    })
    // console.warn("a")
  }
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
                  // showDatePicker();
                  // setOpen(true);
                  navigation.setOptions({
                    ...setTabStyleVisibility(false),
                    headerTitle: "ok",
                  });
                  // console.warn(...setTabStyleVisibility(true).tabBarStyle.display)
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
                    fontSize: !selector.startPoint ? 15 : 15,
                    width: Dimensions.get("screen").width / 1.6,
                  }}
                >
                  {!selector.startPoint
                    ? "Choose start point"
                    : selector.startPoint}
                  {/* {selector.startPoint} */}
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
              top: (heightSearchFrame * (70 / 100) * (50 / 100) - 22),
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
                  // showDatePicker();
                  // setOpen(true);
                  navigation.setOptions({
                    ...setTabStyleVisibility(false),
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
                    fontSize: !selector.stopPoint ? 15 : 15,
                    width: Dimensions.get("screen").width / 1.6,
                  }}
                >
                  {!selector.stopPoint
                    ? "Choose stop point"
                    : selector.stopPoint}
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
                setOpen(true);
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 15,
                }}
              >
                {date}
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
          SearchTicket()
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
