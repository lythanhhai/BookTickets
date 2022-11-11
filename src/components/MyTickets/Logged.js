import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useTailwind } from "tailwind-rn/dist";

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

const Logged = ({ item }) => {
  const tailwind = useTailwind();

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        height: Dimensions.get("screen").height / 1.5,
      }}
    >
      <Image
        source={require("../../../assets/Image/ticket.png")}
        style={{
          objectFit: "cover",
          resizeMode: "contain",
          height: 75,
          width: 75,
          marginBottom: 5,
        }}
      />
      <View
        style={{
          height: 8,
          width: 11,
          backgroundColor: "rgb(220, 220, 220)",
          marginBottom: 15,
          borderRadius: 50,
          transform: [{ scaleX: 3 }],
        }}
      ></View>
      <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 7 }}>
        You have no tickets yet
      </Text>
      <Text
        style={{
          marginBottom: 15,
          textAlign: "center",
          width: Dimensions.get("screen").width / 1.3,
        }}
      >
        Try pulling down to update the booking list for the last 3 months
      </Text>
    </View>
  );
};

export default Logged;
