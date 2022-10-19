import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { useState } from "react";
import Header from "../../components/Header/Header";
import SearchFrame from "../../components/BookingTickets/SearchFrame";
import { registerTranslation } from "react-native-paper-dates";
import CardRecent from "../../components/BookingTickets/CardRecent";
import Data from "../../constants/virtualDataRecent";
import colors from "../../constants/colors";
import Ticket from "../../components/MyTickets/Ticket";

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.blue,
    height: Dimensions.get("screen").height / 8.5,
    width: Dimensions.get("screen").width,
    display: "flex",
    // paddingLeft: Dimensions.get("screen").width / 21,
    //borderBottomLeftRadius: 40,
  },
  backgroundBottom: {
    backgroundColor: "rgb(246,246,246)",
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    display: "flex",
  },
});

const MyTicket = () => {
  const tailwind = useTailwind();
  const [list, setList] = useState([]);
  return (
    <View style={styles.backgroundBottom}>
      <View style={[styles.background]}>
        <Header whichScreen={2} />
        <Ticket />
      </View>
    </View>
  );
};

export default MyTicket;
