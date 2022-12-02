import AsyncStorage from "@react-native-async-storage/async-storage";

const getExpireJwt = async () => {
  try {
    const expire = await AsyncStorage.getItem("expireJwt");
    const expireTime = JSON.parse(expire);
    return expireTime;
  } catch (err) {
    return null;
  }
};
export default getExpireJwt;
