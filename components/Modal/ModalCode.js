import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import colors from "../../constants/colors";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: { paddingVertical: 30 },
  // cell: {
  //   width: width / 7 - 10,
  //   height: 40,
  //   lineHeight: 38,
  //   fontSize: 24,
  //   borderBottomWidth: 2,
  //   borderColor: "#00000030",
  //   textAlign: "center",
  //   marginRight: 10,
  // },
  // focusCell: {
  //   borderColor: colors.blue,
  //   color: colors.blue,
  // },
  // inputText: {
  //   borderBottomWidth: 2,
  //   borderBottomColor: "#00000030",
  // },
  cellRoot: {
    width: width / 7 - 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginRight: 10,
  },
  cellText: {
    color: "#000",
    fontSize: 36,
    textAlign: "center",
  },
  focusCell: {
    borderBottomColor: colors.blue,
    // color: "gray",
    borderBottomWidth: 2,
  },
});

const CELL_COUNT = 6;

const ModalCode = ({ navigation, route, phoneNumber, confirmCode }) => {
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundColor: "transparent",
        // height: height,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          marginTop: 7,
        }}
      >
        <Text
          style={{
            fontSize: 12,
            paddingLeft: 20,
            paddingRight: 7,
          }}
        >
          Enter confirmation code which is sent to
        </Text>
        <Text
          style={{
            fontSize: 13,
            fontWeight: "600",
          }}
        >
          (+84) {phoneNumber}
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          // marginTop: 7,
          backgroundColor: "transparent",
          width: width,
        }}
      >
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <View
              // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[styles.cellRoot, isFocused && styles.focusCell]}
            >
              <Text style={styles.cellText}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />
        <TouchableOpacity
          //   color="#841584"
          //   accessibilityLabel="Learn more about this purple button"
          style={{
            backgroundColor: "rgb(8,27,57)",
            width: Dimensions.get("screen").width / 1.1,
            borderRadius: 6,
            marginTop: 10,
          }}
          onPress={() => {
            confirmCode(value);
            // confirmVerificationCode(value)
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
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ModalCode;
