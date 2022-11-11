const getLocationStart = (item) => {
  return {
    type: "getLocationStart",
    payload: item,
  };
};
const getLocationStop = (item) => {
  return {
    type: "getLocationStop",
    payload: item,
  };
};

const getDate = (item) => {
  return {
    type: "getDate",
    payload: item,
  };
};

const getNewLocationStart = (item) => {
  return {
    type: "getNewLocationStart",
    payload: item,
  };
};
const getNewLocationStop = (item) => {
  return {
    type: "getNewLocationStop",
    payload: item,
  };
};

const getNewDate = (item) => {
  return {
    type: "getNewDate",
    payload: item,
  };
};

const resetNew = () => {
  return {
    type: "resetNew",
  };
};
const search = () => {
  return {
    type: "search",
  };
};

const swapLocation = () => {
  return {
    type: "swapLocation",
  };
};

const swapNewLocation = () => {
  return {
    type: "swapNewLocation",
  };
};

export {
  getLocationStart,
  getLocationStop,
  swapLocation,
  getDate,
  getNewDate,
  getNewLocationStart,
  getNewLocationStop,
  resetNew,
  search,
  swapNewLocation,
};
