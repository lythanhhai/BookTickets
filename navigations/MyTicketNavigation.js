import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BookingTickets from "../screens/BookingTickets/BookingTickets";
import Login from "../components/Login/Login";
import { StyleSheet, Text, View } from "react-native";
import Register from "../components/Register/Register";
import MyTicket from "../screens/MyTickets/MyTicket";

const Stack = createStackNavigator();

const MyTicketNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Myticket" component={MyTicket} />
      
    </Stack.Navigator>
  );
};

export default MyTicketNavigation;