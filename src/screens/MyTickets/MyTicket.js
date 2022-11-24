import { Dimensions, FlatList, StyleSheet, View, Text } from "react-native";
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

const styles = StyleSheet.create(styleGlobal);

const MyTicket = ({ navigation, route }) => {
  const tailwind = useTailwind();
  const [list, setList] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [currentTab, setCurrentTab] = useState("Upcomming");
  const User = useSelector((state) => state.authenReducer);
  useEffect(() => {
    if (currentTab === "Completed") {
      setList([1, 2, 3, 4, 5]);
    } else {
      setList([1, 2, 3, 4]);
    }
  }, [currentTab]);
  return (
    <View style={styles.backgroundBottom}>
      <View style={[styles.background]}>
        <Header
          whichScreen={screenName.tabMyTicketScreen}
          navigation={navigation}
        />
        <Ticket
          navigation={navigation}
          route={route}
          setCurrentTab={setCurrentTab}
        />
        {!User.accessToken ? (
          <RequireLogin navigation={navigation} route={route} />
        ) : list.length === 0 ? (
          <Logged />
        ) : (
          <ListTicket list={list} />
        )}
        {/* <RequireLogin /> */}
      </View>
    </View>
  );
};

export default MyTicket;
