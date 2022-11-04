import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { getTokenAferAuthen } from "../../utils/getJWT";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import authenReducer from "../../redux/reducers/authenReducer";
import FastImage from "react-native-fast-image";
import ImageLoading from "../../assets/Image/loading.gif";
import ExpoFastImage from "expo-fast-image";

const styles = StyleSheet.create({});

const Loading = ({ whichScreen, navigation, titleElement }) => {
  const tailwind = useTailwind();
  return (
    <View
      style={[
        tailwind("flex flex-col justify-center items-center h-full w-full"),
        { backgroundColor: "white" },
      ]}
    >
      <Image
        transition={false}
        source={ImageLoading}
        //  source={{ uri: "https://unsplash.it/400/400?image=1" }}
        style={{
          height: 190,
          width: 190,
          objectFit: "cover",
          resizeMode: "contain",
        }}
      />
      {/* <ExpoFastImage
        uri={require("../../assets/Image/account.png")} // image address
        cacheKey={1} // could be a unque id
        source={require("../../assets/Image/loading.gif")}
        style={{
          height: 190,
          width: 190,
          objectFit: "cover",
          resizeMode: "contain",
        }} // your custom style object
        // any supported props by Image
      /> */}
      {/* <FastImage
        style={{
          height: 190,
          width: 190,
          objectFit: "cover",
          resizeMode: "contain",
        }}
        source={require("../../assets/Image/loading.gif")}
        resizeMode={FastImage.resizeMode.contain}
      /> */}
      {/* <FastImage
        style={{ width: 100, height: 100 }}
        source={{ uri: "https://unsplash.it/400/400?image=1" }}
      /> */}
      <Text
        style={{
          fontSize: 18,
          fontWeight: "500",
          paddingTop: 20,
        }}
      >
        Please wait for handling request...
      </Text>
    </View>
  );
};

export default Loading;

// https://icons8.com/icons/set/bus--animated
