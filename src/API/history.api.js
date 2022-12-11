import axios from "axios";
import { Alert } from "react-native";
import { baseUrl } from "./config";

const GetHistory = (setData, setIsLoading, currentTab) => {
  setIsLoading(true);
  axios({
    method: "get",
    url: `${baseUrl}get-history-by-user`,
    // headers: {
    //   Authorization: `Bearer ${accessToken}`,
    // },
  })
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      // navigation.goBack("PickupPoint");
      return data.body;
    })
    .then((body) => {
      let result = [];

      if (currentTab === "Upcomming") {
        result = body.filter((item) => {
          // console.warn(new Date().valueOf() - Date.parse(item.dateStart));
          return (
            new Date().valueOf() - Date.parse(item.dateStart) < 0 &&
            item.status === "Success"
          );
        });
      } else if (currentTab === "Completed") {
        result = body.filter((item) => {
          return (
            new Date().valueOf() - Date.parse(item.dateStart) > 0 &&
            item.status === "Success"
          );
        });
      } else {
        result = body.filter((item) => {
          return item.status !== "Success";
        });
      }
      result.sort((item1, item2) => {
        return item2.id - item1.id;
      });
      setData(result);
      setIsLoading(false);
    })
    .catch((err) => {
      console.warn(err);
    });
};

const RatingTrip = (setIsLoading, Data) => {
  setIsLoading(true);
  axios({
    method: "post",
    url: `${baseUrl}create-rating/{id_trip}`,
    // headers: {
    //   Authorization: `Bearer ${accessToken}`,
    // },
    data: Data,
  })
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      return data.body;
    })
    .then((body) => {
      // console.warn(body);
      Alert.alert("Thank you for your reviews");
      setIsLoading(false);
    })
    .catch((err) => {
      console.warn(err);
    });
};

export { GetHistory, RatingTrip };
