import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BookingTickets from "../screens/BookingTickets/BookingTickets";
import Login from "../components/Login/Login";
import { StyleSheet, Text, View } from "react-native";
import Register from "../components/Register/Register";
import Notification from "../components/Notification/Notification";

const Stack = createStackNavigator();

const NotificationNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Notication" component={Notification} />
      
    </Stack.Navigator>
  );
};

export default NotificationNavigation;
