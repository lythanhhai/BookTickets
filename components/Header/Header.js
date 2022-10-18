import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useTailwind } from "tailwind-rn/dist";

const styles = StyleSheet.create({});

const Header = () => {
  const tailwind = useTailwind();
  return (
    <View
      style={[tailwind("flex flex-row justify-between"), { paddingTop: 55 }]}
    >
      <Text style={{ color: "white", fontSize: 14 }}>Booking Tickets</Text>
      <TouchableOpacity>
        <Text
          style={[tailwind("underline"), { color: "white", paddingRight: 20 }]}
        >
          Hello, Hai ~
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;
