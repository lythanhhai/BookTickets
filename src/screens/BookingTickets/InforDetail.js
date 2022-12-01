import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useCallback, useLayoutEffect, useMemo } from "react";
import styleGlobal from "../../constants/styleGlobal";
import Header from "../../components/Header/Header";
import { useState, useEffect } from "react";
import SomeInformation from "../../components/Register/SomeInformation";
import * as screenName from "../../constants/nameScreen";
import { useDispatch, useSelector } from "react-redux";
import { setInforPassenger } from "../../redux/actions/inforBookAction";
import { ApiBookingPartSeat, ApiBookingSeat } from "../../API/ApiBooking";
import Loading from "../../components/Loading/Loading";
import { GetProfile } from "../../API/ApiProfile";

const styles = StyleSheet.create(styleGlobal);
const widthDevice = Dimensions.get("screen").width;
const heightDevice = Dimensions.get("screen").height;
const heightModalBottom = 130;

const InforDetail = ({ navigation, route }) => {
  const userCurrent = useSelector((state) => state.authenReducer);
  const [dataDetail, setDataDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const GetData = async () => {
    await GetProfile(setDataDetail, userCurrent.accessToken, setIsLoading);
    // setData({
    //   email: dataDetail.email,
    //   phoneNumber: dataDetail.phone,
    //   name: dataDetail.name,
    //   note: "",
    // });
  };
  useLayoutEffect(() => {
    // await GetProfile(setDataDetail, userCurrent.accessToken, setIsLoading);
    GetData();
  }, []);
  useEffect(() => {
    setData({
      email: dataDetail.email,
      phoneNumber: dataDetail.phone,
      name: dataDetail.name,
      note: "",
    });
  }, [dataDetail]);
  // useCallback(() => {
  //   console.warn("d");
  // }, []);
  // useMemo(() => {
  //   console.warn("e");
  // }, []);
  // console.warn("a");
  const [data, setData] = useState({
    email: "",
    phoneNumber: "",
    name: "",
    note: "",
  });
  const [inValidData, setInValidData] = useState({
    errName: "",
    errPhone: "",
    errEmail: "",
    errRequire: "",
  });
  useEffect(() => {
    if (data.email && data.phoneNumber && data.name) {
      setInValidData({
        ...inValidData,
        errRequire: "",
      });
    }
  }, [data.email, data.phoneNumber, data.name]);
  // const [inforTicketData, setInforTicketData] = useState({});
  const [itemChosen, setItemChosen] = useState(0);
  const dispatch = useDispatch();
  const inforTicketBook = useSelector((state) => state.inforBookReducer);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const printTicket = () => {
    // console.warn(inValidData);
    // console.warn(data);
    if (!data.email || !data.phoneNumber || !data.name) {
      setInValidData({
        ...inValidData,
        errRequire: "Please fill out all information",
      });
    }
    // if not null
    else {
      setInValidData({
        ...inValidData,
        errRequire: "",
      });
      // check another error
      if (
        !inValidData.errName &&
        !inValidData.errPhone &&
        !inValidData.errEmail
      ) {
        dispatch(setInforPassenger(data));
        let inforTicketData = {};
        if (inforTicketBook.routeStationBook.length === 0) {
          inforTicketData = {
            email: data.email,
            name: data.name,
            note: data.note,
            phoneNumber: data.phoneNumber,
            // price: inforTicketBook.price,
            // quantity: inforTicketBook.quantity,
            // routeStationBook: inforTicketBook.routeStationBook,
            seatIds: inforTicketBook.seatIds,
            tripId: inforTicketBook.tripId,
            nameAgency: inforTicketBook.nameAgency,
            nameVehicle: inforTicketBook.nameVehicle,
          };
          // console.warn(inforTicketData)
          ApiBookingSeat(
            inforTicketData,
            navigation,
            setLoading,
            route.params,
            setUrl
          );
        } else {
          inforTicketData = {
            email: data.email,
            name: data.name,
            note: data.note,
            phoneNumber: data.phoneNumber,
            price: inforTicketBook.price,
            quantity: inforTicketBook.quantity,
            routeStationBook: inforTicketBook.routeStationBook,
            tripId: inforTicketBook.tripId,
            nameAgency: inforTicketBook.nameAgency,
            nameVehicle: inforTicketBook.nameVehicle,
          };
          ApiBookingPartSeat(
            inforTicketData,
            navigation,
            setLoading,
            route.params,
            setUrl
          );
        }
      }
    }
  };
  return (
    <View>
      {loading ? (
        <Loading></Loading>
      ) : (
        <View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: heightDevice,
                }}
              >
                <View style={[styles.background]}>
                  <Header
                    whichScreen={screenName.inforDetailScreen}
                    navigation={navigation}
                  />
                </View>
                <ScrollView>
                  <SomeInformation
                    remind={
                      "We only use your personal information to confirm tickets"
                    }
                    whichScreen={screenName.inforDetailScreen}
                    setData={setData}
                    inValidData={inValidData}
                    setInValidData={setInValidData}
                    data={data}
                  />
                </ScrollView>
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    borderTopWidth: 1,
                    borderTopColor: "rgb(200, 200, 200)",
                    width: Dimensions.get("screen").width,
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    paddingTop: 20,
                    paddingBottom: Platform.OS === "ios" ? 30 : 70,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: "rgb(254,210,61)",
                      width: Dimensions.get("screen").width / 1.1,
                      borderRadius: 6,
                    }}
                    onPress={() => {
                      printTicket();
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
                      Book
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      )}
    </View>
  );
};

export default InforDetail;
