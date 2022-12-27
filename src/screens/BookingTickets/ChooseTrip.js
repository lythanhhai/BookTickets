import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import SearchFrame from "../../components/BookingTickets/SearchFrame";
import colors from "../../constants/colors";

import styleGlobal from "../../constants/styleGlobal";
import CardTrip from "../../components/BookingTickets/CardTrip";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as screenName from "../../constants/nameScreen";
import RBSheet from "react-native-raw-bottom-sheet";
import { useRef } from "react";
import ModalTrip from "../../components/Modal/ModalTrip";
import { getTrips } from "../../API/ApiGetTrips";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../utils/formatDate";
import NotFound from "../../components/NotFound.js/NotFound";
import { resetNew, search } from "../../redux/actions/getLocationAction";

const styles = StyleSheet.create(styleGlobal);
const stylesFilter = StyleSheet.create({
  touchable: {
    paddingHorizontal: 8,
    borderRadius: 8,
    borderColor: colors.gray,
    borderWidth: 1,
    marginHorizontal: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },
  touchableFirst: {
    paddingHorizontal: 8,
    borderRadius: 8,
    borderColor: colors.gray,
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },
  text: {
    color: "black",
    paddingVertical: 2,
    fontSize: 14,
  },
  icon: {
    color: "black",
    paddingVertical: 2,
    fontSize: 12,
    marginRight: 4,
  },
});

const ChooseTrip = ({ navigation, route }) => {
  const tailwind = useTailwind();
  const [Data, setData] = useState([]);
  const [DataFilter, setDataFilter] = useState([]);
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModalFilter, setShowModalFilter] = useState(false);
  const [tripChosen, setTripChosen] = useState({});
  const [method, setMethod] = useState({
    type: "Rating",
    orient: false,
  });
  const RBSheetRefTrip = useRef();
  const location = useSelector((state) => state.getLocationReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    // setShowChangeModal(false)
    if (route.params?.departLocation) {
      getTrips(
        {
          date: route.params?.date,
          dep: route.params?.departLocation,
          des: route.params?.arriveLocation,
        },
        setData,
        setLoading,
        setDataFilter
      );
    } else {
      if (route.params?.screen === "Home") {
        getTrips(
          {
            date: formatDate(location.date),
            dep: parseInt(location.startPoint.split("-")[1]),
            des: parseInt(location.stopPoint.split("-")[1]),
          },
          setData,
          setLoading,
          setDataFilter
        );
      } else {
        getTrips(
          {
            date: formatDate(location.newDate),
            dep: parseInt(location.newStartPoint.split("-")[1]),
            des: parseInt(location.newStopPoint.split("-")[1]),
          },
          setData,
          setLoading,
          setDataFilter
        );
        dispatch(search());
      }
    }
  }, []);

  useEffect(() => {
    let res = [...Data];
    // console.warn(method);
    if (method.type === "Time") {
      if (!method.orient) {
        res = Data.sort((a, b) => {
          return (
            parseInt(a.timeStart.split(":")[0]) -
            parseInt(b.timeStart.split(":")[0])
          );
        });
      } else {
        res = Data.sort((a, b) => {
          return (
            parseInt(b.timeStart.split(":")[0]) -
            parseInt(a.timeStart.split(":")[0])
          );
        });
      }
    } else if (method.type === "Price") {
      if (!method.orient) {
        res = Data.sort((a, b) => {
          return a.price - b.price;
        });
      } else {
        res = Data.sort((a, b) => {
          return b.price - a.price;
        });
      }
    } else if (method.type === "Rating") {
      if (!method.orient) {
        res = Data.reverse();
      } else {
        res = [...Data];
      }
    }

    setDataFilter(res);
  }, [method]);
  return (
    <View
      style={[
        styles.backgroundBottom,
        {
          backgroundColor: "rgb(245,245,245)",
        },
      ]}
    >
      <View style={[styles.background]}>
        <Header
          whichScreen={screenName.chooseTripScreen}
          navigation={navigation}
          // titleElement={route.params}
          setShowChangeModal={setShowChangeModal}
          showChangeModal={showChangeModal}
        />

        {/* <CardTrip /> */}
      </View>
      {/* <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tailwind(
          "flex flex-row justify-start items-center"
        )}
        style={[
          {
            width: Dimensions.get("screen").width,
            height: 100,
            backgroundColor: "white",
          },
        ]}
      >
        <TouchableOpacity
          style={stylesFilter.touchable}
          onPress={() => {
            // console.log(method.orient);
            if (method.type === "Time") {
              setMethod({
                ...method,
                orient: !method.orient,
              });
            } else {
              setMethod({
                type: "Time",
                orient: true,
              });
            }
            // setShowModalFilter(true);
          }}
        >
          <Ionicons name="time-outline" style={stylesFilter.icon}></Ionicons>
          <Text style={stylesFilter.text}>Time</Text>
          {method.type === "Time" ? (
            method.orient ? (
              <AntDesign
                name="up"
                style={[stylesFilter.icon, { marginLeft: 4, marginRight: 0 }]}
              ></AntDesign>
            ) : (
              <AntDesign
                name="down"
                style={[stylesFilter.icon, { marginLeft: 4, marginRight: 0 }]}
              ></AntDesign>
            )
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          style={stylesFilter.touchable}
          onPress={() => {
            // console.log(method);
            if (method.type === "Price") {
              setMethod({
                ...method,
                orient: !method.orient,
              });
            } else {
              setMethod({
                type: "Price",
                orient: true,
              });
            }
            // setShowModalFilter(true);
          }}
        >
          <Ionicons
            name="pricetag-outline"
            style={stylesFilter.icon}
          ></Ionicons>
          <Text style={stylesFilter.text}>Price</Text>
          {method.type === "Price" ? (
            method.orient ? (
              <AntDesign
                name="up"
                style={[stylesFilter.icon, { marginLeft: 4, marginRight: 0 }]}
              ></AntDesign>
            ) : (
              <AntDesign
                name="down"
                style={[stylesFilter.icon, { marginLeft: 4, marginRight: 0 }]}
              ></AntDesign>
            )
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          style={stylesFilter.touchable}
          onPress={() => {
            if (method.type === "Rating") {
              setMethod({
                ...method,
                orient: !method.orient,
              });
            } else {
              setMethod({
                type: "Rating",
                orient: true,
              });
            }
            // setShowModalFilter(true);
          }}
        >
          <Ionicons name="star-outline" style={stylesFilter.icon}></Ionicons>
          <Text style={stylesFilter.text}>Rating</Text>
          {method.type === "Rating" ? (
            method.orient ? (
              <AntDesign
                name="up"
                style={[stylesFilter.icon, { marginLeft: 4, marginRight: 0 }]}
              ></AntDesign>
            ) : (
              <AntDesign
                name="down"
                style={[stylesFilter.icon, { marginLeft: 4, marginRight: 0 }]}
              ></AntDesign>
            )
          ) : null}
        </TouchableOpacity>
      </ScrollView> */}
      {loading ? (
        <View
          style={[
            tailwind("flex flex-col justify-start items-center"),
            {
              height:
                Dimensions.get("screen").height -
                Dimensions.get("screen").height / 8.5 -
                50,
              width: Dimensions.get("screen").width,
              // paddingTop: 50,
              paddingTop: 30,
            },
          ]}
        >
          <ActivityIndicator size="large" color={colors.blue} />
        </View>
      ) : Data.length === 0 ? (
        <View
          style={[
            tailwind("flex flex-col justify-start items-center"),
            {
              height:
                Dimensions.get("screen").height -
                Dimensions.get("screen").height / 8.5 -
                50,
              width: Dimensions.get("screen").width,
            },
          ]}
        >
          <NotFound />
        </View>
      ) : (
        <View
          style={[
            tailwind("flex flex-col justify-start items-center"),
            {
              height:
                Dimensions.get("screen").height -
                Dimensions.get("screen").height / 8.5 -
                50,
              width: Dimensions.get("screen").width,
            },
          ]}
        >
          <FlatList
            data={DataFilter}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            // keyExtractor={1}
            contentContainerStyle={
              [
                // tailwind("flex flex-col items-center justify-center"),
                // {
                //   backgroundColor: "red",
                //   // flexGrow: 1,
                // },
              ]
            }
            // style={[tailwind("flex flex-row items-center justify-center"), {height: "100%", width: "100%"}]}
            renderItem={({ item }) => {
              return (
                <CardTrip
                  item={item}
                  navigation={navigation}
                  showModalDetailTrip={RBSheetRefTrip}
                  setTripChosen={setTripChosen}
                  DataFilter={DataFilter}
                />
              );
            }}
          ></FlatList>
        </View>
      )}

      <RBSheet
        ref={RBSheetRefTrip}
        height={Dimensions.get("screen").height / 1.3}
        openDuration={250}
        closeOnDragDown={false}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            // backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "rgb(160, 160, 160)",
          },
          container: {
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
          },
        }}
      >
        <ModalTrip
          navigation={navigation}
          route={route}
          RBSheetRefTrip={RBSheetRefTrip}
          tripChosen={tripChosen}
        />
      </RBSheet>
      {showChangeModal ? (
        <View
          style={{
            height:
              Dimensions.get("screen").height -
              Dimensions.get("screen").height / 8.5,
            width: Dimensions.get("screen").width,
            backgroundColor: "transparent",
            position: "absolute",
            top: Dimensions.get("screen").height / 8.5,
            left: 0,
            zIndex: 2,
          }}
        >
          <View
            style={{
              height: Dimensions.get("screen").height / 2.3,
              width: Dimensions.get("screen").width / 1,
              backgroundColor: "rgb(246, 246, 246)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              // position: "absolute",
              // top: Dimensions.get("screen").height / 8.5,
              // left: 0,
              // zIndex: 1,
            }}
          >
            {/* <CardTrip /> */}
            <SearchFrame
              navigation={navigation}
              route={route}
              screen={"ChooseTrip"}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              setShowChangeModal(false);
              dispatch(resetNew());
            }}
            style={{
              height:
                Dimensions.get("screen").height -
                Dimensions.get("screen").height / 2.3 -
                Dimensions.get("screen").height / 8.5,
              width: Dimensions.get("screen").width / 1,
              backgroundColor: "rgb(0, 0, 0)",
              opacity: 0.6,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              // position: "absolute",
              // bottom: 0,
              // left: 0,
              // zIndex: 1,
            }}
          ></TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
      {/* {!showModalFilter ? (
        <View
          style={{
            height: Dimensions.get("screen").height / 6,
            width: Dimensions.get("screen").width,
            backgroundColor: "white",
            position: "absolute",
            top:
              Dimensions.get("screen").height / 8.5 +
              Dimensions.get("screen").height / 20,
            left: 0,
            zIndex: 1,
          }}
        ></View>
      ) : (
        <></>
      )} */}
    </View>
  );
};

export default ChooseTrip;
