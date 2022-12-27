import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Modal,
  Button,
  TextInput,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import colors from "../../constants/colors";
import { setQuantity, setSeatIds } from "../../redux/actions/inforBookAction";
import { formatCurrency } from "../../utils/formatCurrency";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: { paddingVertical: 30 },
  cellRoot: {
    width: width / 7 - 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginRight: 10,
  },
  cellText: {
    color: "#000",
    fontSize: 36,
    textAlign: "center",
  },
  focusCell: {
    borderBottomColor: colors.blue,
    // color: "gray",
    borderBottomWidth: 2,
  },
});

const ModalSeatSelected = ({
  navigation,
  route,
  showModalSeat,
  heightBottomSheet,
  dataModalSeat,
}) => {
  // console.warn(route.params)
  const userCurrent = useSelector((state) => state.authenReducer);
  const dispatch = useDispatch();
  const handleClickChooseSeat = () => {
    if (userCurrent.accessToken) {
      if (dataModalSeat.nameSeats.length === 0) {
        dispatch(setQuantity(dataModalSeat.numberSeat));
        navigation.navigate("PickupPoint", route.params);
      } else {
        dispatch(setSeatIds(dataModalSeat.idSeat));
        navigation.navigate("InforDetail", route.params);
      }
    } else {
      Alert.alert(
        "Please Login",
        "You need to login before continuing!!!",
        Platform.OS === "ios"
          ? [
              {
                text: "Ok",
                onPress: () => {
                  navigation.navigate("Login");
                },
                style: "cancel",
              },
              {
                text: "Cancel",
                onPress: () => {},
                style: "cancel",
              },
            ]
          : [
              {
                text: "Cancel",
                onPress: () => {},
                style: "cancel",
              },
              {
                text: "Ok",
                onPress: () => {
                  navigation.navigate("Login");
                },
                style: "cancel",
              },
            ]
      );
    }
  };
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "white",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        borderTopColor: "rgb(220, 220, 220)",
        borderTopWidth: 1,
        borderEndColor: "rgb(220, 220, 220)",
        borderEndWidth: 1,
        borderStartColor: "rgb(220, 220, 220)",
        borderStartWidth: 1,
        position: dataModalSeat.nameSeats.length > 0 ? "relative" : "absolute",
        bottom: 0,
        left: 0,
        // backgroundColor: "red"
      }}
    >
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingTop: 10,
          paddingBottom: 30,
        }}
      >
        <View
          style={{
            width: "60%",

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Text>{dataModalSeat.numberSeat} seat selected</Text>
          <Text>
            {dataModalSeat.nameSeats.map((item, index) => {
              if (index === dataModalSeat.nameSeats.length - 1) {
                return dataModalSeat.nameSeats[index];
              }
              return `${dataModalSeat.nameSeats[index]}, `;
            })}
          </Text>
        </View>
        <Text>{formatCurrency(dataModalSeat.price)}VND</Text>
      </View>
      <View
        style={{
          paddingBottom: Platform.OS === "ios" ? 30 : 30,
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          //   color="#841584"
          //   accessibilityLabel="Learn more about this purple button"
          style={{
            backgroundColor: "rgb(254,210,61)",
            width: Dimensions.get("screen").width / 1.1,
            borderRadius: 6,
          }}
          onPress={() => {
            handleClickChooseSeat();
          }}
        >
          <Text
            style={{
              color: "black",
              textAlign: "center",
              paddingVertical: 15,
              fontSize: 16,
              fontWeight: "500",
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ModalSeatSelected;
