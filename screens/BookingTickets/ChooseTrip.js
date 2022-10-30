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
import { registerTranslation } from "react-native-paper-dates";
import CardRecent from "../../components/BookingTickets/CardRecent";
import Data from "../../constants/virtualDataRecent";
import colors from "../../constants/colors";
import Ticket from "../../components/MyTickets/Ticket";

import styleGlobal from "../../constants/styleGlobal";
import RequireLogin from "../../components/MyTickets/RequireLogin";
import Logged from "../../components/MyTickets/Logged";
import SearchLocation from "../../components/BookingTickets/SearchLocation";
import CardTrip from "../../components/BookingTickets/CardTrip";
import { useEffect } from "react";

const styles = StyleSheet.create(styleGlobal);

const ChooseTrip = ({ navigation, route }) => {
  const tailwind = useTailwind();
  const [Data, setData] = useState([1, 2, 3, 4, 5, 6]);
  const [showChangeModal, setShowChangeModal] = useState(
    route.params.showModal
  );
  // useEffect(() => {
  //   setShowChangeModal(false)
  // }, [route.params.showModal])
  return (
    <View style={styles.backgroundBottom}>
      <View style={[styles.background]}>
        <Header
          whichScreen={"ChooseTrip"}
          navigation={navigation}
          titleElement={route.params}
          setShowChangeModal={setShowChangeModal}
          showChangeModal={showChangeModal}
        />

        {/* <CardTrip /> */}

        {/* <View
          style={[
            tailwind(""),
            {
              height:
                Dimensions.get("screen").height -
                Dimensions.get("screen").height / 8.5,
              width: Dimensions.get("screen").width,
              // backgroundColor: "red",
              // flex: 1,
              // justifyContent: "center",
              // alignItems: "center",
              // flex: 1,
              // flexGrow: 1,
            },
          ]}
        >
          <FlatList
            data={Data}
            horizontal={true}
            showsVerticalScrollIndicator={true}
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
              return <CardTrip />;
            }}
          />
        </View> */}

        {/* <ScrollView
          style={{
            backgroundColor: "red",
            height:
              Dimensions.get("screen").height -
              Dimensions.get("screen").height / 8.5,
            width: Dimensions.get("screen").width,
            display: "flex",
            flexDirection: "column",
          }}
          contentContainerStyle={{
            backgroundColor: "red",
            // height:
            //   Dimensions.get("screen").height -
            //   Dimensions.get("screen").height / 8.5,
            // width: Dimensions.get("screen").width,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {Data.map((item, index) => {
            return <CardTrip key={index} />;
          })}
        </ScrollView> */}
      </View>
      <View
        style={[
          tailwind("flex flex-col justify-start items-center"),
          {
            height:
              Dimensions.get("screen").height -
              Dimensions.get("screen").height / 8.5,
            width: Dimensions.get("screen").width,
          },
        ]}
      >
        <FlatList
          data={Data}
          horizontal={false}
          showsVerticalScrollIndicator={false}
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
            return <CardTrip item={item} />;
          }}
        ></FlatList>
      </View>
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
            zIndex: 1,
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
    </View>
  );
};

export default ChooseTrip;
