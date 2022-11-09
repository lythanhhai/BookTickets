import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
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
