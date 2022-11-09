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
import { colorRoute } from "../../constants/colorsRoute";

const styles = StyleSheet.create({
  background: {
    backgroundColor: "rgb(35,115,228)",
    height: Dimensions.get("screen").height / 3.4,
    width: Dimensions.get("screen").width,
    display: "flex",
    // flexDirection: "column",
    // justifyContent: "center",
    paddingLeft: Dimensions.get("screen").width / 21,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
});

const CardRoute = ({ item }) => {
  const tailwind = useTailwind();
  // console.warn(Object.keys(colorRoute)[Math.floor(Math.random()*Object.keys(colorRoute).length)])
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginTop: 10,
        width: Dimensions.get("screen").width / 3,
        backgroundColor: "white",
        // paddingVertical: 8,

        shadowColor: "#000",
        shadowOffset: {
          width: 2,
          height: 1,
        },
        shadowOpacity: 0.35,
        shadowRadius: 5,

        elevation: 6,

        borderRadius: 8,
        marginRight: 10,
        marginBottom: 10,
        backgroundColor:
          colorRoute[
            Object.keys(colorRoute)[
              Math.floor(Math.random() * Object.keys(colorRoute).length)
            ]
          ],
      }}
    >
      <Image
        source={{ uri: item.image }}
        style={{
          width: Dimensions.get("screen").width / 3,
          height: 100,
          objectFit: "cover",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          position: "relative",
          //   top: 0,
          //   left: 0,
          top: 0,
        }}
      ></Image>
      <Text
        style={{
          paddingHorizontal: 6,
          paddingTop: 5,
          fontWeight: "600",
          color: "white",
        }}
      >
        {item.departLocation} - {item.arriveLocation}
      </Text>
      <Text
        style={{
          paddingHorizontal: 6,
          fontSize: 12,
          paddingTop: 4,
          color: "white",
        }}
      >
        From {item.price}
      </Text>
      <Text
        style={{
          paddingHorizontal: 6,
          paddingTop: 2,
          paddingBottom: 5,
          fontSize: 9,
          color: "white",
          textDecorationLine: "line-through",
        }}
      >
        {item.originalPrice}
      </Text>
    </View>
  );
};

export default CardRoute;
