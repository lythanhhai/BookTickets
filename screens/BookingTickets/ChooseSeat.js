import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  Alert,
  ActivityIndicator,
} from "react-native";
import React from "react";
import styleGlobal from "../../constants/styleGlobal";
import Header from "../../components/Header/Header";
import { floor1, floor2 } from "../../constants/DataSeat";
import colors from "../../constants/colors";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entyto from "react-native-vector-icons/Entypo";
import { useState, useEffect } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { useRef } from "react";
import ModalSeatSelected from "../../components/Modal/ModalSeatSelected";
import { number } from "yup";
import * as screenName from "../../constants/nameScreen";
import { useSelector } from "react-redux";
import { getTrips } from "../../API/ApiGetTrips";
import { formatDate } from "../../utils/formatDate";
// import { ScrollView } from 'react-native-virtualized-view'

const widthScreen = Dimensions.get("screen").width;
const heightScreen = Dimensions.get("screen").height;
const shapeHeightSeat = 60;
const shapeWidthSeat = 40;
const shapeSeatTop = 30;
const marginSeat = 10;
const backgroundColorReversed = "rgb(210,210,210)";
const heightBottomSheet = 200;
const colorSelecting = "rgb(255, 173, 190)";
const colorIcon = "rgb(250, 250, 250)";
const heightRight = "100%";
const widthRight = "15%";
const styles = StyleSheet.create(styleGlobal);
const stylesItem = StyleSheet.create({
  icon: {
    fontSize: 20,
    // fontWeight: "300",
    color: colorIcon,
    textAlign: "center",
    marginBottom: 6,
    // backgroundColor: "red",
    width: "100%",
  },
});
const stylesAnimation = StyleSheet.create({
  cover: {
    backgroundColor: "rgba(0,0,0,.5)",
  },
  sheet: {
    // position: "absolute",
    // top: Dimensions.get("window").height,
    // left: 0,
    // right: 0,
    height: heightBottomSheet,
    // justifyContent: "flex-end",
    // backgroundColor: "transparent",
    marginBottom: -heightBottomSheet,
  },
  popup: {
    // marginHorizontal: 10,
    minHeight: 250,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "red",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
});
const SeatItem = ({ item, index, hanldeClickSeat }) => {
  return (
    <TouchableOpacity
      style={{
        height: shapeHeightSeat,
        width: shapeWidthSeat,
        margin: marginSeat,
        borderColor:
          item.status === 0
            ? colors.blue
            : item.status === 2
            ? colorSelecting
            : "transparent",
        backgroundColor:
          item.status === 1
            ? colors.blue
            : item.status === 3
            ? backgroundColorReversed
            : "transparent",
        borderWidth: 1.5,
        borderRadius: 7,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
      onPress={() => {
        hanldeClickSeat(item);
      }}
      disabled={item.status === 3 ? true : false}
    >
      {item.status === 3 ? (
        <FontAwesome name="remove" style={stylesItem.icon} />
      ) : item.status === 1 ? (
        <MaterialIcons name="done" style={stylesItem.icon} />
      ) : (
        ""
      )}
      <View
        style={{
          height: 15,
          width: "70%",
          marginBottom: 6,
          borderWidth: 1,
          borderColor:
            item.status === 0
              ? colors.blue
              : item.status === 2
              ? colorSelecting
              : item.status === 3 || item.status === 1
              ? "white"
              : "transparent",
          borderRadius: 5,
        }}
      ></View>
    </TouchableOpacity>
  );
};
const ChooseSeat = ({ navigation, route }) => {
  const RBSheetRef = useRef();
  // choose seat
  const [showModalSeat, setShowModalSeat] = useState(false);
  const [dataModalSeat, setDataModalSeat] = useState({
    numberSeat: 0,
    nameSeats: [],
    price: 0,
  });
  const [currentStair, setCurrentStair] = useState(1);
  const hanldeClickSeat = (item) => {
    // console.warn("item: " + item.price);
    // console.warn("item1: " + FirstFloor[1].price);
    if (item.status === 2) {
      Alert.alert(
        "Invalid Seat!",
        "This seat is being selected by other people"
      );
    }
    let arrayResult = [];
    if (item.status === 0 && item.nameSeat.includes("A")) {
      FirstFloor.forEach((seat, index) => {
        seat.nameSeat !== item.nameSeat
          ? arrayResult.push(seat)
          : arrayResult.push({
              ...item,
              nameSeat: item.nameSeat,
              status: 1,
            });
      });
      setFirstFloor(arrayResult);
      setDataModalSeat({
        numberSeat: dataModalSeat.numberSeat + 1,
        nameSeats: [...dataModalSeat.nameSeats, item.nameSeat],
        price: route.params.price * (dataModalSeat.numberSeat + 1),
      });
    } else if (item.status === 1 && item.nameSeat.includes("A")) {
      FirstFloor.forEach((seat, index) => {
        seat.nameSeat !== item.nameSeat
          ? arrayResult.push(seat)
          : arrayResult.push({
              ...item,
              nameSeat: item.nameSeat,
              status: 0,
            });
      });
      setFirstFloor(arrayResult);
      setDataModalSeat({
        numberSeat: dataModalSeat.numberSeat - 1,
        nameSeats: [...dataModalSeat.nameSeats].filter((itemInSeats, index) => {
          return item.nameSeat !== itemInSeats;
        }),
        price: route.params.price * (dataModalSeat.numberSeat - 1),
      });
    } else if (item.status === 0 && item.nameSeat.includes("B")) {
      SecondFloor.forEach((seat, index) => {
        seat.nameSeat !== item.nameSeat
          ? arrayResult.push(seat)
          : arrayResult.push({
              ...item,
              name: item.nameSeat,
              status: 1,
            });
      });
      setSecondFloor(arrayResult);
      setDataModalSeat({
        numberSeat: dataModalSeat.numberSeat + 1,
        nameSeats: [...dataModalSeat.nameSeats, item.nameSeat],
        price: route.params.price * (dataModalSeat.numberSeat + 1),
      });
    } else if (item.status === 1 && item.nameSeat.includes("B")) {
      SecondFloor.forEach((seat, index) => {
        seat.nameSeat !== item.nameSeat
          ? arrayResult.push(seat)
          : arrayResult.push({
              ...item,
              name: item.nameSeat,
              status: 0,
            });
      });
      setSecondFloor(arrayResult);
      setDataModalSeat({
        numberSeat: dataModalSeat.numberSeat - 1,
        nameSeats: [...dataModalSeat.nameSeats].filter((itemInSeats, index) => {
          return item.nameSeat !== itemInSeats;
        }),
        price: route.params.price * (dataModalSeat.numberSeat - 1),
      });
    } else {
    }
  };
  const [FirstFloor, setFirstFloor] = useState([]);
  const [SecondFloor, setSecondFloor] = useState([]);
  // useEffect set open raw modal sheet
  useEffect(() => {
    let array,
      array1 = [];
    array = FirstFloor.find((item, index) => {
      return item.status === 1;
    });
    array1 = SecondFloor.find((item, index) => {
      return item.status === 1;
    });
    if (array || array1) {
      handleOpen();
      setShowModalSeat(true);
    } else {
      handleClose();
      setShowModalSeat(false);
    }
  }, [FirstFloor, SecondFloor]);

  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useSelector((state) => state.getLocationReducer);
  useEffect(() => {
    // getTrips(
    //   {
    //     date: formatDate(location.date),
    //     dep: parseInt(location.startPoint.split("-")[1]),
    //     des: parseInt(location.stopPoint.split("-")[1]),
    //   },
    //   setData,
    //   setLoading
    // );
    let arrayFirst = route.params.seatStatuses.slice(0, 23);
    let arraySecond = route.params.seatStatuses.slice(23, 46);
    arrayFirst.forEach((item, index) => {
      if (!arrayFirst[index].status) {
        arrayFirst[index].status = 0;
      } else {
        arrayFirst[index].status = 3;
      }
    });
    arraySecond.forEach((item, index) => {
      if (!arraySecond[index].status) {
        arraySecond[index].status = 0;
      } else {
        arraySecond[index].status = 3;
      }
    });
    // console.warn(arrayFirst);
    setFirstFloor(arrayFirst);
    setSecondFloor(arraySecond);
  }, []);

  // useEffect(() => {
  //   if (Data.length > 0) {
  //     // convert status true/false into number
  //     let arrayFirst = Data[0].seatStatuses.slice(0, 23);
  //     let arraySecond = Data[0].seatStatuses.slice(23, 46);
  //     arrayFirst.forEach((item, index) => {
  //       if (!arrayFirst[index].status) {
  //         arrayFirst[index].status = 0;
  //       } else {
  //         arrayFirst[index].status = 3;
  //       }
  //     });
  //     arraySecond.forEach((item, index) => {
  //       if (!arraySecond[index].status) {
  //         arraySecond[index].status = 0;
  //       } else {
  //         arraySecond[index].status = 3;
  //       }
  //     });
  //     // console.warn(arrayFirst);
  //     setFirstFloor(arrayFirst);
  //     setSecondFloor(arraySecond);
  //   }
  //   // console.warn(Data)
  // }, [Data]);

  // animation
  const state = {
    animation: new Animated.Value(0),
  };
  const handleOpen = () => {
    Animated.timing(state.animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const handleClose = () => {
    Animated.timing(state.animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const slideUp = {
    transform: [
      {
        translateY: state.animation.interpolate({
          inputRange: [0.01, 1],
          outputRange: [250, 0],
          extrapolate: "clamp",
        }),
      },
    ],
  };
  // useEffect(() => {
  //   console.warn(state.animation)
  // }, [state.animation])

  // function click next/prev
  const hanldeClickNextOrPrev = () => {
    if (currentStair === 1) {
      setCurrentStair(2);
    } else {
      setCurrentStair(1);
    }
  };
  return (
    <View
      style={[
        styles.backgroundBottom,
        {
          backgroundColor: "rgb(243,243,243)",
        },
      ]}
    >
      <View style={[styles.background]}>
        <Header
          whichScreen={screenName.chooseSeatScreen}
          navigation={navigation}
          item={route.params}
        />
      </View>
      {loading ? (
        <View
          style={{
            marginTop: 30,
          }}
        >
          <ActivityIndicator size="large" color={colors.blue} />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            // height:
            //   Dimensions.get("screen").height -
            //   Dimensions.get("screen").height / 5,
            // backgroundColor: "red",
            // marginBottom: heightBottomSheet,
          }}
          horizontal={false}
          nestedScrollEnabled={true}
        >
          <View
            style={{
              height: 150,
              width: (widthScreen * 85) / 100,
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <View
              style={{
                width: "50%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: "50%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    height: shapeSeatTop + 15,
                    width: shapeSeatTop,
                    backgroundColor: "transparent",
                    marginRight: marginSeat,
                    borderWidth: 1.5,
                    borderColor: colors.blue,
                    borderRadius: 6,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      height: 15,
                      width: "70%",
                      marginBottom: 6,
                      borderWidth: 1,
                      borderColor: colors.blue,
                      borderRadius: 3,
                    }}
                  ></View>
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    color: "black",
                    opacity: 0.5,
                  }}
                >
                  Empty
                </Text>
              </View>
              <View
                style={{
                  width: "100%",
                  height: "50%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    height: shapeSeatTop + 15,
                    width: shapeSeatTop,
                    // backgroundColor: "rgb(0 ,0, 0)",
                    // opacity: 0.5,
                    backgroundColor: colors.blue,
                    marginRight: marginSeat,
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    borderRadius: 6,
                  }}
                >
                  <MaterialIcons
                    name="done"
                    style={[stylesItem.icon, { fontSize: 20, marginBottom: 3 }]}
                  />
                  <View
                    style={{
                      height: 15,
                      width: "70%",
                      marginBottom: 6,
                      borderWidth: 1,
                      borderColor: "white",
                      borderRadius: 3,
                    }}
                  ></View>
                </View>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "500",
                    color: "black",
                    opacity: 0.5,
                  }}
                >
                  Selected
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "50%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: "50%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    height: shapeSeatTop + 15,
                    width: shapeSeatTop,
                    backgroundColor: "transparent",
                    marginRight: marginSeat,
                    borderRadius: 6,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    borderWidth: 1.5,
                    borderColor: colorSelecting,
                  }}
                >
                  <View
                    style={{
                      height: 15,
                      width: "70%",
                      marginBottom: 6,
                      borderWidth: 1,
                      borderColor: colorSelecting,
                      borderRadius: 4,
                    }}
                  ></View>
                </View>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "500",
                    color: "black",
                    opacity: 0.5,
                  }}
                >
                  Selecting
                </Text>
              </View>
              <View
                style={{
                  width: "100%",
                  height: "50%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    height: shapeSeatTop + 15,
                    width: shapeSeatTop,
                    backgroundColor: backgroundColorReversed,
                    marginRight: marginSeat,
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    borderRadius: 6,
                  }}
                >
                  <FontAwesome
                    name="remove"
                    style={[stylesItem.icon, { fontSize: 20, marginBottom: 3 }]}
                  />
                  <View
                    style={{
                      height: 15,
                      width: "70%",
                      marginBottom: 6,
                      borderWidth: 1,
                      borderColor: "white",
                      borderRadius: 3,
                    }}
                  ></View>
                </View>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "500",
                    color: "black",
                    opacity: 0.5,
                  }}
                >
                  Booked
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              // backgroundColor: "red",
              width: widthScreen,
            }}
          >
            <View
              style={{
                backgroundColor: "rgb(255, 255, 255)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                borderRadius: 20,
                width: (widthScreen * 85) / 100,
                // marginLeft: 20,
                // backgroundColor: "red",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  marginVertical: 20,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 15,
                    fontWeight: "600",
                    color: "black",
                    opacity: 0.5,
                    // backgroundColor: "red",
                    width: "50%",
                  }}
                >
                  {currentStair === 1 ? "DOWNSTAIR" : "UPSTAIR"}
                </Text>
                {/* <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                fontWeight: "600",
                color: "black",
                opacity: 0.5,
                // backgroundColor: "blue",
                width: "50%",
              }}
            >
              UPSTAIR
            </Text> */}
              </View>

              {currentStair === 1 ? (
                <View
                  style={{
                    // height: 500,
                    width: "100%",
                    borderRadius: 20,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "flex-end",
                    paddingVertical: 20,
                    flexWrap: "wrap",
                    // backgroundColor: "red",
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
                    <Image
                      source={require("../../assets/Image/Seat/icons8-steering-wheel-96.png")}
                      style={{
                        height: shapeWidthSeat + 5,
                        width: shapeWidthSeat + 5,
                        objectFit: "cover",
                        marginBottom: 20,
                      }}
                    />
                    {FirstFloor.slice(0, 7).map((item, index) => {
                      return (
                        <SeatItem
                          key={index}
                          item={item}
                          index={index}
                          hanldeClickSeat={hanldeClickSeat}
                        />
                      );
                    })}
                  </View>
                  <View>
                    {FirstFloor.slice(7, 8).map((item, index) => {
                      return (
                        <SeatItem
                          key={index}
                          item={item}
                          index={index}
                          hanldeClickSeat={hanldeClickSeat}
                        />
                      );
                    })}
                  </View>
                  <View>
                    {FirstFloor.slice(8, 15).map((item, index) => {
                      return (
                        <SeatItem
                          key={index}
                          item={item}
                          index={index}
                          hanldeClickSeat={hanldeClickSeat}
                        />
                      );
                    })}
                  </View>
                  <View>
                    {FirstFloor.slice(15, 16).map((item, index) => {
                      return (
                        <SeatItem
                          key={index}
                          item={item}
                          index={index}
                          hanldeClickSeat={hanldeClickSeat}
                        />
                      );
                    })}
                  </View>
                  <View>
                    {FirstFloor.slice(16, 23).map((item, index) => {
                      return (
                        <SeatItem
                          key={index}
                          item={item}
                          index={index}
                          hanldeClickSeat={hanldeClickSeat}
                        />
                      );
                    })}
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    // height: 500,
                    width: "100%",
                    borderRadius: 20,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "flex-end",
                    paddingVertical: 20,
                    flexWrap: "wrap",
                    // backgroundColor: "red",
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
                    <View
                      style={{
                        height: shapeWidthSeat,
                        width: shapeWidthSeat,
                        marginBottom: 20,
                      }}
                    ></View>
                    {SecondFloor.slice(0, 7).map((item, index) => {
                      return (
                        <SeatItem
                          key={index}
                          item={item}
                          index={index}
                          hanldeClickSeat={hanldeClickSeat}
                        />
                      );
                    })}
                  </View>
                  <View>
                    {SecondFloor.slice(7, 8).map((item, index) => {
                      return (
                        <SeatItem
                          key={index}
                          item={item}
                          index={index}
                          hanldeClickSeat={hanldeClickSeat}
                        />
                      );
                    })}
                  </View>
                  <View>
                    {SecondFloor.slice(8, 15).map((item, index) => {
                      return (
                        <SeatItem
                          key={index}
                          item={item}
                          index={index}
                          hanldeClickSeat={hanldeClickSeat}
                        />
                      );
                    })}
                  </View>
                  <View>
                    {SecondFloor.slice(15, 16).map((item, index) => {
                      return (
                        <SeatItem
                          key={index}
                          item={item}
                          index={index}
                          hanldeClickSeat={hanldeClickSeat}
                        />
                      );
                    })}
                  </View>
                  <View>
                    {SecondFloor.slice(16, 23).map((item, index) => {
                      return (
                        <SeatItem
                          key={index}
                          item={item}
                          index={index}
                          hanldeClickSeat={hanldeClickSeat}
                        />
                      );
                    })}
                  </View>
                </View>
              )}
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                // backgroundColor: "red",
                width: "100%",
                height: 50,
                marginBottom: 100,
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  hanldeClickNextOrPrev();
                }}
              >
                <Entyto
                  name="chevron-small-up"
                  style={{
                    fontSize: 40,
                    transform: [{ rotate: "270deg" }],
                  }}
                />
              </TouchableOpacity>
              <View
                style={{
                  // transform: [{ rotate: "90deg" }],
                  backgroundColor: colors.blue,
                  borderRadius: 20,
                  paddingHorizontal: 25,
                  paddingVertical: 10,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                  }}
                >
                  {currentStair === 1 ? "DOWNSTAIR" : "UPSTAIR"}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  hanldeClickNextOrPrev();
                }}
              >
                <Entyto
                  name="chevron-small-down"
                  style={{
                    fontSize: 40,
                    transform: [{ rotate: "270deg" }],
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
      {dataModalSeat.nameSeats.length > 0 ? (
        <ModalSeatSelected
          showModalSeat={showModalSeat}
          heightBottomSheet={heightBottomSheet}
          dataModalSeat={dataModalSeat}
          navigation={navigation}
          route={route}
        />
      ) : (
        <></>
      )}
    </View>
  );
};

export default ChooseSeat;
