const initial = {
  startPoint: "",
  stopPoint: "",
  date: "",
};

const getLocationReducer = (state = initial, action) => {
  switch (action.type) {
    case "getLocationStart":
      return {
        ...state,
        startPoint: action.payload,
      };
    case "getLocationStop":
      return {
        ...state,
        stopPoint: action.payload,
      };
    case "getDate":
      return {
        ...state,
        date: action.payload,
      };
    case "swapLocation":
      var currentLocation = { ...state };
      return {
        ...state,
        stopPoint: currentLocation.startPoint,
        startPoint: currentLocation.stopPoint,
      };
    default:
      return state;
  }
};

export { getLocationReducer };
