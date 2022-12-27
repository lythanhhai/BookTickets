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
          // console.log(new Date().valueOf() - Date.parse(item.dateStart));
          return (
            new Date().valueOf() - Date.parse(item.historyBooking.dateStart) <
              0 && item.historyBooking.status === "Success"
          );
        });
      } else if (currentTab === "Completed") {
        result = body.filter((item) => {
          return (
            new Date().valueOf() - Date.parse(item.historyBooking.dateStart) >
              0 && item.historyBooking.status === "Success"
          );
        });
      } else {
        result = body.filter((item) => {
          return item.historyBooking.status !== "Success";
        });
      }
      result.sort((item1, item2) => {
        return item2.id - item1.id;
      });
      setData(result);
      setIsLoading(false);
    })
    .catch((err) => {
      console.log(err);
    });
};

const RatingTrip = (setIsLoading, Data) => {
  setIsLoading(true);
  axios({
    method: "post",
    url: `${baseUrl}create-rating`,
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
      if (body === "User have already rating for trip") {
        Alert.alert("You have already rated this trip");
      } else {
        Alert.alert("Thank you for your reviews");
      }
      setIsLoading(false);
    })
    .catch((err) => {
      // console.log(Data.idPayment);
      console.log(err);
    });
};

const GetRatingByAgency = (setIsLoading, nameAgency, setListRating, tripId) => {
  setIsLoading(true);
  axios({
    method: "get",
    url: `${baseUrl}get-list-rating-by-agency/${nameAgency}`,
    // headers: {
    //   Authorization: `Bearer ${accessToken}`,
    // },
  })
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      return data.body;
    })
    .then((body) => {
      // console.log(body);
      let array = body.filter((item, index) => {
        return item.tripId === tripId;
      });
      setListRating(array);
      setIsLoading(false);
    })
    .catch((err) => {
      console.log(err);
    });
};

const GetRatingByUser = (setIsLoading, setListRatingByUser) => {
  setIsLoading(true);
  axios({
    method: "get",
    url: `${baseUrl}get-list-rating-by-user`,
    // headers: {
    //   Authorization: `Bearer ${accessToken}`,
    // },
  })
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      return data.body;
    })
    .then((body) => {
      setListRatingByUser(body);
      setIsLoading(false);
    })
    .catch((err) => {
      console.log(err);
    });
};

export { GetHistory, RatingTrip, GetRatingByAgency, GetRatingByUser };
