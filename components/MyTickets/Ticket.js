import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { useState } from "react";
import Header from "../../components/Header/Header";
import SearchFrame from "../../components/BookingTickets/SearchFrame";
import { registerTranslation } from "react-native-paper-dates";
import data from "../../constants/virtualDataRecent";
import Icon from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
  background: {
    backgroundColor: "rgb(35,115,228)",
    height: Dimensions.get("screen").height / 3.4,
    width: Dimensions.get("screen").width,
    display: "flex",
    // flexDirection: "column",
    // justifyContent: "center",
    paddingLeft: Dimensions.get("screen").width / 21,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
});

const Ticket = ({ item }) => {
  const tailwind = useTailwind();
  const [isChoosing, setIsChoosing] = useState("Upcomming");

  const chooseTabUpcomming = () => {
    setIsChoosing("Upcomming");
  };

  const chooseTabCompleted = () => {
    setIsChoosing("Completed");
  };

  const chooseTabCanceled = () => {
    setIsChoosing("Canceled");
  };
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // marginTop: Dimensions.get("screen").height / 8.5,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          width: Dimensions.get("screen").width,
          height: 50,
          backgroundColor: "white",
        }}
      >
        <TouchableOpacity
          style={[
            {
              width: Dimensions.get("screen").width / 3,
              height: 50,
              borderBottomWidth: 2,
              borderBottomColor: "rgb(180, 180, 180)",
              alignItems: "center",
              justifyContent: "center",
            },
            isChoosing === "Upcomming"
              ? { borderBottomColor: colors.blue }
              : { borderBottomColor: "rgb(180, 180, 180)" },
          ]}
          onPress={() => {
            chooseTabUpcomming();
          }}
        >
          <Text
            style={
              isChoosing === "Upcomming"
                ? {
                    fontSize: 15,
                    fontWeight: "bold",
                  }
                : {
                    fontSize: 14,
                    color: "rgb(60, 60, 60)",
                  }
            }
          >
            Upcomming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            {
              width: Dimensions.get("screen").width / 3,
              height: 50,
              borderBottomWidth: 2,
              borderBottomColor: "rgb(180, 180, 180)",
              alignItems: "center",
              justifyContent: "center",
            },
            isChoosing === "Completed"
              ? { borderBottomColor: colors.blue }
              : { borderBottomColor: "rgb(180, 180, 180)" },
          ]}
          onPress={() => {
            chooseTabCompleted();
          }}
        >
          <Text
            style={
              isChoosing === "Completed"
                ? {
                    fontSize: 15,
                    fontWeight: "bold",
                  }
                : {
                    fontSize: 14,
                    color: "rgb(60, 60, 60)",
                  }
            }
          >
            Completed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            {
              width: Dimensions.get("screen").width / 3,
              height: 50,
              borderBottomWidth: 2,
              borderBottomColor: "rgb(180, 180, 180)",
              alignItems: "center",
              justifyContent: "center",
            },
            isChoosing === "Canceled"
              ? { borderBottomColor: colors.blue }
              : { borderBottomColor: "rgb(180, 180, 180)" },
          ]}
          onPress={() => {
            chooseTabCanceled();
          }}
        >
          <Text
            style={
              isChoosing === "Canceled"
                ? {
                    fontSize: 15,
                    fontWeight: "bold",
                  }
                : {
                    fontSize: 14,
                    color: "rgb(60, 60, 60)",
                  }
            }
          >
            Canceled
          </Text>
        </TouchableOpacity>
      </View>
      <View></View>
    </View>
  );
};

export default Ticket;