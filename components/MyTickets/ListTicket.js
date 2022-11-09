import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import CardItemTicket from "./CardItemTicket";

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

const ListTicket = ({ item, list }) => {
  const tailwind = useTailwind();

  return (
    <View
      style={{
        width: Dimensions.get("screen").width,
        height:
          Dimensions.get("screen").height -
          Dimensions.get("screen").height / 8 +
          -110,
        marginTop: 15,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Text
          style={{
            marginVertical: 10,
          }}
        >
          Pull to update tickets for the last 3 months
        </Text> */}
      <FlatList
        data={list}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return <CardItemTicket />;
        }}
        contentContainerStyle={
          {
            // width: "100%",
          }
        }
      />
    </View>
  );
};

export default ListTicket;
