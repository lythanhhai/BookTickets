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
import { useState } from "react";
import Entypo from "react-native-vector-icons/Entypo";
import colors from "../../constants/colors";
import { TextInput } from "react-native-paper";
import Octicons from "react-native-vector-icons/Octicons";
import axios from "axios";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getTokenAferAuthen } from "../../utils/getJWT";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../redux/actions/authenAction";

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
  var User = useSelector((state) => state.authenReducer);
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
      iconEndYetLogin: (
        <Entypo
          name="lock"
          color={colors.blue}
          style={{
            fontSize: 20,
            color: "black",
            paddingRight: 70,
          }}
        />
      ),
      iconEndLogged: (
        <MaterialIcons
          name="navigate-next"
          style={{
            fontSize: 20,
            color: "black",
            paddingRight: 70,
          }}
        />
      ),
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
      iconEndYetLogin: (
        <Entypo
          name="lock"
          color={colors.blue}
          style={{
            fontSize: 20,
            color: "black",
            paddingRight: 70,
          }}
        />
      ),
      iconEndLogged: (
        <MaterialIcons
          name="navigate-next"
          style={{
            fontSize: 20,
            color: "black",
            paddingRight: 70,
          }}
        />
      ),
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
      iconEndYetLogin: (
        <Entypo
          name="lock"
          color={colors.blue}
          style={{
            fontSize: 20,
            color: "black",
            paddingRight: 70,
          }}
        />
      ),
      iconEndLogged: (
        <MaterialIcons
          name="navigate-next"
          style={{
            fontSize: 20,
            color: "black",
            paddingRight: 70,
          }}
        />
      ),
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
  const dispatch = useDispatch();

  const handleLogout = async () => {
    // var User = await getTokenAferAuthen()
    // if(User)
    // {
    //   await AsyncStorage.removeItem("User")
    //   console.warn(User)
    // }
    // else
    // {
    //   console.warn(User)
    // }
    // console.warn(User);
    dispatch(
      logoutAction({
        userId: null,
        username: "",
        accessToken: "",
        tokenType: "",
      })
    );
  };
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
        horizontal={false}
        renderItem={({ item }) => {
          if (!User.accessToken && item.title === "Log out") {
            return <></>;
          } else {
            return (
              <TouchableOpacity
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginTop: 7,
                  height: Dimensions.get("screen").height / 13,
                  // width: Dimensions.get("screen").width,
                }}
                onPress={() => {
                  handleLogout();
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
                    width: Dimensions.get("screen").width / 1.15,
                    borderBottomColor: "rgb(210, 210, 210)",
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                    height: "100%",
                    // backgroundColor: "red"
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      // backgroundColor: "black",
                      width: "90%",
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
                  {User.accessToken ? item.iconEndLogged : item.iconEndYetLogin}
                </View>
              </TouchableOpacity>
            );
          }
        }}
      ></FlatList>
    </View>
  );
};

export default MenuFunction;
