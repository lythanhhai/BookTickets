import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import Header from "../../components/Header/Header";
import styleGlobal from "../../constants/styleGlobal";
import EmptyNotification from "../../components/Notification/EmptyNotification";
import * as screenName from "../../constants/nameScreen";
import CardNoti from "./CardNoti";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../../firebase/ConfigRealtimeDB";
const styles = StyleSheet.create(styleGlobal);

const Notification = ({ item, navigation }) => {
  const tailwind = useTailwind();
  const [listNotification, setListNotification] = useState([]);
  const currentUser = useSelector((state) => state.authenReducer);
  const readNoti = () => {
    let res = [];
    onValue(
      ref(db, "notifications/" + currentUser.username),
      async (snapshot) => {
        const data = await snapshot.val();
        for (const [key, value] of Object.entries(data)) {
          let object = {
            ...value,
            notificationTitle: key,
          };
          res.push(object);
        }
        setListNotification(res);
      }
    );
  };

  useEffect(() => {
    readNoti();
  }, []);
  // useEffect(() => {
  //   console.warn(listNotification);
  // }, [listNotification]);
  return (
    <View style={styles.backgroundBottom}>
      <View style={[styles.background]}>
        <Header
          whichScreen={screenName.tabNotificationScreen}
          navigation={navigation}
        />
        {!listNotification.length ? (
          <EmptyNotification />
        ) : (
          <View
            style={{
              height:
                Dimensions.get("screen").height -
                Dimensions.get("screen").height / 8.5,
            }}
          >
            <FlatList
              data={listNotification}
              showsVerticalScrollIndicator={false}
              horizontal={false}
              renderItem={({ item }) => {
                return <CardNoti item={item} />;
              }}
            ></FlatList>
          </View>
        )}
      </View>
    </View>
  );
};

export default Notification;
