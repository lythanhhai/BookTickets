import axios from "axios";
import { baseUrl } from "./config";

const getTrips = (Data, setData, setLoading, setDataFilter) => {
  setLoading(true);
  axios({
    method: "POST",
    url: `${baseUrl}trip/find-trip`,
    data: Data,
  })
    .then((res) => {
      let listResponse = res.data;
      setData(listResponse);
      setDataFilter(listResponse);
      setLoading(false);
    })
    .catch((err) => console.warn(err));
};

export { getTrips };
