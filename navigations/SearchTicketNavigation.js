import { createStackNavigator } from "@react-navigation/stack";
import BookingTickets from "../screens/BookingTickets/BookingTickets";

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
