import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { useDispatch, useSelector } from "react-redux";
import authenReducer from "../../redux/reducers/authenReducer";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import ExpoFastImage from "expo-fast-image";
import {
  tabBookTicketScreen,
  tabMyAccountScreen,
  tabMyTicketScreen,
  tabNotificationScreen,
  pickupPointScreen,
  dropoffPointScreen,
  chooseSeatScreen,
  chooseTripScreen,
  inforDetailScreen,
  inforTicketScreen,
  paymentScreen,
  myUnpaid,
} from "../../constants/nameScreen";
import colors from "../../constants/colors";
import { resetNew } from "../../redux/actions/getLocationAction";

const styles = StyleSheet.create({});

const Header = ({
  whichScreen,
  navigation,
  titleElement,
  setShowChangeModal,
  showChangeModal,
  item,
  handleCancelBooking,
  route,
}) => {
  const tailwind = useTailwind();
  const User = useSelector((state) => state.authenReducer);
  const location = useSelector((state) => state.getLocationReducer);
  var title;
  var pl = 0;
  var loginOrEdit;
  const dispatch = useDispatch();

  // Booking Tickets screen
  if (whichScreen === tabBookTicketScreen) {
    title = (
      <Text style={{ color: "white", fontSize: 16 }}>Booking Tickets</Text>
      // <Image
      //   source={require("../../../assets/Image/logo.png")}
      //   style={{
      //     height: 60,
      //     width: 150,
      //     objectFit: "cover",
      //   }}
      // />
    );
    pl = Dimensions.get("screen").width / 150;
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
            navigation.navigate("Profile");
          } else {
            navigation.navigate("Login");
          }
        }}
      >
        {whichScreen === tabNotificationScreen ? (
          ""
        ) : (
          <Text style={[tailwind("underline"), { color: "white" }]}>
            {/* Hello, Hai */}
            {User.accessToken ? "Profile" : "Log in"}
          </Text>
        )}
      </TouchableOpacity>
    );
  }
  // My ticket screen
  else if (whichScreen === tabMyTicketScreen) {
    title = <Text style={{ color: "white", fontSize: 16 }}>My Tickets</Text>;
    pl = Dimensions.get("screen").width / 17;
  } else if (whichScreen === myUnpaid) {
    title = (
      <Text style={{ color: "white", fontSize: 16 }}>My Unpaid Tickets</Text>
    );
    pl = Dimensions.get("screen").width / 17;
  }
  // Notification screen
  else if (whichScreen === tabNotificationScreen) {
    title = <Text style={{ color: "white", fontSize: 16 }}>Notifications</Text>;
    pl = Dimensions.get("screen").width / 17;
  }
  // My account screen
  else if (whichScreen === tabMyAccountScreen) {
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
          source={require("../../../assets/Image/account.png")}
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
            navigation.navigate("Profile");
          } else {
            navigation.navigate("Login");
          }
        }}
      >
        {whichScreen === tabNotificationScreen ? (
          ""
        ) : (
          <Text style={[tailwind("underline"), { color: "white" }]}>
            {/* Hello, Hai */}
            {User.accessToken ? "Profile" : "Log in"}
          </Text>
        )}
      </TouchableOpacity>
    );
  }
  // ChooseTrip screen
  else if (whichScreen === chooseTripScreen) {
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
          {showChangeModal ? (
            <></>
          ) : (
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
                <Ionicons
                  name="arrow-back"
                  size={25}
                  style={{ color: "white" }}
                />
              </TouchableOpacity>

              <View style={[tailwind("flex flex-col items-start"), {}]}>
                <View style={[tailwind("flex flex-row items-center"), {}]}>
                  <Text style={[tailwind("text-[color:white]"), {}]}>
                    {location.startPoint.split("-")[0]}
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
                    {location.stopPoint.split("-")[0]}
                  </Text>
                </View>
                <Text style={[tailwind("text-[color:white]"), {}]}>
                  {location.date}
                </Text>
              </View>
            </View>
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            // close
            if (showChangeModal) {
              setShowChangeModal(false);
              dispatch(resetNew());
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
  } else if (whichScreen === chooseSeatScreen) {
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
              navigation.navigate(chooseTripScreen);
            }}
            style={{
              marginRight: 4,
            }}
          >
            <Ionicons name="arrow-back" size={25} style={{ color: "white" }} />
          </TouchableOpacity>

          <View style={[tailwind("flex flex-col items-start"), {}]}>
            <Text style={[tailwind("text-[color:white]"), { fontSize: 18 }]}>
              {item.nameVehicle}
            </Text>
            <View style={[tailwind("flex flex-row items-center"), {}]}>
              <Text
                style={[
                  tailwind("text-[color:white]"),
                  { fontSize: 14, color: "rgb(245, 245, 245)" },
                ]}
              >
                {item.timeStart.split(":").slice(0, 2).join(":")}
              </Text>
              <View
                style={{
                  height: 4,
                  width: 4,
                  marginHorizontal: 4,
                  borderRadius: 10,
                  backgroundColor: "white",
                }}
              ></View>
              <Text
                style={[
                  tailwind("text-[color:white]"),
                  { fontSize: 14, color: "rgb(245, 245, 245)" },
                ]}
              >
                {location.date}
              </Text>
            </View>
          </View>
        </View>
        <Text style={{ color: "white", fontSize: 13 }}>Seat selection</Text>
      </View>
    );
  } else if (whichScreen === pickupPointScreen) {
    title = (
      // <View
      //   style={tailwind(
      //     "flex flex-row justify-between items-center w-full pr-5 pl-2"
      //   )}
      // >
      //   <View
      //     style={
      //       ([tailwind("flex")],
      //       {
      //         display: "flex",
      //         flexDirection: "row",
      //         alignItems: "center",
      //         justifyContent: "flex-start",
      //       })
      //     }
      //   >
      //     <TouchableOpacity
      //       onPress={() => {
      //         navigation.navigate(chooseSeatScreen, item);
      //         // chooseSeatScreen
      //       }}
      //       style={{
      //         marginRight: 4,
      //       }}
      //     >
      //       <Ionicons name="arrow-back" size={25} style={{ color: "white" }} />
      //     </TouchableOpacity>
      //     <Text style={{ color: "white", fontSize: 15 }}>Pick-up point</Text>
      //   </View>
      // </View>
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
              navigation.navigate(chooseSeatScreen, item);
            }}
            style={{
              marginRight: 4,
            }}
          >
            <Ionicons name="arrow-back" size={25} style={{ color: "white" }} />
          </TouchableOpacity>

          <View style={[tailwind("flex flex-col items-start"), {}]}>
            <Text style={[tailwind("text-[color:white]"), { fontSize: 18 }]}>
              {item.nameVehicle}
            </Text>
            <View style={[tailwind("flex flex-row items-center"), {}]}>
              <Text
                style={[
                  tailwind("text-[color:white]"),
                  { fontSize: 14, color: "rgb(245, 245, 245)" },
                ]}
              >
                {item.timeStart.split(":").slice(0, 2).join(":")}
              </Text>
              <View
                style={{
                  height: 4,
                  width: 4,
                  marginHorizontal: 4,
                  borderRadius: 10,
                  backgroundColor: "white",
                }}
              ></View>
              <Text
                style={[
                  tailwind("text-[color:white]"),
                  { fontSize: 14, color: "rgb(245, 245, 245)" },
                ]}
              >
                {location.date}
              </Text>
            </View>
          </View>
        </View>
        <Text style={{ color: "white", fontSize: 13 }}>List station</Text>
      </View>
    );
  } else if (whichScreen === dropoffPointScreen) {
    title = (
      // <View
      //   style={tailwind(
      //     "flex flex-row justify-between items-center w-full pr-5 pl-2"
      //   )}
      // >
      //   <View
      //     style={
      //       ([tailwind("flex")],
      //       {
      //         display: "flex",
      //         flexDirection: "row",
      //         alignItems: "center",
      //         justifyContent: "flex-start",
      //       })
      //     }
      //   >
      //     <TouchableOpacity
      //       onPress={() => {
      //         navigation.navigate(pickupPointScreen, item);
      //       }}
      //       style={{
      //         marginRight: 4,
      //       }}
      //     >
      //       <Ionicons name="arrow-back" size={25} style={{ color: "white" }} />
      //     </TouchableOpacity>
      //     <Text style={{ color: "white", fontSize: 15 }}>Drop-off point</Text>
      //   </View>
      // </View>
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
              navigation.navigate(pickupPointScreen, item);
            }}
            style={{
              marginRight: 4,
            }}
          >
            <Ionicons name="arrow-back" size={25} style={{ color: "white" }} />
          </TouchableOpacity>

          <View style={[tailwind("flex flex-col items-start"), {}]}>
            <Text style={[tailwind("text-[color:white]"), { fontSize: 18 }]}>
              {item.nameVehicle}
            </Text>
            <View style={[tailwind("flex flex-row items-center"), {}]}>
              <Text
                style={[
                  tailwind("text-[color:white]"),
                  { fontSize: 14, color: "rgb(245, 245, 245)" },
                ]}
              >
                {item.timeStart.split(":").slice(0, 2).join(":")}
              </Text>
              <View
                style={{
                  height: 4,
                  width: 4,
                  marginHorizontal: 4,
                  borderRadius: 10,
                  backgroundColor: "white",
                }}
              ></View>
              <Text
                style={[
                  tailwind("text-[color:white]"),
                  { fontSize: 14, color: "rgb(245, 245, 245)" },
                ]}
              >
                {location.date}
              </Text>
            </View>
          </View>
        </View>
        <Text style={{ color: "white", fontSize: 13 }}>Drop-off point</Text>
      </View>
    );
  } else if (whichScreen === inforDetailScreen) {
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
              // navigation.navigate(dropoffPointScreen, item);
              navigation.goBack();
            }}
            style={{
              marginRight: 4,
            }}
          >
            <Ionicons name="arrow-back" size={25} style={{ color: "white" }} />
          </TouchableOpacity>
          <Text style={{ color: "white", fontSize: 15 }}>
            Passenger details
          </Text>
        </View>
      </View>
    );
  } else if (whichScreen === inforTicketScreen) {
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
              handleCancelBooking();
              // navigation.replace(inforDetailScreen);
              // navigation.goBack();
            }}
            style={{
              marginRight: 4,
            }}
          >
            <Ionicons name="arrow-back" size={25} style={{ color: "white" }} />
          </TouchableOpacity>
          <Text style={{ color: "white", fontSize: 15 }}>
            Ticket information
          </Text>
        </View>
      </View>
    );
  } else if (whichScreen === paymentScreen) {
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
              navigation.replace(inforTicketScreen, item);
            }}
            style={{
              marginRight: 4,
            }}
          >
            <Ionicons name="arrow-back" size={25} style={{ color: "white" }} />
          </TouchableOpacity>
          <Text style={{ color: "white", fontSize: 15 }}>Payment</Text>
        </View>
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
