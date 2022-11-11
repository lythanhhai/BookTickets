const initial = {
  startPoint: "",
  stopPoint: "",
  date: "",
  newStartPoint: "",
  newStopPoint: "",
  newDate: "",
};

const getLocationReducer = (state = initial, action) => {
  switch (action.type) {
    case "getLocationStart":
      return {
        ...state,
        startPoint: action.payload,
        newStartPoint: action.payload,
      };
    case "getLocationStop":
      return {
        ...state,
        stopPoint: action.payload,
        newStopPoint: action.payload,
      };
    case "getDate":
      return {
        ...state,
        date: action.payload,
        newDate: action.payload,
      };
    case "getNewLocationStart":
      return {
        ...state,
        newStartPoint: action.payload,
      };
    case "getNewLocationStop":
      return {
        ...state,
        newStopPoint: action.payload,
      };
    case "getNewDate":
      return {
        ...state,
        newDate: action.payload,
      };
    case "resetNew":
      return {
        ...state,
        newStartPoint: state.startPoint,
        newStopPoint: state.stopPoint,
        newDate: state.date,
      };

    case "search":
      return {
        ...state,
        startPoint: state.newStartPoint,
        stopPoint: state.newStopPoint,
        date: state.newDate,
      };
    case "swapLocation":
      var currentLocation = { ...state };
      return {
        ...state,
        stopPoint: currentLocation.startPoint,
        startPoint: currentLocation.stopPoint,
      };

    case "swapNewLocation":
      var currentLocation = { ...state };
      return {
        ...state,
        newStopPoint: currentLocation.newStartPoint,
        newStartPoint: currentLocation.newStopPoint,
      };
    default:
      return state;
  }
};

export { getLocationReducer };
