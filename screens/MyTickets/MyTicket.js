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

import styleGlobal from "../../constants/styleGlobal";
  
const styles = StyleSheet.create(styleGlobal);

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
