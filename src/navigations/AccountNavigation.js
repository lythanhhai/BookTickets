import { createStackNavigator } from "@react-navigation/stack";
import MyAccount from "../screens/MyAccount/MyAccount";
import { View } from "react-native";

const Stack = createStackNavigator();

const AccountNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Account" component={MyAccount} />
    </Stack.Navigator>
  );
};

export default AccountNavigation;
