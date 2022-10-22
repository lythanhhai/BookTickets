import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import SearchFrame from "../../components/BookingTickets/SearchFrame";
import { registerTranslation } from "react-native-paper-dates";
import CardRecent from "../../components/BookingTickets/CardRecent";
import Data from "../../constants/virtualDataRecent";
import colors from "../../constants/colors";
import CardRoute from "../../components/BookingTickets/CardRoute";

const styles = StyleSheet.create({
  background: {
    backgroundColor: "rgb(35,115,228)",
    height: Dimensions.get("screen").height / 3.4,
    width: Dimensions.get("screen").width,
    display: "flex",
    // flexDirection: "column",
    // justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
    paddingLeft: Dimensions.get("screen").width / 21,
    // borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
  backgroundBottom: {
    backgroundColor: "rgb(246, 246, 246)",
    width: Dimensions.get("screen").width,
    // height: 2000,
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "center",
    // position: "relative",
    // top: 0,
    // left: 0,
  },
});

const BookingTickets = ({ navigation, route }) => {
  const tailwind = useTailwind();
  const [list, setList] = useState([
    {
      departLocation: "Da Nang",
      arriveLocation: "Quang Tri",
      date: "19/10/2022",
    },
    {
      departLocation: "Da Nang",
      arriveLocation: "Quang Tri",
      date: "19/10/2022",
    },
    {
      departLocation: "Da Nang",
      arriveLocation: "Quang Tri",
      date: "19/10/2022",
    },
    {
      departLocation: "Da Nang",
      arriveLocation: "Quang Tri",
      date: "19/10/2022",
    },
    {
      departLocation: "Da Nang",
      arriveLocation: "Quang Tri",
      date: "19/10/2022",
    },
  ]);
  // useEffect(() => {
  //   console.warn(route.params);
  // });
  return (
    <ScrollView
      style={styles.backgroundBottom}
      contentContainerStyle={{
        display: "flex",
        flexDirection: "column",
        paddingLeft: 20,
      }}
    >
      <View style={[styles.background]}></View>
      <Header whichScreen={1} navigation={navigation} />
      <View style={[{ paddingTop: 10 }]}>
        <Text style={[{ color: "white", fontSize: 25, fontWeight: "500" }]}>
          Hi you,
        </Text>
        <Text style={[{ color: "white", fontSize: 14 }]}>
          Where do you want to go today?
        </Text>
      </View>
      <SearchFrame navigation={navigation} route={route} />
      <View
        style={{
          marginTop: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 17,
            fontWeight: "600",
          }}
        >
          Recent searches
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              fontSize: 13,
              color: "rgb(35,115,238)",
              marginRight: 20,
            }}
          >
            Remove all
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: "auto",
          backgroundColor: "transparent",
          paddingTop: 8,
          paddingBottom: 15,
          marginBottom: 10,
        }}
      >
        <FlatList
          data={Data}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <CardRecent item={item} />}
        ></FlatList>
      </View>

      <View
        style={{
          marginTop: 0,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 17,
            fontWeight: "600",
          }}
        >
          Popular routes
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              fontSize: 13,
              color: "rgb(35,115,238)",
              marginRight: 20,
            }}
          >
            {/* Remove all */}
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          // height: "auto",
          backgroundColor: "transparent",
          paddingTop: 8,
          // paddingBottom: 15,
          marginBottom: 10,
        }}
      >
        <FlatList
          data={Data}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <CardRoute item={item} />}
        ></FlatList>
      </View>

      {/* <CardRecent item={{ departLocation: "haha" }} /> */}
      {/* </View> */}
    </ScrollView>
  );
};

export default BookingTickets;
