import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  SectionList,
  ActivityIndicator,
} from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
  useMemo,
} from "react";
import Entypo from "react-native-vector-icons/Entypo";
import colors from "../../constants/colors";
import { TextInput } from "react-native-paper";
import Octicons from "react-native-vector-icons/Octicons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  getLocationStart,
  getLocationStop,
} from "../../redux/actions/getLocationAction";
import { getListLocation } from "../../API/ApiGetStation";
import Loading from "../Loading/Loading";

const styles = StyleSheet.create({
  background: {
    backgroundColor: "rgb(35,115,228)",
    height: Dimensions.get("screen").height / 3.4,
    width: Dimensions.get("screen").width,
    display: "flex",
    paddingLeft: Dimensions.get("screen").width / 21,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
});

const SearchLocation = ({ item, navigation, route }) => {
  const dispatch = useDispatch();
  const tailwind = useTailwind();
  const [listLocation, setListLocation] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
  const [listSearchProvince, setListSearchProvince] = useState([]);
  const [listSearchDistrict, setListSearchDistrict] = useState([]);
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getListLocation(setListLocation, setLoading);
  }, []);

  const searchALocation = (value) => {
    var listProvince = [];
    var listDistrict = [];
    // console.warn("Hà nội".normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
    listLocation.forEach((item, index) => {
      var itemAfterRemoveAccented = item.nameStation
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/gu, "")
        .toLowerCase();
      if (
        itemAfterRemoveAccented.includes(
          value
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/gu, "")
            .toLowerCase()
        ) &&
        !itemAfterRemoveAccented.includes("-")
      ) {
        listProvince.push({
          id: item.id,
          nameStation: item.nameStation,
        });
      } else if (
        itemAfterRemoveAccented.includes(
          value
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/gu, "")
            .toLowerCase()
        ) &&
        itemAfterRemoveAccented.includes("-")
      ) {
        listDistrict.push({
          id: item.id,
          nameStation: item.nameStation,
        });
      }
    });
    setListSearchProvince(listProvince);
    setListSearchDistrict(listDistrict);
  };
  useLayoutEffect(() => {
    setData([
      {
        title: "City/Province",
        data: listSearchProvince,
      },
      {
        title: "Municipal City",
        data: listSearchDistrict,
      },
    ]);
  }, [listSearchProvince, listSearchDistrict]);
  // location from redux
  const location = useSelector((state) => state.getLocationReducer);
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundColor: "transparent",
        width: Dimensions.get("screen").width,
        // height: 3000,
        // marginTop: Dimensions.get("screen").height / 8.5,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
          height: 50,
          backgroundColor: "white",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
          // marginTop: 50,
        }}
      >
        <Entypo
          size={18}
          color="black"
          name="location-pin"
          style={{
            marginHorizontal: 15,
            fontSize: 26,
            color: route.params.screen === "startpoint" ? colors.blue : "red",
          }}
        />

        <TextInput
          placeholder="Enter province, city or district"
          underlineColorAndroid={"rgba(0,0,0,0)"}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          value={valueSearch}
          onChangeText={(value) => {
            setValueSearch(value);
            searchALocation(value);
            // console.warn(value)
          }}
          style={{
            width: Dimensions.get("screen").width / 1.25,
            height: 50,
            backgroundColor: "transparent",
          }}
        />
      </View>
      <View
        style={[
          {
            backgroundColor: "white",
            width: Dimensions.get("screen").width,
            position: "relative",
            top: 60,
            left: 0,
            // height: 2000,
          },
          listSearchDistrict.length === 0 &&
            listSearchProvince.length === 0 && {
              backgroundColor: "transparent",
              marginTop: 10,
            },
        ]}
      >
        {loading ? (
          <View style={[{}]}>
            {/* <ActivityIndicator />
            <ActivityIndicator size="large" />
            <ActivityIndicator size="small" color="#0000ff" /> */}
            <ActivityIndicator size="large" color={colors.blue} />
          </View>
        ) : listSearchDistrict.length === 0 &&
          listSearchProvince.length === 0 ? (
          <Text
            style={[
              tailwind("text-sm flex justify-center items-center text-center"),
              {},
            ]}
          >
            Haven't location match with you search
          </Text>
        ) : (
          <SectionList
            sections={Data}
            // style={{
            //   backgroundColor: "white",
            //   width: Dimensions.get("screen").width,
            //   // position: "absolute",
            //   // top: 60,
            //   // left: 0,
            //   // minHeight: 1000,
            //   // overflowY: "scroll",
            //   // overflowX: "hidden",
            // }}
            keyExtractor={(item, index) => item.id + index}
            renderItem={({ item }) => {
              // console.warn(item)
              return (
                <TouchableOpacity
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    marginLeft: 10,
                    marginRight: 10,
                    paddingVertical: 15,
                    borderBottomColor: "rgb(220, 220, 220)",
                    borderBottomWidth: 1,
                    width: Dimensions.get("screen").width / 1.05,
                    height: 50,
                    bacgroundColor: "red",
                    // flexWrap: "wrap"
                  }}
                  onPress={() => {
                    if (route.params.screenReturn === "ChooseTrip") {
                      if (route.params.screen === "startpoint") {
                        dispatch(
                          getLocationStart(item.nameStation + "-" + item.id)
                        );
                        navigation.navigate("ChooseTrip");
                        // , {
                        //   departLocation: item,
                        //   arrivalLocation: location.stopPoint,
                        //   date: location.date,
                        //   showModal: false,
                        // }
                      } else {
                        dispatch(
                          getLocationStop(item.nameStation + "-" + item.id)
                        );
                        navigation.navigate("ChooseTrip");
                      }
                    } else {
                      if (route.params.screen === "startpoint") {
                        navigation.navigate("Search");
                        dispatch(
                          getLocationStart(item.nameStation + "-" + item.id)
                        );
                      } else {
                        navigation.navigate("Search");
                        dispatch(
                          getLocationStop(item.nameStation + "-" + item.id)
                        );
                      }
                    }
                  }}
                >
                  <Octicons
                    name="location"
                    style={{
                      color: colors.gray,
                      paddingHorizontal: 10,
                      fontSize: 17,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "450",
                      paddingRight: 10,
                    }}
                  >
                    {item.nameStation}
                  </Text>
                </TouchableOpacity>
              );
            }}
            renderSectionHeader={({ section }) => {
              var elem;

              section.data.length > 0
                ? (elem = (
                    <Text
                      style={{
                        fontSize: 18,
                        color: colors.gray,
                        paddingLeft: 20,
                        paddingTop: 10,
                      }}
                    >
                      {section.title}
                    </Text>
                  ))
                : "";
              return elem;
            }}
          />
          // <></>
        )}
      </View>
    </View>
  );
};

export default SearchLocation;

{
  /* <View
          style={{
            // display: "flex",
            // flexDirection: "column",
            // justifyContent: "center",
            // alignItems: "flex-start",
            // marginTop: 15,
            backgroundColor: "white",
            width: Dimensions.get("screen").width,
            position: "absolute",
            top: 60,
            left: 0,
          }}
        >
          {listSearch.length > 0 ? (
            <Text
              style={{
                fontSize: 15,
                color: colors.gray,
                paddingLeft: 20,
                paddingTop: 10,
              }}
            >
              City/Province
            </Text>
          ) : (
            ""
          )}

          <FlatList
            data={listSearch}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              if (item.split("-").length === 2) {
                return (
                  <TouchableOpacity
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      marginLeft: 10,
                      marginRight: 10,
                      paddingVertical: 15,
                      borderBottomColor: "rgb(220, 220, 220)",
                      borderBottomWidth: 1,
                      width: Dimensions.get("screen").width / 1.05,
                      height: 50,
                      bacgroundColor: "red",
                      // flexWrap: "wrap"
                    }}
                  >
                    <Octicons
                      name="location"
                      style={{
                        color: colors.gray,
                        paddingHorizontal: 10,
                        fontSize: 15,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "500",
                        paddingRight: 10,
                      }}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              }
            }}
          />
          <FlatList
            data={listSearch}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              if (item.split("-").length === 1) {
                return (
                  <TouchableOpacity
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      marginLeft: 10,
                      marginRight: 10,
                      paddingVertical: 15,
                      borderBottomColor: "rgb(220, 220, 220)",
                      borderBottomWidth: 1,
                      width: Dimensions.get("screen").width / 1.05,
                      height: 50,
                      bacgroundColor: "red",
                      // flexWrap: "wrap"
                    }}
                  >
                    <Octicons
                      name="location"
                      style={{
                        color: colors.gray,
                        paddingHorizontal: 10,
                        fontSize: 15,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "500",
                        paddingRight: 10,
                      }}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              }
            }}
          />
        </View>
      </View> */
}
