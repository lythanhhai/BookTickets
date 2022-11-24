import { StatusBar } from "expo-status-bar";
// import 'react-native-gesture-handler';
import { Dimensions, StyleSheet, Text, View, Platform } from "react-native";
import { TailwindProvider } from "tailwind-rn";
import { useState, useEffect, useLayoutEffect } from "react";
import utilities from "./tailwind.json";
import Login from "./src/components/Login/Login";
import Register from "./src/components/Register/Register";
import BookingTickets from "./src/screens/BookingTickets/BookingTickets";
import MyTicket from "./src/screens/MyTickets/MyTicket";
import Header from "./src/components/Header/Header";
import Icon from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "./src/constants/colors";
import SearchTicketNavigation from "./src/navigations/SearchTicketNavigation";
import Notification from "./src/screens/Notifications/Notification";
import MyTicketNavigation from "./src/navigations/MyTicketNavigation";
import NotificationNavigation from "./src/navigations/NotificationNavigation";
import AccountNavigation from "./src/navigations/AccountNavigation";
import ChooseLocation from "./src/screens/BookingTickets/ChooseLocation";
import SomeInformation from "./src/components/Register/SomeInformation";

// import redux
import { legacy_createStore as createStore } from "redux";
import { Provider, useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/redux/store/store";
import ModalCode from "./src/components/Modal/ModalCode";
import { getTokenAferAuthen } from "./src/utils/getJWT";

import authenReducer from "./src/redux/reducers/authenReducer";
import ChooseTrip from "./src/screens/BookingTickets/ChooseTrip";
import ChooseSeat from "./src/screens/BookingTickets/ChooseSeat";
import PickupPoint from "./src/screens/BookingTickets/PickupPoint";
import DropoffPoint from "./src/screens/BookingTickets/DropoffPoint";
import InforDetail from "./src/screens/BookingTickets/InforDetail";
import InforTicket from "./src/screens/BookingTickets/InforTicket";
import Payment from "./src/screens/BookingTickets/Payment";
import * as screenName from "./src/constants/nameScreen";
import { loginAction } from "./src/redux/actions/authenAction";
import React from "react";
import Loading from "./src/components/Loading/Loading";

// add sentry to booking tickets app
import * as Sentry from "sentry-expo";

Sentry.init({
  dsn: "https://59e443ac7dfb46f280541589357621c1@o4504106872209408.ingest.sentry.io/4504155015020544",
  enableInExpoDevelopment: true,
  // integrations: [
  //   new RewriteFrames({
  //     iteratee: (frame) => {
  //       if (frame.filename) {
  //         // the values depend on what names you give the bundle files you are uploading to Sentry
  //         frame.filename =
  //           Platform.OS === "android"
  //             ? "app:///index.android.bundle"
  //             : "app:///main.jsbundle";
  //       }
  //       return frame;
  //     },
  //   }),
  // ],
  debug: true,
  enableNative: false,
  environment: "develoment",
});

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Home = () => {
  // check user have exist
  // Sentry.Native.captureException(new Error("error"));
  const User = useSelector((state) => state.authenReducer);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    // console.warn(User);
    getTokenAferAuthen()
      .then((res) => {
        if (res?.accessToken) {
          // console.warn(res);
          dispatch(loginAction(res));
        }
      })
      .catch((err) => console.warn(err));
  }, []);
  // store redux
  const getTabBarVisibility = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : "";

    if (routeName === "Location") {
      return false;
    }

    return false;
  };
  //
  const tabBarStyleForAndroid = {
    paddingBottom: 10,
    height: 53,
  };
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.OS === "android" ? tabBarStyleForAndroid : {},
      }}
      // tabBarOptions={{ showIcon: true }}

      tabBarStyle={{ marginBottom: 10 }}
    >
      <Tab.Screen
        name="Search_tickets"
        component={SearchTicketNavigation}
        options={({ route }) => ({
          // ​tabBarLabel: ({ focused, color }) => {
          //   return <Text style={{color: focused ? 'red' : colors.gray}}>Search tickets</Text>
          // },
          title: "Search tickets",
          tabBarIcon: ({ focused, color, size }) => {
            var elem;
            focused
              ? (elem = <Icon size={17} color={colors.blue} name="search1" />)
              : (elem = <Icon size={17} color={colors.gray} name="search1" />);
            return elem;
          },
          // tabBarStyle: { display: 'flex' }
        })}
      ></Tab.Screen>
      <Tab.Screen
        name="My_tickets"
        component={MyTicketNavigation}
        options={{
          // ​tabBarLabel: ({ focused, color }) => {
          //   return <Text style={{color: focused ? 'red' : colors.gray}}>Search tickets</Text>
          // },
          title: "My tickets",
          tabBarIcon: ({ focused, color, size }) => {
            var elem;
            focused
              ? (elem = <Entypo size={17} color={colors.blue} name="ticket" />)
              : (elem = <Entypo size={17} color={colors.gray} name="ticket" />);
            return elem;
          },
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationNavigation}
        options={{
          // ​tabBarLabel: ({ focused, color }) => {
          //   return <Text style={{color: focused ? 'red' : colors.gray}}>Search tickets</Text>
          // },
          tabBarIcon: ({ focused, color, size }) => {
            var elem;
            focused
              ? (elem = (
                  <Ionicons
                    size={17}
                    color={colors.blue}
                    name="notifications"
                  />
                ))
              : (elem = (
                  <Ionicons
                    size={17}
                    color={colors.gray}
                    name="notifications"
                  />
                ));
            return elem;
          },
        }}
      />

      <Tab.Screen
        name="My_account"
        component={AccountNavigation}
        options={{
          // ​tabBarLabel: ({ focused, color }) => {
          //   return <Text style={{color: focused ? 'red' : colors.gray}}>Search tickets</Text>
          // },
          title: "My account",

          tabBarIcon: ({ focused, color, size }) => {
            var elem;
            focused
              ? (elem = (
                  <MaterialCommunityIcons
                    size={17}
                    color={colors.blue}
                    name="account-circle-outline"
                  />
                ))
              : (elem = (
                  <MaterialCommunityIcons
                    size={17}
                    color={colors.gray}
                    name="account-circle-outline"
                  />
                ));
            return elem;
          },
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const [isLoginScreen, setIsLoginScreen] = useState(true);
  const checkScreen = (data) => {
    setIsLoginScreen(data);
  };

  const customTabBarStyle = {
    activeTintColor: colors.blue,
    inactiveTintColor: "gray",
    // style: { backgroundColor: "white" },
  };
  // Sentry.Native.captureException(new Error("error"));
  try {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <TailwindProvider utilities={utilities}>
            <NavigationContainer>
              {/* <View style={styles.container}> */}
              {/* { isLoginScreen ? <Login checkScreen={checkScreen}/> : <Register checkScreen={checkScreen}/>} */}
              {/* <BookingTickets /> */}
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen
                  name="Home"
                  component={Home}
                  options={{
                    gestureEnabled: false,
                  }}
                ></Stack.Screen>
                <Stack.Group>
                  <Stack.Screen
                    name="LocationStart"
                    component={ChooseLocation}
                    options={{
                      title: "Start point",
                      headerShown: true,
                      headerStyle: {
                        backgroundColor: colors.blue,
                        // height: Dimensions.get("screen").height / 8,
                      },
                      headerTintColor: "#fff",
                    }}
                  />
                  <Stack.Screen
                    name="LocationStop"
                    component={ChooseLocation}
                    options={{
                      title: "Stop point",
                      headerShown: true,
                      headerStyle: {
                        backgroundColor: colors.blue,
                      },
                      headerTintColor: "#fff",
                    }}
                  />
                </Stack.Group>
                <Stack.Group>
                  <Stack.Screen
                    name={screenName.chooseTripScreen}
                    options={{
                      gestureEnabled: false,
                    }}
                  >
                    {(props) => <ChooseTrip {...props} />}
                  </Stack.Screen>
                  <Stack.Screen
                    name={screenName.chooseSeatScreen}
                    options={{
                      gestureEnabled: false,
                    }}
                  >
                    {(props) => <ChooseSeat {...props} />}
                  </Stack.Screen>
                  <Stack.Screen
                    name={screenName.pickupPointScreen}
                    options={{
                      gestureEnabled: false,
                      // title: (
                      //   <View
                      //     style={{
                      //       width: Dimensions.get("screen").width / 1.1,
                      //       backgroundColor: "red",
                      //     }}
                      //   >
                      //     <Text>aaa</Text>
                      //   </View>
                      // ),
                      // headerShown: true,
                      // headerStyle: {
                      //   backgroundColor: colors.blue,
                      // },
                      // headerTintColor: "#fff",
                      // headerBackTitleVisible: false,
                    }}
                  >
                    {(props) => <PickupPoint {...props} />}
                  </Stack.Screen>
                  <Stack.Screen
                    name={screenName.dropoffPointScreen}
                    options={{
                      gestureEnabled: false,
                    }}
                  >
                    {(props) => <DropoffPoint {...props} />}
                  </Stack.Screen>
                  <Stack.Screen
                    name={screenName.inforDetailScreen}
                    options={{
                      gestureEnabled: false,
                    }}
                  >
                    {(props) => <InforDetail {...props} />}
                  </Stack.Screen>
                  <Stack.Screen
                    name={screenName.inforTicketScreen}
                    options={{
                      gestureEnabled: false,
                    }}
                  >
                    {(props) => <InforTicket {...props} />}
                  </Stack.Screen>
                  <Stack.Screen
                    name={screenName.paymentScreen}
                    options={
                      {
                        // gestureEnabled: false,
                      }
                    }
                  >
                    {(props) => <Payment {...props} />}
                  </Stack.Screen>
                </Stack.Group>
                {false ? (
                  <></>
                ) : (
                  <Stack.Group>
                    <Stack.Screen
                      name="Login"
                      options={{ gestureEnabled: false }}
                    >
                      {(props) => <Login {...props} />}
                    </Stack.Screen>
                    <Stack.Screen
                      name="Loading"
                      options={
                        {
                          //gestureEnabled: false
                        }
                      }
                    >
                      {(props) => <Loading {...props} />}
                    </Stack.Screen>
                    <Stack.Screen
                      name="Register"
                      options={{ gestureEnabled: false }}
                    >
                      {(props) => <Register {...props} />}
                    </Stack.Screen>
                    {/* <Stack.Screen
                    name="Information"
                    options={{
                      title: "Account Information",
                      gestureEnabled: false,
                      headerShown: true,
                      headerStyle: {
                        backgroundColor: colors.blue,
                      },
                      headerTintColor: "#fff",
                    }}
                  >
                    {(props) => <SomeInformation {...props} />}
                  </Stack.Screen> */}
                  </Stack.Group>
                )}
              </Stack.Navigator>
              {/* <Text> aaa</Text> */}
              {/* </View> */}
            </NavigationContainer>
          </TailwindProvider>
        </PersistGate>
      </Provider>
    );
  } catch (error) {
    // Sentry.Native.captureException(new Error(error));
  }
  // const User = useSelector(state => state.authenReducer)
};

export default Sentry.Native.wrap(App);
// export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
