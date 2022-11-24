import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Notification from "../screens/Notifications/Notification";

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
