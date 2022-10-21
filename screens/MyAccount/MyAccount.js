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
import RequireLogin from "../../components/MyTickets/RequireLogin";
import Logged from "../../components/MyTickets/Logged";
import MenuFunction from "../../components/MyAccount/Menu";

const styles = StyleSheet.create(styleGlobal);

const MyAccount = ({ navigation }) => {
  const tailwind = useTailwind();
  const [list, setList] = useState([]);
  const [isLogged, setIsLogged] = useState(true);
  return (
    <View style={styles.backgroundBottom}>
      <View style={[styles.background]}>
        <Header whichScreen={4} navigation={navigation} />
        <MenuFunction />
      </View>
    </View>
  );
};

export default MyAccount;
