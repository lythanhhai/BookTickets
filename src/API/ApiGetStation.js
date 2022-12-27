import axios from "axios";
import { baseUrl } from "./config";

const getListLocation = (setListLocation, setLoading) => {
  setLoading(true);
  axios({
    method: "GET",
    url: `${baseUrl}station`,
  })
    .then((res) => {
      let listResponse = res.data;
      // console.log(res)
      let listAll = [];
      // listResponse.forEach((item, index) => {
      //   listAll.push(item.name);
      //   item.districts.forEach((itemDist, indexDist) => {
      //     listAll.push(itemDist.name + " - " + item.name);
      //     // itemDist.wards.forEach((itemWard, indexWard) => {
      //     //   listAll.push(itemWard.name + " - " + itemDist.name + " - " + item.name);
      //     // })
      //   });
      // });
      listResponse.forEach((item, index) => {
        listAll.push({
          id: item.id,
          nameStation: item.nameStation,
        });
      });
      setListLocation(listAll);
      // console.log(listResponse)
      setLoading(false);
    })
    .catch((err) => console.log(err));
};

export { getListLocation };
