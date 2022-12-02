import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import ContentReview from "./ContentReview";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useEffect } from "react";

const ModalReview = ({ modalVisible, setModalVisible }) => {
  const [isLoad, setIsLoad] = useState(true);
  useEffect(() => {
    // console.warn(isLoad);
    let time = setTimeout(() => {
      setIsLoad(false);
    }, 2000);
    return () => {
      clearTimeout(time);
    };
  }, []);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      {/* <View style={styles.centeredView}> */}
      <TouchableWithoutFeedback
        onPress={() => {
          // console.warn("a");
          Keyboard.dismiss();
        }}
        // style={[styles.centeredView]}
      >
        <KeyboardAvoidingView
          // style={styles.centeredView}
          style={[styles.centeredView]}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.modalView}>
            <Pressable
              style={[
                styles.button,
                styles.buttonClose,
                { marginTop: 10, marginRight: 10 },
              ]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              {/* <Text style={styles.textStyle}>Hide Modal</Text> */}
              <AntDesign
                name="close"
                style={{
                  color: "white",
                  fontSize: 20,
                }}
              />
            </Pressable>
            <ContentReview setModalVisible={setModalVisible}/>
          </View>
          {/* </View> */}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
{
  /* <Pressable
    style={[styles.button, styles.buttonOpen]}
    onPress={() => setModalVisible(true)}
  >
    <Text style={styles.textStyle}>Show Modal</Text>
  </Pressable> */
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
    backgroundColor: "black",
    width: Dimensions.get("screen").width,
    height: Dimensions.get("window").height,
    // opacity: 0.7,
    backgroundColor: "rgba(0,0,0,0.7)",
    // position: "relative",
    // zIndex: 900,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    // padding: 35,
    width: "85%",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default ModalReview;
