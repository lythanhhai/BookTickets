import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import colors from "../../constants/colors";
import AntDesign from "react-native-vector-icons/AntDesign";
import Octicons from "react-native-vector-icons/Octicons";
import { calculateSumHour } from "../../utils/calculateSumHour";
import { formatCurrency } from "../../utils/formatCurrency";
import { useDispatch } from "react-redux";
import {
  setAgency,
  setIdTrip,
  setPrice,
} from "../../redux/actions/inforBookAction";

const styles = StyleSheet.create({
  background: {
    backgroundColor: "rgb(35,115,228)",
    height: Dimensions.get("screen").height / 3.4,
    width: Dimensions.get("screen").width,
    display: "flex",
    paddingLeft: Dimensions.get("screen").width / 21,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
});

const CardTrip = ({ item, navigation, showModalDetailTrip, setTripChosen }) => {
  const tailwind = useTailwind();
  const dispatch = useDispatch();
  const heightDevice = Dimensions.get("screen").height;
  const HandleChooseATrip = () => {
    dispatch(setIdTrip(item.idTrip));
    dispatch(setPrice(item.price));
    dispatch(
      setAgency({
        nameAgency: item.nameAgency,
        nameVehicle: item.nameVehicle,
      })
    );
    navigation.replace("ChooseSeat", item);
  };
  const handleClickDetailTrip = () => {
    showModalDetailTrip.current.open();
    setTripChosen(item);
  };
  // console.warn(item);
  return (
    <TouchableOpacity
      onPress={() => {
        handleClickDetailTrip();
      }}
      activeOpacity={0.8}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginTop: 10,
        width: Dimensions.get("screen").width / 1.05,
        // height: heightDevice / 3.3,
        height: 260,
        backgroundColor: "white",
        paddingVertical: 8,

        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 4,

        borderRadius: 8,
        marginBottom: 8,
        paddingHorizontal: 10,
      }}
    >
      <>
        <View
          style={[
            tailwind("flex flex-row justify-between items-center pb-3 w-full"),
            {
              height: "30%",
              borderColor: "rgb(240,240,240)",
              borderBottomWidth: 1,
              // backgroundColor: "red"
            },
          ]}
        >
          <View
            style={[
              tailwind("flex flex-col justify-between items-center"),
              { height: "100%" },
            ]}
          >
            <Text style={[tailwind(), { fontSize: 15 }]}>
              {item.timeStart.split(":")[0] +
                ":" +
                item.timeStart.split(":")[1]}
            </Text>
            <Text style={[tailwind("text-sm"), { fontSize: 10 }]}>
              {calculateSumHour(item.timeStart, item.timeStations).duration}
            </Text>
            <Text style={[tailwind(), { fontSize: 15 }]}>
              {calculateSumHour(item.timeStart, item.timeStations).endTime}
            </Text>
          </View>
          <View
            style={{
              width: "55%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              paddingHorizontal: 5,
              // backgroundColor: "red"
            }}
          >
            <Text
              style={{
                color: "black",
                height: "100%",
                fontSize: 15,
                fontWeight: "600",
                width: "100%",
              }}
            >
              {item.dep}{" "}
              <AntDesign
                name="swapright"
                style={{
                  color: "black",
                  fontSize: 15,
                  fontWeight: "600",
                  width: "100%",
                }}
              />{" "}
              {item.des}
            </Text>
          </View>
          <View
            style={[
              tailwind("flex flex-col justify-start items-end"),
              { height: "100%" },
            ]}
          >
            <View
              style={[
                tailwind("flex flex-row justify-end items-center"),
                {
                  // backgroundColor: "red",
                },
              ]}
            >
              <Text
                style={{
                  fontSize: 11,
                }}
              >
                {/* From{" "} */}
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "700",
                  }}
                >
                  {formatCurrency(item.price)}
                  {"VND"}
                </Text>
              </Text>
            </View>
            <Text>{item.numberSeat - item.numberSeatSelect} empty seats</Text>
            {/* <Text>350000vnd</Text> */}
          </View>
        </View>
        <View
          style={[
            tailwind("flex flex-col justify-start items-start w-full"),
            {
              // backgroundColor: "red",
              height: "60%",
            },
          ]}
        >
          <View
            style={[
              tailwind("flex flex-row justify-start items-start mt-2 w-full"),
              { height: "65%" },
            ]}
          >
            <Image
              source={require("../../../assets/Image/busDemonstrate.jpeg")}
              style={{
                // height: 100,
                // width: 100,
                height: "80%",
                width: "30%",
                objectFit: "cover",
                // resizeMode: "contain",
                borderRadius: 7,
                // backgroundColor: "red",
              }}
            />
            <View
              style={[
                tailwind("flex flex-col justify-start items-start h-full pl-2"),
                {
                  // backgroundColor: "red",
                  width: "65%",
                },
              ]}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  marginBottom: 1,
                }}
              >
                {item.nameVehicle}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  // fontWeight: "500",
                  marginBottom: 4,
                }}
              >
                Sleeper {item.numberSeat} beds
              </Text>
              <View
                style={tailwind("flex flex-row justify-between items-center")}
              >
                <Text
                  style={[
                    tailwind("flex flex-row justify-between items-center"),
                    {
                      fontSize: 14,
                      fontWeight: "500",
                    },
                  ]}
                >
                  4.6{""}
                  <Entypo
                    name="star"
                    style={{
                      color: colors.starColor,
                      fontSize: 13,
                      fontWeight: "500",
                    }}
                  ></Entypo>{" "}
                  <Text style={{ fontSize: 10, color: colors.gray }}>
                    (1500 rating)
                  </Text>
                </Text>
              </View>
            </View>
          </View>
          <View
            style={[
              tailwind("flex flex-row justify-between items-start w-full"),
              {
                // backgroundColor: "red",
                height: "30%",
                marginTop: 5,
              },
            ]}
          >
            <View
              style={[
                tailwind("flex flex-col justify-center items-start"),
                { width: "75%" },
              ]}
            >
              <View
                style={[
                  tailwind("flex flex-row justify-start items-center"),
                  {
                    width: "100%",
                    // backgroundColor: "red",
                    marginBottom: 4,
                  },
                ]}
              >
                <Octicons
                  name="verified"
                  style={{
                    color: colors.greenVerify,
                    fontSize: 13,
                    fontWeight: "500",
                    marginRight: 5,
                  }}
                ></Octicons>
                <Text
                  style={{
                    fontSize: 13,
                  }}
                >
                  Verify immediatelly ticket
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "rgb(8,27,57)",
                borderRadius: 6,
              }}
              onPress={() => {
                HandleChooseATrip();
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  paddingVertical: 12,
                  paddingHorizontal: 24,
                  fontSize: 14,
                  fontWeight: "500",
                }}
              >
                Book
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View></View>
      </>
    </TouchableOpacity>
  );
};

export default CardTrip;
