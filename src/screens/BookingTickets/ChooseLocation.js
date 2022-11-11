import { StyleSheet, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import styleGlobal from "../../constants/styleGlobal";
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
