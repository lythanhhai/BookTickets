import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import Icon from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import { useEffect } from "react";

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

const CardRecent = ({ item }) => {
  const tailwind = useTailwind();
  // const [Data, setData] = useState([]);
  // const [DataFilter, setDataFilter] = useState([]);
  // const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   // setShowChangeModal(false)
  //   getTrips(
  //     {
  //       date: formatDate(location.date),
  //       dep: parseInt(location.startPoint.split("-")[1]),
  //       des: parseInt(location.stopPoint.split("-")[1]),
  //     },
  //     setData,
  //     setLoading,
  //     setDataFilter
  //   );
  // }, []);

  return (
    <TouchableOpacity
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginTop: 10,
        width: Dimensions.get("screen").width / 2,
        height: 90,
        backgroundColor: "white",
        paddingVertical: 8,

        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 4,

        borderRadius: 8,
        marginRight: 10,
        marginBottom: 10,
      }}
      onPress={() => {}}
    >
      <View
        style={{
          width: 120,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <FontAwesome
            size={18}
            color="black"
            name="dot-circle-o"
            style={{
              marginHorizontal: 10,
              fontSize: 13,
              color: "rgb(35,115,228)",
            }}
          />
          <Text
            style={{
              color: "black",
              // position: "absolute",
              // top: -1,
              fontSize: 12,
              fontWeight: "bold",
            }}
          >
            {item.departLocation.split("-")[0]}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <FontAwesome
            size={18}
            color="black"
            name="dot-circle-o"
            style={{
              marginHorizontal: 10,
              fontSize: 13,
              color: "red",
            }}
          />
          <Text
            style={{
              color: "black",
              // position: "absolute",
              // top: 30,
              fontSize: 12,
              fontWeight: "bold",
            }}
          >
            {item.arriveLocation.split("-")[0]}
          </Text>
        </View>
        <Text
          style={{
            color: "rgb(110, 110, 110)",
            fontSize: 10,
            paddingLeft: 32,
          }}
        >
          {item.date}
        </Text>
      </View>
      <Icon
        size={18}
        name="arrowright"
        style={{
          fontSize: 18,
          color: "black",
          position: "absolute",
          top: 10,
          right: 15,
        }}
      />
    </TouchableOpacity>
  );
};

export default CardRecent;
