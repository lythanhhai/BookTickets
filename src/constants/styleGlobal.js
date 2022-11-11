import colors from "./colors";
import { Dimensions } from "react-native";
const styleGlobal = {
  background: {
    backgroundColor: colors.blue,
    height: Dimensions.get("screen").height / 8,
    width: Dimensions.get("screen").width,
    display: "flex",
    // paddingLeft: Dimensions.get("screen").width / 21,
    //borderBottomLeftRadius: 40,
  },
  backgroundBottom: {
    backgroundColor: "rgb(246,246,246)",
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    display: "flex",
  },
};
export default styleGlobal;
