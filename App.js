import { StatusBar } from "expo-status-bar";
// import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from "react-native";
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
import Notification from "./components/Notification/Notification";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      // tabBarOptions={{ showIcon: true }}

      style={{ marginBottom: 10 }}
    >
      <Tab.Screen
        name="Search tickets"
        component={SearchTicketNavigation}
        options={{
          tabBarIcon: (tabInfo) => (
            <Icon size={15} color="black" name="search1" />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="My tickets"
        component={MyTicket}
        options={{
          tabBarIcon: (tabInfo) => (
            <Entypo size={15} color="black" name="ticket" />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notification}
        options={{
          tabBarIcon: (tabInfo) => (
            <Ionicons size={15} color="black" name="notifications" />
          ),
        }}
      />
      <Tab.Screen
        name="My account"
        component={Header}
        options={{
          tabBarIcon: (tabInfo) => (
            <MaterialCommunityIcons
              size={15}
              color="black"
              name="account-circle-outline"
            />
          ),
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
          <Stack.Screen name="Login">
            {(props) => <Login {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Register">
            {(props) => <Register {...props} />}
          </Stack.Screen>
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
