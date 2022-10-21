import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SectionList,
} from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
  useMemo,
} from "react";
import Header from "../../components/Header/Header";
import SearchFrame from "../../components/BookingTickets/SearchFrame";
import { registerTranslation } from "react-native-paper-dates";
import data from "../../constants/virtualDataRecent";
import Icon from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import colors from "../../constants/colors";
import { TextInput } from "react-native-paper";
import Octicons from "react-native-vector-icons/Octicons";
import axios from "axios";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";

const styles = StyleSheet.create({
  background: {
    backgroundColor: "rgb(35,115,228)",
    height: Dimensions.get("screen").height / 3.4,
    width: Dimensions.get("screen").width,
    display: "flex",
    paddingLeft: Dimensions.get("screen").width / 21,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
});
const MenuFunction = ({ item, navigation, route }) => {
  const tailwind = useTailwind();
  const [Data, setData] = useState([
    {
      icon: (
        <EvilIcons
          name="star"
          color={colors.blue}
          style={{
            fontSize: 22,
            paddingHorizontal: 15,
            paddingBottom: 10,
          }}
        />
      ),
      title: "My reward points",
      desc: "Collect reward points to exchange facinating vouchers",
    },
    {
      icon: (
        <MaterialIcons
          name="card-giftcard"
          color={colors.blue}
          style={{
            fontSize: 22,
            paddingHorizontal: 15,
            paddingBottom: 10,
          }}
        />
      ),
      title: "Vouchers",
      desc: "See list of voucher which spend on you",
    },
    {
      icon: (
        <MaterialCommunityIcons
          name="image-auto-adjust"
          color={colors.blue}
          style={{
            fontSize: 22,
            paddingHorizontal: 15,
            paddingBottom: 10,
          }}
        />
      ),
      title: "Rate for trip",
      desc: "Share your feeling about trip to receive reward points",
    },
    {
      icon: (
        <AntDesign
          name="logout"
          color={colors.blue}
          style={{
            fontSize: 22,
            paddingHorizontal: 15,
            paddingBottom: 10,
          }}
        />
      ),
      title: "Log out",
      desc: "",
    },
  ]);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundColor: "transparent",
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
        backgroundColor: "transparent",
        // height: 3000,
        // marginTop: Dimensions.get("screen").height / 8.5,
      }}
    >
      <FlatList
        data={Data}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                paddingTop: 15,
                // width: Dimensions.get("screen").width,
              }}
            >
              {item.icon}
              {/* <AntDesign name="logout" /> */}
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: Dimensions.get("screen").width / 1,
                  borderBottomColor: "rgb(210, 210, 210)",
                  borderBottomWidth: 1,
                  borderBottomColor: "rgb(210, 210, 210)",
                  borderBottomWidth: 1,
                  paddingBottom: 10,
                }}
              >
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
                      fontWeight: "400",
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                    }}
                  >
                    {item.desc}
                  </Text>
                </View>
                <MaterialIcons
                  name="navigate-next"
                  style={{
                    fontSize: 20,
                    color: "black",
                    paddingRight: 70,
                  }}
                />
              </View>
            </TouchableOpacity>
          );
        }}
      ></FlatList>
    </View>
  );
};

export default MenuFunction;
