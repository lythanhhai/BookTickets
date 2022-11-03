import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  VirtualizedList,
  Animated,
  Alert,
} from "react-native";
import React from "react";
import styleGlobal from "../../constants/styleGlobal";
import Header from "../../components/Header/Header";
import { FlatList } from "react-native-gesture-handler";
import { floor1, floor2 } from "../../constants/DataSeat";
import colors from "../../constants/colors";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState, useEffect } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { useRef } from "react";
import ModalSeatSelected from "../../components/Modal/ModalSeatSelected";
import { number } from "yup";
// import { ScrollView } from 'react-native-virtualized-view'

const widthScreen = Dimensions.get("screen").width;
const heightScreen = Dimensions.get("screen").height;
const shapeHeightSeat = 70;
const shapeWidthSeat = 50;
const shapeSeatTop = 35;
const marginSeat = 10;
const backgroundColorReversed = "rgb(210,210,210)";
const heightBottomSheet = 200;
const colorSelecting = "rgb(255, 173, 190)";
const colorIcon = "rgb(250, 250, 250)";
const styles = StyleSheet.create(styleGlobal);
const stylesItem = StyleSheet.create({
  icon: {
    fontSize: 32,
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

const ChooseSeat = ({ navigation, route }) => {
  const RBSheetRef = useRef();
  // choose seat
  const [showModalSeat, setShowModalSeat] = useState(false);
  const [dataModalSeat, setDataModalSeat] = useState({
    numberSeat: 0,
    nameSeats: [],
    price: 0,
  });

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
    if (item.status === 0 && item.name.slice(1, item.name.length - 1) === "1") {
      FirstFloor.forEach((seat, index) => {
        seat.name !== item.name
          ? arrayResult.push(seat)
          : arrayResult.push({
              ...item,
              name: item.name,
              status: 1,
            });
      });
      setFirstFloor(arrayResult);
      setDataModalSeat({
        numberSeat: dataModalSeat.numberSeat + 1,
        nameSeats: [...dataModalSeat.nameSeats, item.name],
        price: dataModalSeat.price + item.price,
      });
    } else if (
      item.status === 1 &&
      item.name.slice(1, item.name.length - 1) === "1"
    ) {
      FirstFloor.forEach((seat, index) => {
        seat.name !== item.name
          ? arrayResult.push(seat)
          : arrayResult.push({
              ...item,
              name: item.name,
              status: 0,
            });
      });
      setFirstFloor(arrayResult);
      setDataModalSeat({
        numberSeat: dataModalSeat.numberSeat - 1,
        nameSeats: [...dataModalSeat.nameSeats].filter((itemInSeats, index) => {
          return item.name !== itemInSeats;
        }),
        price: parseInt(dataModalSeat.price - item.price),
      });
    } else if (
      item.status === 0 &&
      item.name.slice(1, item.name.length - 1) === "2"
    ) {
      SecondFloor.forEach((seat, index) => {
        seat.name !== item.name
          ? arrayResult.push(seat)
          : arrayResult.push({
              ...item,
              name: item.name,
              status: 1,
            });
      });
      setSecondFloor(arrayResult);
      setDataModalSeat({
        numberSeat: dataModalSeat.numberSeat + 1,
        nameSeats: [...dataModalSeat.nameSeats, item.name],
        price: dataModalSeat.price + item.price,
      });
    } else if (
      item.status === 1 &&
      item.name.slice(1, item.name.length - 1) === "2"
    ) {
      SecondFloor.forEach((seat, index) => {
        seat.name !== item.name
          ? arrayResult.push(seat)
          : arrayResult.push({
              ...item,
              name: item.name,
              status: 0,
            });
      });
      setSecondFloor(arrayResult);
      setDataModalSeat({
        numberSeat: dataModalSeat.numberSeat - 1,
        nameSeats: [...dataModalSeat.nameSeats].filter((itemInSeats, index) => {
          return item.name !== itemInSeats;
        }),
        price: dataModalSeat.price - item.price,
      });
    } else {
    }
  };
  const [FirstFloor, setFirstFloor] = useState(floor1);
  const [SecondFloor, setSecondFloor] = useState(floor2);
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
      // RBSheetRef.current.open();
      handleOpen();
      setShowModalSeat(true);
    } else {
      // RBSheetRef.current.close();
      handleClose();
      setShowModalSeat(false);
    }
    // console.warn(dataModalSeat);
    // console.warn(typeof dataModalSeat.price);
  }, [FirstFloor, SecondFloor]);

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
  // const backdrop = {
  //   transform: [
  //     {
  //       translateY: state.animation.interpolate({
  //         inputRange: [0, 0.01],
  //         outputRange: [Dimensions.get("screen").height, 0],
  //         extrapolate: "clamp",
  //       }),
  //     },
  //   ],
  //   opacity: state.animation.interpolate({
  //     inputRange: [0.01, 0.5],
  //     outputRange: [0, 1],
  //     extrapolate: "clamp",
  //   }),
  // };
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
        <Header whichScreen={"ChooseSeat"} navigation={navigation} />
      </View>
      <ScrollView
        contentContainerStyle={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          // height:
          //   Dimensions.get("screen").height -
          //   Dimensions.get("screen").height / 8.5,
          // backgroundColor: "red",
          // marginBottom: heightBottomSheet,
        }}
        horizontal={false}
        nestedScrollEnabled={true}
      >
        <View
          style={{
            height: 150,
            width: widthScreen,
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
              paddingLeft: marginSeat * 2,
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
                  borderRadius: 7,
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
                    borderRadius: 5,
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
                  borderRadius: 7,
                }}
              >
                <MaterialIcons
                  name="done"
                  style={[stylesItem.icon, { fontSize: 22, marginBottom: 5 }]}
                />
                <View
                  style={{
                    height: 15,
                    width: "70%",
                    marginBottom: 6,
                    borderWidth: 1,
                    borderColor: "white",
                    borderRadius: 5,
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
                  borderRadius: 7,
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
                    borderRadius: 5,
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
                  borderRadius: 7,
                }}
              >
                <FontAwesome
                  name="remove"
                  style={[stylesItem.icon, { fontSize: 22, marginBottom: 5 }]}
                />
                <View
                  style={{
                    height: 15,
                    width: "70%",
                    marginBottom: 6,
                    borderWidth: 1,
                    borderColor: "white",
                    borderRadius: 5,
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
            backgroundColor: "rgb(255, 255, 255)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            borderRadius: 20,
            width: (widthScreen * 90) / 100,
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
              DOWNSTAIR
            </Text>
            <Text
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
            </Text>
          </View>
          <Image
            source={require("../../assets/Image/Seat/icons8-steering-wheel-96.png")}
            style={{
              height: shapeWidthSeat,
              width: shapeWidthSeat,
              objectFit: "cover",
              // alignSelf: "center",
              marginLeft: marginSeat * 3,
            }}
          />
          <View
            style={{
              // height: 500,
              width: "100%",
              borderRadius: 20,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              // alignItems: "center"
              paddingVertical: 20,
              flexWrap: "wrap",
            }}
          >
            {/* {floor1.map((item, index) => {
              return (
                <TouchableOpacity
                  style={{
                    height: shapeSeat,
                    width: shapeSeat,
                    // backgroundColor:
                    //   item.status === 0
                    //     ? "red"
                    //     : item.status === 1
                    //     ? "green"
                    //     : item.status === 2
                    //     ? "blue"
                    //     : "yellow",
                    margin: marginSeat,
                    borderColor:
                      item.status === 0 ? colors.blue : "transparent",
                    backgroundColor:
                      item.status === 1
                        ? colors.blue
                        : item.status === 2 || item.status === 3
                        ? backgroundColorReversed
                        : "transparent",
                    borderWidth: 1.5,
                    borderRadius: 10,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    hanldeClickSeat();
                  }}
                  disabled={
                    item.status === 2 ? true : item.status === 3 ? true : false
                  }
                >
                  {item.status === 2 ? (
                    <MaterialIcons name="done" style={stylesItem.icon} />
                  ) : item.status === 3 ? (
                    <Ionicons
                      name="ios-remove-outline"
                      style={stylesItem.icon}
                    />
                  ) : (
                    ""
                  )}
                </TouchableOpacity>
              );
            })} */}
            <FlatList
              data={FirstFloor}
              horizontal={false}
              numColumns={2}
              contentContainerStyle={{ alignSelf: "center" }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={{
                      height: shapeHeightSeat,
                      width: shapeWidthSeat,
                      // backgroundColor:
                      //   item.status === 0
                      //     ? "red"
                      //     : item.status === 1
                      //     ? "green"
                      //     : item.status === 2
                      //     ? "blue"
                      //     : "yellow",
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
                      borderRadius: 10,
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
              }}
            />
            <View
              style={{
                height:
                  shapeHeightSeat * (FirstFloor.length / 2) +
                  marginSeat * ((FirstFloor.length / 2 - 1) * 2),
                width: 2,
                backgroundColor: "rgb(0, 0, 0)",
                opacity: 0.3,
                //   margin: marginSeat,
                marginTop: marginSeat,
              }}
            ></View>
            <FlatList
              data={SecondFloor}
              horizontal={false}
              numColumns={2}
              contentContainerStyle={{ alignSelf: "center" }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={{
                      height: shapeHeightSeat,
                      width: shapeWidthSeat,
                      // backgroundColor:
                      //   item.status === 0
                      //     ? "red"
                      //     : item.status === 1
                      //     ? "green"
                      //     : item.status === 2
                      //     ? "blue"
                      //     : "yellow",
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
                      borderRadius: 10,
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
              }}
            />
          </View>
        </View>
        <RBSheet
          ref={RBSheetRef}
          height={250}
          openDuration={200}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              // backgroundColor: "transparent"
            },
            draggableIcon: {
              backgroundColor: "#000",
            },
          }}
        >
          <ModalSeatSelected />
        </RBSheet>
      </ScrollView>

      <ModalSeatSelected
        showModalSeat={showModalSeat}
        heightBottomSheet={heightBottomSheet}
        dataModalSeat={dataModalSeat}
      />

      {/* <Animated.View
        style={[StyleSheet.absoluteFill, stylesAnimation.cover, backdrop]}
      /> */}
      {/* <View style={[stylesAnimation.sheet]}>
      </View> */}
      {/* <Animated.View style={[stylesAnimation.popup, slideUp]}>
        <TouchableOpacity onPress={handleClose}>
          <Text>Close</Text>
        </TouchableOpacity>
      </Animated.View> */}
    </View>
  );
};

export default ChooseSeat;
