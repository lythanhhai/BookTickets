import {
  ImageBackground,
  View,
  Text,
  StyleSheets,
  Dimensions,
  Button,
  TouchableOpacity,
  TextInput,
  Image,
  BackHandler,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { useTailwind } from "tailwind-rn";
import Icon from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import ModalCode from "../Modal/ModalCode";
import colors from "../../constants/colors";
import RBSheet from "react-native-raw-bottom-sheet";

const Register = ({ navigation }) => {
  const tailwind = useTailwind();
  const [modalVisible, setModalVisible] = useState(false);
  const openModalConfirmationCode = (setModalVisible) => {
    setModalVisible(true);
  };
  const [isPhoneNumber, setIsPhoneNumber] = useState(true);
  const refRBSheet = useRef();
  return (
    <View>
      <View
        style={{
          backgroundColor: "rgb(35,115,228)",
          height: Dimensions.get("screen").height / 3,
          width: Dimensions.get("screen").width,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: 25,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
          style={{ position: "absolute", top: 45, left: 13, color: "white" }}
        >
          <Ionicons name="arrow-back" size={30} style={{ color: "white" }} />
        </TouchableOpacity>
        <Text
          style={{
            color: "white",
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          Welcome!
        </Text>
        <Text style={{ color: "white", fontSize: 15 }}>
          Sign up to receive more multiple benefits
        </Text>
      </View>

      <View
        style={{
          //   display: "flex",
          //   flexDirection: "column",
          //   justifyContent: "center",
          //   paddingLeft: 25,
          backgroundColor: "white",
          height:
            Dimensions.get("screen").height -
            Dimensions.get("screen").height / 3,
          transform: [{ translateY: -45 }],
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: 30,
            marginLeft: 20,
            // marginBottom: 12,
            // width: Dimensions.get('screen').width / 1.1,
          }}
        >
          <Text
            style={{
              color: "black",
              textAlign: "center",
              fontSize: 14,
            }}
          >
            Sign up by:
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 15,
            }}
          >
            <TouchableOpacity
              //   color="#841584"
              //   accessibilityLabel="Learn more about this purple button"
              style={{
                backgroundColor: isPhoneNumber ? colors.blue : "transparent",
                borderRadius: 15,
                height: 13,
                width: 13,
                borderWidth: 1,
                borderColor: colors.gray,
              }}
              onPress={() => {
                setIsPhoneNumber(true);
              }}
            ></TouchableOpacity>
            <Text
              style={{
                color: "black",
                textAlign: "center",
                fontSize: 14,
                paddingLeft: 8,
              }}
            >
              Phone number
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            <TouchableOpacity
              //   color="#841584"
              //   accessibilityLabel="Learn more about this purple button"
              style={{
                backgroundColor: !isPhoneNumber ? colors.blue : "transparent",
                borderRadius: 15,
                height: 13,
                width: 13,
                borderWidth: 1,
                borderColor: colors.gray,
              }}
              onPress={() => {
                setIsPhoneNumber(false);
              }}
            ></TouchableOpacity>
            <Text
              style={{
                color: "black",
                textAlign: "center",
                fontSize: 14,
                paddingLeft: 8,
              }}
            >
              Email
            </Text>
          </View>
        </View>
        {/* divide method sign up */}
        {isPhoneNumber ? (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              marginTop: 20,
              marginBottom: 12,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                // paddingLeft: 10,
                height: 40,
                fontSize: 13,
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 6,
                width: Dimensions.get("screen").width / 5,
              }}
            >
              <Image
                source={require("../../assets/Image/adaptive-icon.png")}
                style={{
                  height: "80%",
                  width: "30%",
                  borderRadius: 10,
                  objectFit: "cover",
                  resizeMode: "contain",
                }}
              />
              <Text style={{}}>+84</Text>
            </View>
            <TextInput
              keyboardType="numeric"
              label="Your phone number"
              placeholder="Phone Number"
              style={{
                paddingLeft: 15,
                height: 40,
                fontSize: 13,
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 6,
                width: Dimensions.get("screen").width / 1.5,
                height: 40,
              }}
            ></TextInput>
          </View>
        ) : (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              marginLeft: 18,
              marginTop: 3,
              marginBottom: 8,
              width: Dimensions.get("screen").width / 1.1,
              height: 40,
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 6,
              marginTop: 20,
            }}
          >
            <TextInput
              autoComplete="email"
              placeholder="Enter your email"
              style={{
                paddingLeft: 15,
                fontSize: 13,
                width: "100%",
                height: "100%",
                // width: Dimensions.get("screen").width / 1.1,
                // height: 40,
              }}
            ></TextInput>
          </View>
        )}
        {/*  */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            marginLeft: 18,
            marginTop: 3,
            marginBottom: 8,
            width: Dimensions.get("screen").width / 1.1,
            height: 40,
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 6,
            marginTop: 10,
          }}
        >
          <TextInput
            autoComplete="password"
            placeholder="Enter password"
            secureTextEntry={true}
            style={{
              paddingLeft: 15,
              fontSize: 13,
              width: "100%",
              height: "100%",
              // width: Dimensions.get("screen").width / 1.1,
              // height: 40,
            }}
          ></TextInput>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            marginLeft: 18,
            marginTop: 3,
            marginBottom: 8,
            width: Dimensions.get("screen").width / 1.1,
            height: 40,
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 6,
            marginTop: 10,
          }}
        >
          <TextInput
            autoComplete="password"
            placeholder="Enter re-password"
            secureTextEntry={true}
            style={{
              paddingLeft: 15,
              fontSize: 13,
              width: "100%",
              height: "100%",
              // width: Dimensions.get("screen").width / 1.1,
              // height: 40,
            }}
          ></TextInput>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
            marginBottom: 25,
          }}
        >
          <TouchableOpacity
            //   color="#841584"
            //   accessibilityLabel="Learn more about this purple button"
            style={{
              backgroundColor: "rgb(8,27,57)",
              width: Dimensions.get("screen").width / 1.1,
              borderRadius: 6,
            }}
            onPress={() => {
              // openModalConfirmationCode(setModalVisible);
              refRBSheet.current.open();
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                paddingVertical: 10,
                fontSize: 14,
                fontWeight: "500",
              }}
            >
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
        {/* modal */}
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          height={280}
          openDuration={500}
          customStyles={{
            wrapper: {
              // backgroundColor: "transparent",
            },
            draggableIcon: {
              backgroundColor: "#000",
            },
          }}
        >
          {/* <YourOwnComponent /> */}
          <ModalCode />
        </RBSheet>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
            marginBottom: 25,
          }}
        >
          <Text style={{ marginRight: 10 }}>Have you an account already?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={{ color: "rgb(50,100,255)" }}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* <ModalCode
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        /> */}
    </View>
    // <View style={tailwind("pt-12 items-center")}>
    //   <View style={tailwind("bg-blue-200 px-3 py-1 rounded-full")}>
    //     <Text style={tailwind("text-blue-800 font-semibold")}>
    //       Hello Tailwind
    //     </Text>
    //   </View>
    // </View>
  );
};

export default Register;

{
  /* <ModalCode modalVisible={modalVisible} setModalVisible={setModalVisible}/> */
}
{
  /* <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 25,
          }}
        >
          <View
            style={{
              height: 1,
              width: Dimensions.get("screen").width / 2.5,
              backgroundColor: "black",
              marginRight: 10,
            }}
          ></View>
          <Text
            style={{
              fontSize: 13,
            }}
          >
            Or
          </Text>
          <View
            style={{
              height: 1,
              width: Dimensions.get("screen").width / 2.5,
              backgroundColor: "black",
              marginLeft: 10,
            }}
          ></View>
        </View> */
}
{
  /* <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
            marginBottom: 25,
          }}
        >
          <Icon size={24} color="black" name="google" />
          <TouchableOpacity
            // onPress={onPressLearnMore}
            //   color="#841584"
            //   accessibilityLabel="Learn more about this purple button"
            style={{
              backgroundColor: "white",
              width: Dimensions.get("screen").width / 1.1,
              borderRadius: 6,
              borderWidth: 1,
              borderColor: "gray",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon
              size={18}
              color="black"
              name="google"
              style={{ position: "absolute", left: 15, top: "25%" }}
            />
            <Text
              style={{
                color: "black",
                textAlign: "center",
                paddingVertical: 10,
                fontSize: 14,
                fontWeight: "800",
              }}
            >
              Sign In With Google
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={onPressLearnMore}
            //   color="#841584"
            //   accessibilityLabel="Learn more about this purple button"
            style={{
              backgroundColor: "white",
              width: Dimensions.get("screen").width / 1.1,
              borderRadius: 6,
              marginTop: 10,
              borderWidth: 1,
              borderColor: "gray",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon
              size={18}
              color="black"
              name="apple1"
              style={{ position: "absolute", left: 15, top: "25%" }}
            />
            <Text
              style={{
                color: "black",
                textAlign: "center",
                paddingVertical: 10,
                fontSize: 14,
                fontWeight: "800",
              }}
            >
              Sign In With Apple
            </Text>
          </TouchableOpacity>
        </View> */
}
