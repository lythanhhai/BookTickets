import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BookingTickets from "../screens/BookingTickets/BookingTickets";
import Login from "../components/Login/Login";
import { StyleSheet, Text, View } from "react-native";
import Register from "../components/Register/Register";
import ChooseLocation from "../screens/BookingTickets/ChooseLocation";

const Stack = createStackNavigator();

const SearchTicketNavigation = () => {
  return (
    <Stack.Navigator
    // screenOptions={{
    //   headerShown: false,
    // }}
    >
      <Stack.Screen
        name="Search"
        component={BookingTickets}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="LocationStart"
        component={ChooseLocation}
        options={({ route }) => ({
          title: "Start point",
        })}
      /> */}
    </Stack.Navigator>
  );
};

export default SearchTicketNavigation;
