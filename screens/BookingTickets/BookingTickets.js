import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { useState } from "react";
import Header from "../../components/Header/Header";
import SearchFrame from "../../components/BookingTickets/SearchFrame";
import { registerTranslation } from "react-native-paper-dates";
import CardRecent from "../../components/BookingTickets/CardRecent";
import Data from "../../constants/virtualDataRecent";

const styles = StyleSheet.create({
  background: {
    backgroundColor: "rgb(35,115,228)",
    height: Dimensions.get("screen").height / 3.4,
    width: Dimensions.get("screen").width,
    display: "flex",
    // flexDirection: "column",
    // justifyContent: "center",
    paddingLeft: Dimensions.get("screen").width / 21,
    // borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
  backgroundBottom: {
    backgroundColor: "rgb(246,246,246)",
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    display: "flex",
    // position: "absolute",
    // top: Dimensions.get("screen").height / 3.5,
    // left: 0,
  },
});

const BookingTickets = ({ navigation }) => {
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
  return (
    <View style={styles.backgroundBottom}>
      <View style={[styles.background]}>
        <Header whichScreen={1} navigation={navigation} />
        <View style={[{ paddingTop: 10 }]}>
          <Text style={[{ color: "white", fontSize: 25, fontWeight: "500" }]}>
            Hi you,
          </Text>
          <Text style={[{ color: "white", fontSize: 14 }]}>
            Where do you want to go today?
          </Text>
        </View>
        <SearchFrame />
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

        {/* <CardRecent item={{ departLocation: "haha" }} /> */}
      </View>
    </View>
  );
};

export default BookingTickets;
