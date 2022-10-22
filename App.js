import { StatusBar } from "expo-status-bar";
// import 'react-native-gesture-handler';
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { TailwindProvider } from "tailwind-rn";
import { useState, useEffect } from "react";
import utilities from "./tailwind.json";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import BookingTickets from "./screens/BookingTickets/BookingTickets";
import MyTicket from "./screens/MyTickets/MyTicket";
import Header from "./components/Header/Header";
import Icon from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "./constants/colors";
import SearchTicketNavigation from "./navigations/SearchTicketNavigation";
import Notification from "./screens/Notifications/Notification";
import MyTicketNavigation from "./navigations/MyTicketNavigation";
import NotificationNavigation from "./navigations/NotificationNavigation";
import AccountNavigation from "./navigations/AccountNavigation";
import ChooseLocation from "./screens/BookingTickets/ChooseLocation";
import SomeInformation from "./components/Register/SomeInformation";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Home = () => {
  const getTabBarVisibility = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : "";

    if (routeName === "Location") {
      return false;
    }

    return false;
  };
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
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

export default function App() {
  const [isLoginScreen, setIsLoginScreen] = useState(true);
  const checkScreen = (data) => {
    setIsLoginScreen(data);
  };
  const customTabBarStyle = {
    activeTintColor: colors.blue,
    inactiveTintColor: "gray",
    // style: { backgroundColor: "white" },
  };
  return (
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
          <Stack.Screen name="Home" component={Home}></Stack.Screen>
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
            <Stack.Screen name="Login" options={{ gestureEnabled: false }}>
              {(props) => <Login {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Register" options={{ gestureEnabled: false }}>
              {(props) => <Register {...props} />}
            </Stack.Screen>
            <Stack.Screen
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
            </Stack.Screen>
          </Stack.Group>
        </Stack.Navigator>
        {/* <Text> aaa</Text> */}
        {/* </View> */}
      </NavigationContainer>
    </TailwindProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
