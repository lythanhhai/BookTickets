import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import SearchFrame from "../../components/BookingTickets/SearchFrame";
import CardRecent from "../../components/BookingTickets/CardRecent";
import Data from "../../constants/virtualDataRecent";
import colors from "../../constants/colors";
import CardRoute from "../../components/BookingTickets/CardRoute";
import { useSelector } from "react-redux";
import * as screenName from "../../constants/nameScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { async } from "@firebase/util";

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
  },
});

const BookingTickets = ({ navigation, route }) => {
  const tailwind = useTailwind();
  // const [list, setList] = useState([...Data]);
  const [list, setList] = useState([
    // {
    //   image:
    //     "https://storage.googleapis.com/vex-config/cms-tool/destination/images/25/img_hero.png",
    //   departLocation: "Đà Nẵng",
    //   arriveLocation: "Quảng Trị",
    //   date: "2022-10-19",
    //   price: "150.000vnd",
    //   originalPrice: "300.000vnd",
    // },
  ]);
  const [checkClickSearch, setCheckClickSearch] = useState(false);

  const location = useSelector((state) => state.getLocationReducer);
  const SaveRecentSearch = async (data) => {
    await AsyncStorage.setItem("ListRecentSearch", JSON.stringify(data));
  };
  const getRecentSearch = async () => {
    try {
      const data = await AsyncStorage.getItem("ListRecentSearch");
      const list = JSON.parse(data);
      if (!list) {
        return [];
      } else {
        return list;
      }
    } catch (err) {
      console.warn(err);
      return null;
    }
  };
  useEffect(() => {
    //   console.warn(route.params);
    // setList(getRecentSearch());
    getRecentSearch()
      .then((data) => {
        // console.log(data);
        setList(data);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);
  useEffect(() => {
    if (checkClickSearch) {
      if (list.length === 5) {
        var fourItem = [...list].slice(0, [...list].length - 1);
        setList([
          {
            departLocation: location.startPoint,
            arriveLocation: location.stopPoint,
            date: location.date,
          },
          ...fourItem,
        ]);
        SaveRecentSearch([
          {
            departLocation: location.startPoint,
            arriveLocation: location.stopPoint,
            date: location.date,
          },
          ...fourItem,
        ]);
      } else {
        setList([
          {
            departLocation: location.startPoint,
            arriveLocation: location.stopPoint,
            date: location.date,
          },
          ...list,
        ]);
        SaveRecentSearch([
          {
            departLocation: location.startPoint,
            arriveLocation: location.stopPoint,
            date: location.date,
          },
          ...list,
        ]);
      }
    }
    return setCheckClickSearch(false);
  }, [checkClickSearch]);
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
      <Header
        whichScreen={screenName.tabBookTicketScreen}
        navigation={navigation}
      />
      <View style={[{ paddingTop: 10 }]}>
        <Text style={[{ color: "white", fontSize: 25, fontWeight: "500" }]}>
          Hi you,
        </Text>
        <Text style={[{ color: "white", fontSize: 14 }]}>
          Where do you want to go today?
        </Text>
      </View>
      <SearchFrame
        navigation={navigation}
        route={route}
        setCheckClickSearch={setCheckClickSearch}
        screen={"Home"}
      />
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
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate("Profile");
            // Linking.openURL("https://mailchimp.com/landers/templates/?gclid=Cj0KCQiA4OybBhCzARIsAIcfn9k1Cbj7UNGk9U1Z4xYgA9wDWT03-q0lAfd4bEyDb8zQVmtvBim7qRcaAgn3EALw_wcB&gclsrc=aw.ds")
          }}
        >
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
          data={list}
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
