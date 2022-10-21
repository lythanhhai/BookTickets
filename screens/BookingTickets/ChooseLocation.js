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
import SearchLocation from "../../components/BookingTickets/SearchLocation";

const styles = StyleSheet.create(styleGlobal);

const ChooseLocation = ({ navigation, route }) => {
  const tailwind = useTailwind();

  return (
    <View style={styles.backgroundBottom}>
      <SearchLocation navigation={navigation} route={route} />
    </View>
  );
};

export default ChooseLocation;
