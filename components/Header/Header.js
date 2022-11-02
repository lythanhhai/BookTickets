import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { getTokenAferAuthen } from "../../utils/getJWT";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import authenReducer from "../../redux/reducers/authenReducer";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";

const styles = StyleSheet.create({});

const Header = ({
  whichScreen,
  navigation,
  titleElement,
  setShowChangeModal,
  showChangeModal,
}) => {
  const tailwind = useTailwind();
  const User = useSelector((state) => state.authenReducer);
  const location = useSelector(state => state.getLocationReducer)
  var title;
  var pl = 0;
  var loginOrEdit;

  // Booking Tickets screen
  if (whichScreen === 1) {
    title = (
      <Text style={{ color: "white", fontSize: 16 }}>Booking Tickets</Text>
    );
    pl = Dimensions.get("screen").width / 90;
    loginOrEdit = (
      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: "transparent",
          paddingRight: 27,
        }}
        onPress={() => {
          if (User.accessToken) {
          } else {
            navigation.navigate("Login");
          }
        }}
      >
        {whichScreen === 3 ? (
          ""
        ) : (
          <Text style={[tailwind("underline"), { color: "white" }]}>
            {/* Hello, Hai */}
            {User.accessToken ? "Profile" : "Log in"}
          </Text>
        )}

        {/* <MaterialIcons
      name="navigate-next"
      style={{
        fontSize: 20,
        color: "white",
      }}
    /> */}
      </TouchableOpacity>
    );
  }
  // My ticket screen
  else if (whichScreen === 2) {
    title = <Text style={{ color: "white", fontSize: 16 }}>My Tickets</Text>;
    pl = Dimensions.get("screen").width / 17;
  }
  // Notification screen
  else if (whichScreen === 3) {
    title = <Text style={{ color: "white", fontSize: 16 }}>Notifications</Text>;
    pl = Dimensions.get("screen").width / 17;
  }
  // My account screen
  else if (whichScreen === 4) {
    title = (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/Image/account.png")}
          style={{
            height: 30,
            width: 30,
            objectFit: "cover",
            resizeMode: "contain",
            marginRight: 10,
          }}
        ></Image>
        <Text style={{ color: "white", fontSize: 16 }}>My account</Text>
      </View>
    );
    pl = Dimensions.get("screen").width / 17;
    loginOrEdit = (
      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: "transparent",
          paddingRight: 27,
        }}
        onPress={() => {
          if (User.accessToken) {
          } else {
            navigation.navigate("Login");
          }
        }}
      >
        {whichScreen === 3 ? (
          ""
        ) : (
          <Text style={[tailwind("underline"), { color: "white" }]}>
            {/* Hello, Hai */}
            {User.accessToken ? "Profile" : "Log in"}
          </Text>
        )}

        {/* <MaterialIcons
      name="navigate-next"
      style={{
        fontSize: 20,
        color: "white",
      }}
    /> */}
      </TouchableOpacity>
    );
  }
  // ChooseTrip screen
  else if (whichScreen === "ChooseTrip") {
    title = (
      <View
        style={tailwind(
          "flex flex-row justify-between items-center w-full pr-5 pl-2"
        )}
      >
        <View
          style={
            ([tailwind("flex")],
            {
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            })
          }
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home");
            }}
            style={{
              marginRight: 4,
            }}
          >
            <Ionicons name="arrow-back" size={25} style={{ color: "white" }} />
          </TouchableOpacity>

          <View style={[tailwind("flex flex-col items-start"), {}]}>
            <View style={[tailwind("flex flex-row items-center"), {}]}>
              <Text style={[tailwind("text-[color:white]"), {}]}>
                {location.startPoint}
              </Text>
              <AntDesign
                name="swapright"
                // size={30}
                style={[
                  tailwind("text-[color:white]"),
                  {
                    fontSize: 25,
                  },
                ]}
              />
              <Text style={[tailwind("text-[color:white]"), {}]}>
                {location.stopPoint}
              </Text>
            </View>
            <Text style={[tailwind("text-[color:white]"), {}]}>
              {location.date}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            // close
            if (showChangeModal) {
              setShowChangeModal(false);
            } else {
              setShowChangeModal(true);
            }
          }}
        >
          <Text style={[tailwind("underline"), { color: "white" }]}>
            {/* Hello, Hai */}
            {!showChangeModal ? "Change" : "Close"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  } else if (whichScreen === "ChooseSeat") {
    title = (
      <View
        style={tailwind(
          "flex flex-row justify-between items-center w-full pr-5 pl-2"
        )}
      >
        <View
          style={
            ([tailwind("flex")],
            {
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            })
          }
        >
          <TouchableOpacity
            onPress={() => {
              navigation.replace("ChooseTrip");
            }}
            style={{
              marginRight: 4,
            }}
          >
            <Ionicons name="arrow-back" size={25} style={{ color: "white" }} />
          </TouchableOpacity>
          <Text style={{ color: "white", fontSize: 14, }}>Choose Seat</Text>
        </View>
        
        {/* <TouchableOpacity
          onPress={() => {
            // close
            if (showChangeModal) {
              setShowChangeModal(false);
            } else {
              setShowChangeModal(true);
            }
          }}
        >
          <Text style={[tailwind("underline"), { color: "white" }]}>
            {!showChangeModal ? "Change" : "Close"}
          </Text>
        </TouchableOpacity> */}
      </View>
    );
  }

  return (
    <View
      style={[
        tailwind("flex flex-row justify-between"),
        {
          paddingTop: Dimensions.get("screen").height / 24,
          paddingLeft: pl,
          backgroundColor: "transparent",
          height: Dimensions.get("screen").height / 8.5,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        },
      ]}
    >
      {title}
      {loginOrEdit}
    </View>
  );
};

export default Header;
