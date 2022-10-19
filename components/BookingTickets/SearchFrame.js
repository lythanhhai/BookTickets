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

const SearchFrame = () => {
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
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [open, setOpen] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
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

  return (
    <View>
      <View
        style={[
          tailwind("flex flex-col justify-between"),
          {
            backgroundColor: "white",
            height: Dimensions.get("screen").height / 4,
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
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginLeft: 10,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              marginLeft: 10,
              marginTop: 10,
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
                height: "35%",
                width: 1,
                backgroundColor: "black",
              }}
            ></View>
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
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "flex-end",
              height: "90%",
              width: "100%",
              // backgroundColor: "red",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                position: "absolute",
                top: "7%",
                left: 0,
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
                  showDatePicker();
                  setOpen(true);
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                >
                  Da Nang
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: 1,
                width: "80%",
                backgroundColor: "rgb(210, 210, 210)",
                position: "absolute",
                top: "55%",
                left: 0,
              }}
            ></View>
            <TouchableOpacity
              style={{
                position: "absolute",
                top: "38.5%",
                left: "60%",
                transform: [{ rotateY: "180deg" }],
                borderWidth: 1,
                borderColor: "rgb(160, 160, 160)",
                paddingHorizontal: 1,
                paddingVertical: 6,
                borderRadius: 50,
              }}
            >
              <FontAwesome
                size={18}
                color="black"
                name="exchange"
                style={{
                  marginHorizontal: 15,
                  fontSize: 25,
                  color: "rgb(35,115,228)",
                }}
              />
            </TouchableOpacity>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                position: "absolute",
                top: "50%",
                left: 0,
                // borderTopWidth: 1,
                // borderTopColor: "rgb(210, 210, 210)",
                // width: "90%",
                marginTop: 10,
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
                  showDatePicker();
                  setOpen(true);
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                >
                  Quang Tri
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
            height: "25%",
            alignItems: "center",
            borderTopWidth: 1,
            borderTopColor: "rgb(210, 210, 210)",
            marginLeft: 20,
            marginBottom: 10,
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
                  fontSize: 20,
                }}
              >
                18-10-2022
              </Text>
            </TouchableOpacity>
            {Platform.OS === "ios" ? (
              <DatePickerModal
                // locale="en"
                mode="single"
                visible={open}
                onDismiss={onDismissSingle}
                date={date}
                onConfirm={onConfirmSingle}
              />
            ) : (
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                isDarkModeEnabled={false}
                // display="spinner"
              />
              // <DatePickerModal
              //   // locale="en"
              //   mode="single"
              //   visible={open}
              //   onDismiss={onDismissSingle}
              //   date={date}
              //   onConfirm={onConfirmSingle}
              // />
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
