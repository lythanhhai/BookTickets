import { createStackNavigator } from "@react-navigation/stack";
import MyTicket from "../screens/MyTickets/MyTicket";
import UnpaidTicket from "../screens/MyTickets/UnpaidTicket";

const Stack = createStackNavigator();

const UnpaidNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Unpaid" component={UnpaidTicket} />
    </Stack.Navigator>
  );
};

export default UnpaidNavigation;
