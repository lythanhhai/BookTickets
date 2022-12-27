import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import colors from "../../constants/colors";
import CardItemTicket from "./CardItemTicket";
import CardItemUnpaid from "./CardItemUnPaid";

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

const ListTicketUnpaid = ({ item, list, isLoading, navigation, route }) => {
  const tailwind = useTailwind();

  return (
    <View
      style={[
        {
          width: Dimensions.get("screen").width,
          height:
            Dimensions.get("window").height -
            Dimensions.get("window").height / 8 -
            100,
          marginTop: 15,
          // paddingBottom: Platform.OS === "ios" ? 60 : 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: isLoading ? "flex-start" : "center",
          alignItems: "center",
        },
      ]}
    >
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.blue} />
      ) : (
        <FlatList
          data={list}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <CardItemUnpaid
                item={item}
                navigation={navigation}
                route={route}
                index={index}
                length={list.length}
              />
            );
          }}
          contentContainerStyle={
            {
              // width: "100%",
              // height: "100%",
              // flexGrow: 1,
            }
          }
        />
      )}
    </View>
  );
};

export default ListTicketUnpaid;