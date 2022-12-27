import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Rating, AirbnbRating } from "react-native-ratings";
import Star from "../../components/MyTickets/Star";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RatingTrip } from "../../API/history.api";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F8FF",
    alignItems: "center",
    justifyContent: "center",
  },
  reviewContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
    width: "100%",
    // opdacity: 0.1,
    // shadowOffset: { width: 0, height: 5 },
    // shadowOpacity: 1.0,
    // shadowRadius: 2,
    // shadowColor: "rgba(193, 211, 251, 0.5)",
    // elevation: 5,
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
    color: "#323357",
    textAlign: "center",
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
  totalWrap: {
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  amountText: {
    fontSize: 16,
    color: "#595B71",
    textAlign: "center",
  },
});
const ContentReview = ({ setModalVisible, setLoadAfterAction }) => {
  const [ratingEnd, setRatingEnd] = useState(5);
  const [comment, setComment] = useState("");
  let ratingCompleted = (rating) => {
    setRatingEnd(rating);
  };
  const [isLoading, setIsLoading] = useState(false);
  const handleRating = async () => {
    const itemBefore = await AsyncStorage.getItem("RatingTrip");
    const item = JSON.parse(itemBefore);
    RatingTrip(setLoadAfterAction, {
      comment,
      nameAgency: item.historyBooking.nameAgency,
      rating: ratingEnd,
      idPayment: item.historyBooking.payment.id,
    });
    setModalVisible(false);
    // console.warn({
    //   comment,
    //   nameAgency: item.nameAgency,
    //   rating: ratingEnd,
    //   trip_id: 2,
    //   user_id: item.customer.id,
    // });
  };

  return (
    // <View style={styles.container}>
    <View style={styles.reviewContainer}>
      <Text style={styles.title}>How was your experience?</Text>
      <View style={styles.totalWrap}>
        <View
          style={{
            // flexDirection: "column",
            // justifyContent: "center",
            // alignItems: "center",
            flexDirection: "row",
            marginBottom: 7,
          }}
        >
          <AirbnbRating
            defaultRating={5}
            imageSize={10}
            size={25}
            onFinishRating={(rating) => {
              ratingCompleted(rating);
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 15,
          }}
        >
          {ratingEnd} out of 5
        </Text>
        <TextInput
          multiline={true}
          numberOfLines={10}
          placeholder={"Write some your reviews..."}
          style={{
            height: 100,
            width: "100%",
            textAlignVertical: "top",
            borderWidth: 2,
            borderColor: "rgb(220, 220, 220)",
            marginTop: 15,
            padding: 10,
            borderRadius: 10,
          }}
          onChangeText={(text) => {
            setComment(text);
          }}
          // value={this.state.text}
        />
        <TouchableOpacity
          //   color="#841584"
          //   accessibilityLabel="Learn more about this purple button"
          style={{
            backgroundColor: "rgb(254,210,61)",
            borderRadius: 6,
            width: "70%",
            marginTop: 15,
            // marginTop: 0,
          }}
          onPress={() => {
            handleRating();
          }}
        >
          <Text
            style={{
              color: "black",
              textAlign: "center",
              paddingVertical: 15,
              fontSize: 16,
              fontWeight: "500",
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    // </View>
  );
};

export default ContentReview;
