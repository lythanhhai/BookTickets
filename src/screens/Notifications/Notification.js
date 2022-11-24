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

const styles = StyleSheet.create(styleGlobal);

const Notification = ({ item, navigation }) => {
  const tailwind = useTailwind();

  return (
    <View style={styles.backgroundBottom}>
      <View style={[styles.background]}>
        <Header
          whichScreen={screenName.tabNotificationScreen}
          navigation={navigation}
        />
        <EmptyNotification />
      </View>
    </View>
  );
};

export default Notification;
