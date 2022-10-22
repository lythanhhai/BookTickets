import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useState, useEffect } from "react";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    height: 100,
  },
  modalBox: {
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    width,
    backgroundColor: "transparent",
  },
  content: {
    position: "absolute",
    bottom: 0,
    width,
    // height: verticalScale(250),
    borderTopLeftRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 20,
    // backgroundColor: "white",
  },
  textStyle: {
    fontSize: 22,
  },
});
const ModalCode = ({ navigation, route, modalVisible, setModalVisible }) => {
  return (
    <Modal
      entry="bottom"
      backdropPressToClose={true}
      isOpen={modalVisible}
      style={styles.modalBox}
      onClosed={() => setModalVisible(false)}
    >
      <View style={styles.content}>
        {/* <Text style={styles.textStyle}>AndroidVille</Text> */}
      </View>
    </Modal>
    
  );
};

export default ModalCode;
