import AsyncStorage from "@react-native-async-storage/async-storage";

const getTokenAferAuthen = async () => {
  try {
    const authen = await AsyncStorage.getItem("User");
    const User = JSON.parse(authen);
    if (User) {
      // setUser(User)
      return User;
    }
  } catch (e) {
    return null;
  }
};

export { getTokenAferAuthen };
