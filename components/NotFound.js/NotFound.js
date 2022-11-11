import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import { useTailwind } from "tailwind-rn/dist";
import colors from "../../constants/colors";
import { formatDate } from "../../utils/formatDate";

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

const NotFound = ({ item }) => {
  const tailwind = useTailwind();
  const location = useSelector((state) => state.getLocationReducer);
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        height: Dimensions.get("screen").height / 1.3,
      }}
    >
      <Image
        source={require("../../assets/Image/not-found.png")}
        style={{
          objectFit: "cover",
          resizeMode: "contain",
          height: 100,
          width: 100,
          marginBottom: 15,
        }}
      />
      <View
        style={{
          height: 9,
          width: 14,
          backgroundColor: "rgb(200, 200, 250)",
          marginBottom: 20,
          borderRadius: 50,
          transform: [{ scaleX: 3 }],
        }}
      ></View>
      {/* <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 6 }}>
          You have no notificatons yet
        </Text> */}
      <Text
        style={{
          marginBottom: 15,
          textAlign: "center",
          width: Dimensions.get("screen").width / 1.3,
          fontSize: 16,
          fontWeight: "600",
        }}
      >
        No result found from your search {"("} From{" "}
        <Text
          style={{
            color: colors.blue,
          }}
        >
          {location.startPoint.split("-")[0]}
        </Text>{" "}
        To{" "}
        <Text
          style={{
            color: colors.blue,
          }}
        >
          {location.stopPoint.split("-")[0]}
        </Text>{" "}
        In{" "}
        <Text
          style={{
            color: colors.blue,
          }}
        >
          {formatDate(location.date)}
        </Text>{" "}
        {")"}
      </Text>
    </View>
  );
};

export default NotFound;
