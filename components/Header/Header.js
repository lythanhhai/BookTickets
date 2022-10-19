import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const styles = StyleSheet.create({});

const Header = ({ whichScreen, navigation }) => {
  const tailwind = useTailwind();
  var title = "";
  if (whichScreen === 1) {
    title = "Booking Tickets";
  } else if (whichScreen === 2) {
    title = "My Tickets";
  }
  return (
    <View
      style={[
        tailwind("flex flex-row justify-between"),
        {
          paddingTop: Dimensions.get("screen").height / 24,
          paddingLeft: Dimensions.get("screen").width / 90,
          backgroundColor: "transparent",
          height: Dimensions.get("screen").height / 8.5,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        },
      ]}
    >
      <Text style={{ color: "white", fontSize: 16 }}>{title}</Text>
      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: "transparent",
          paddingRight: 17,
        }}
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Text style={[tailwind("underline"), { color: "white" }]}>
          Hello, Hai
        </Text>
        <MaterialIcons
          name="navigate-next"
          style={{
            fontSize: 16,
            color: "white",
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
