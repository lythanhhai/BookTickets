import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Notification from "../screens/Notifications/Notification";

const Stack = createStackNavigator();

const NotificationNavigation = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Notication"
        component={Notification}
        navigation={navigation}
      />
    </Stack.Navigator>
  );
};

export default NotificationNavigation;
