import {
  Dimensions,
  FlatList,
  StyleSheet,
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { useState } from "react";
import Header from "../../components/Header/Header";
import Ticket from "../../components/MyTickets/Ticket";

import styleGlobal from "../../constants/styleGlobal";
import RequireLogin from "../../components/MyTickets/RequireLogin";
import Logged from "../../components/MyTickets/Logged";
import { useSelector } from "react-redux";
import * as screenName from "../../constants/nameScreen";
import CardItemTicket from "../../components/MyTickets/CardItemTicket";
import ListTicket from "../../components/MyTickets/ListTicket";
import { useEffect } from "react";
import { GetHistory } from "../../API/history.api";
// import ReviewModal from "react-native-review-modal";
import InAppReview from "react-native-in-app-review";
import useAppReview from "./useAppReview";
import ModalReview from "./Modal";
import ListTicketUnpaid from "../../components/MyTickets/ListTicketUnPaid";
import { getUnpaidTicket } from "../../API/notification.api";

const styles = StyleSheet.create(styleGlobal);
const styles_1 = StyleSheet.create({
  MainContainer: { flex: 1 },
  CartExampleTxt: {
    fontSize: 16,
    color: "#006E52",
    fontWeight: "bold",
    margin: 15,
  },
  RateMeBtn: {
    backgroundColor: "#6E0052",
    alignSelf: "center",
    padding: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  RateMeTxt: { color: "#fff", fontWeight: "bold", fontSize: 15 },
  containerBtn: { justifyContent: "center", flex: 1 },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
    // backgroundColor: "black",
    width: Dimensions.get("screen").width,
    height: Dimensions.get("window").height,
    // opacity: 0.7,
    backgroundColor: "rgba(0,0,0,0.7)",
    // position: "relative",
    // zIndex: 900,
  },
});

const UnpaidTicket = ({ navigation, route }) => {
  const tailwind = useTailwind();
  const [list, setList] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const User = useSelector((state) => state.authenReducer);

  useEffect(() => {
    getUnpaidTicket(setList);
  }, []);
  const { onReview } = useAppReview();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.backgroundBottom}>
      <View style={[styles.background]}>
        <Header
          whichScreen={screenName.tabMyTicketScreen}
          navigation={navigation}
        />
      </View>

      {!User.accessToken ? (
        <RequireLogin navigation={navigation} route={route} name="unpaid ticket" />
      ) : list.length === 0 ? (
        <Logged />
      ) : (
        <ListTicketUnpaid
          list={list}
          isLoading={isLoading}
          navigation={navigation}
          route={route}
        />
      )}
    </View>
    // </View>
  );
};

export default UnpaidTicket;
