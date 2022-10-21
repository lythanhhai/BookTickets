import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    FlatList,
  } from "react-native";
  import { useTailwind } from "tailwind-rn/dist";
  import { useState } from "react";
  import Header from "../../components/Header/Header";
  import SearchFrame from "../../components/BookingTickets/SearchFrame";
  import { registerTranslation } from "react-native-paper-dates";
  import data from "../../constants/virtualDataRecent";
  import Icon from "react-native-vector-icons/AntDesign";
  import Entypo from "react-native-vector-icons/Entypo";
  import colors from "../../constants/colors";
  import styleGlobal from "../../constants/styleGlobal";
import EmptyNotification from "./EmptyNotification";
  
  const styles = StyleSheet.create(styleGlobal);
  
  const Notification = ({ item }) => {
    const tailwind = useTailwind();
    
    return (
      <View style={styles.backgroundBottom}>
      <View style={[styles.background]}>
        <Header whichScreen={3} />
        <EmptyNotification />
      </View>
    </View>
    );
  };
  
  export default Notification;
  