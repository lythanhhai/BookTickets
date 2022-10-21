import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const styles = StyleSheet.create({});

const Header = ({ whichScreen, navigation }) => {
  const tailwind = useTailwind();
  var title;
  var pl = 0;
  if (whichScreen === 1) {
    title = "Booking Tickets";
    title = (
      <Text style={{ color: "white", fontSize: 16 }}>Booking Tickets</Text>
    );
    pl = Dimensions.get("screen").width / 90;
  } else if (whichScreen === 2) {
    title = <Text style={{ color: "white", fontSize: 16 }}>My Tickets</Text>;
    pl = Dimensions.get("screen").width / 17;
  } else if (whichScreen === 3) {
    title = <Text style={{ color: "white", fontSize: 16 }}>Notifications</Text>;
    pl = Dimensions.get("screen").width / 17;
  } else if (whichScreen === "StartPoint") {
    // title = "Start point";
    title = (
      <Text style={{ color: "white", fontSize: 16 }}>Booking Tickets</Text>
    );
    pl = Dimensions.get("screen").width / 17;
  } else if (whichScreen === 4) {
    title = (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/Image/account.png")}
          style={{
            height: 30,
            width: 30,
            objectFit: "cover",
            resizeMode: "contain",
            marginRight: 10,
          }}
        ></Image>
        <Text style={{ color: "white", fontSize: 16 }}>My account</Text>
      </View>
    );
    pl = Dimensions.get("screen").width / 17;
  }

  return (
    <View
      style={[
        tailwind("flex flex-row justify-between"),
        {
          paddingTop: Dimensions.get("screen").height / 24,
          paddingLeft: pl,
          backgroundColor: "transparent",
          height: Dimensions.get("screen").height / 8.5,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        },
      ]}
    >
      {title}
      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: "transparent",
          paddingRight: 27,
        }}
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        {whichScreen === 3 ? (
          ""
        ) : (
          <Text style={[tailwind("underline"), { color: "white" }]}>
            {/* Hello, Hai */}
            Log in
          </Text>
        )}

        {/* <MaterialIcons
          name="navigate-next"
          style={{
            fontSize: 20,
            color: "white",
          }}
        /> */}
      </TouchableOpacity>
    </View>
  );
};

export default Header;
