import axios from "axios";
import { baseUrl } from "./config";

const getTrips = (Data, setData, setLoading) => {
  setLoading(true);
  axios({
    method: "POST",
    url: `${baseUrl}trip/find-trip`,
    data: Data,
  })
    .then((res) => {
      let listResponse = res.data;
      setData(listResponse);
      setLoading(false);
    })
    .catch((err) => console.warn(err));
};

export { getTrips };
