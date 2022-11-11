import { StyleSheet, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { useState } from "react";
import Header from "../../components/Header/Header";
import styleGlobal from "../../constants/styleGlobal";
import MenuFunction from "../../components/MyAccount/Menu";
import * as screenName from "../../constants/nameScreen";

const styles = StyleSheet.create(styleGlobal);

const MyAccount = ({ navigation }) => {
  const tailwind = useTailwind();
  const [list, setList] = useState([]);
  const [isLogged, setIsLogged] = useState(true);
  return (
    <View style={styles.backgroundBottom}>
      <View style={[styles.background]}>
        <Header
          whichScreen={screenName.tabMyAccountScreen}
          navigation={navigation}
        />
        <MenuFunction />
      </View>
    </View>
  );
};

export default MyAccount;
