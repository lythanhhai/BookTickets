import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { useState } from "react";
import Header from "../../components/Header/Header";
import SearchFrame from "../../components/BookingTickets/SearchFrame";
import colors from "../../constants/colors";

import styleGlobal from "../../constants/styleGlobal";
import CardTrip from "../../components/BookingTickets/CardTrip";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as screenName from "../../constants/nameScreen";
import RBSheet from "react-native-raw-bottom-sheet";
import { useRef } from "react";
import ModalTrip from "../../components/Modal/ModalTrip";

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
  const [Data, setData] = useState([1, 2, 3, 4, 5, 6]);
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [showModalFilter, setShowModalFilter] = useState(false);
  const RBSheetRefTrip = useRef();
  // useEffect(() => {
  //   setShowChangeModal(false)
  // }, [route.params.showModal])
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
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tailwind(
          "flex flex-row justify-start items-center"
        )}
        style={[
          // tailwind("flex flex-row justify-start items-center"),
          {
            // height: Dimensions.get("screen").height / 20,
            width: Dimensions.get("screen").width,
            height: 100,
            backgroundColor: "white",
            // paddingVertical: 5,
          },
        ]}
      >
        <TouchableOpacity style={stylesFilter.touchableFirst}>
          <Ionicons name="filter" style={stylesFilter.icon}></Ionicons>
          <Text style={stylesFilter.text}>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={stylesFilter.touchable}
          onPress={() => {
            // setShowModalFilter(true);
          }}
        >
          <Ionicons name="time-outline" style={stylesFilter.icon}></Ionicons>
          <Text style={stylesFilter.text}>Time</Text>
        </TouchableOpacity>
        <TouchableOpacity style={stylesFilter.touchable}>
          <Ionicons
            name="pricetag-outline"
            style={stylesFilter.icon}
          ></Ionicons>
          <Text style={stylesFilter.text}>Price</Text>
        </TouchableOpacity>
        <TouchableOpacity style={stylesFilter.touchable}>
          <Ionicons name="star-outline" style={stylesFilter.icon}></Ionicons>
          <Text style={stylesFilter.text}>Rating</Text>
        </TouchableOpacity>
      </ScrollView>
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
          data={Data}
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
              />
            );
          }}
        ></FlatList>
      </View>
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
        <ModalTrip navigation={navigation} route={route} RBSheetRefTrip={RBSheetRefTrip}/>
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
