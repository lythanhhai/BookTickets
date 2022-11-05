import {
  StyleSheet,
  View,
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

const styles = StyleSheet.create(styleGlobal);

const MyTicket = ({ navigation, route }) => {
  const tailwind = useTailwind();
  const [list, setList] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const User = useSelector((state) => state.authenReducer);
  return (
    <View style={styles.backgroundBottom}>
      <View style={[styles.background]}>
        <Header
          whichScreen={screenName.tabMyTicketScreen}
          navigation={navigation}
        />
        <Ticket navigation={navigation} route={route} />
        {User.accessToken ? (
          <Logged />
        ) : (
          <RequireLogin navigation={navigation} route={route} />
        )}
        {/* <RequireLogin /> */}
      </View>
    </View>
  );
};

export default MyTicket;
