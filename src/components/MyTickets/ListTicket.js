import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import colors from "../../constants/colors";
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

const ListTicket = ({
  item,
  list,
  isLoading,
  setModalVisible,
  currentTab,
  navigation,
  route,
}) => {
  const tailwind = useTailwind();

  return (
    <View
      style={[
        {
          width: Dimensions.get("screen").width,
          height:
            Dimensions.get("screen").height -
            Dimensions.get("screen").height / 8 -
            120,
          marginTop: 15,
          display: "flex",
          flexDirection: "column",
          justifyContent: isLoading ? "flex-start" : "center",
          alignItems: "center",
        },
      ]}
    >
      {/* <Text
          style={{
            marginVertical: 10,
          }}
        >
          Pull to update tickets for the last 3 months
        </Text> */}
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.blue} />
      ) : (
        <FlatList
          data={list}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <CardItemTicket
                item={item}
                setModalVisible={setModalVisible}
                currentTab={currentTab}
                navigation={navigation}
                route={route}
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

export default ListTicket;
