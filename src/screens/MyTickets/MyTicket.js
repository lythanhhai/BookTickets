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

const MyTicket = ({ navigation, route }) => {
  const tailwind = useTailwind();
  const [list, setList] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [currentTab, setCurrentTab] = useState("Upcomming");
  const [isLoading, setIsLoading] = useState(false);
  const User = useSelector((state) => state.authenReducer);
  useEffect(() => {
    GetHistory(setList, setIsLoading, currentTab);
  }, [currentTab]);
  useEffect(() => {
    // console.warn(route.params);
    if (route.params?.rating) {
      setCurrentTab("Completed");
    } else {
    }
  }, [route.params]);
  useEffect(() => {
    GetHistory(setList, setIsLoading, currentTab);
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
      <Ticket
        navigation={navigation}
        route={route}
        setCurrentTab={setCurrentTab}
      />

      <ModalReview
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      {!User.accessToken ? (
        <RequireLogin navigation={navigation} route={route} />
      ) : list.length === 0 ? (
        <Logged />
      ) : (
        <ListTicket
          list={list}
          isLoading={isLoading}
          setModalVisible={setModalVisible}
          currentTab={currentTab}
          navigation={navigation}
          route={route}
        />
      )}
      {/* <ReviewModal
          starRating={this.state.starCount}
          onStarRatingPress={(rating) => {
            this.onStarRatingPress(rating);
          }}
        /> */}

      {/* <RequireLogin /> */}
    </View>
    // </View>
  );
};

export default MyTicket;
