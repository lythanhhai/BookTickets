const initialState = {
  email: "",
  name: "",
  note: "",
  phoneNumber: "",
  price: 0,
  quantity: 0,
  routeStationBook: [null, null],
  tripId: null,
  seatIds: [],
};

const inforBookReducer = (state = initialState, action) => {
  switch (action.type) {
    case "setQuantity": {
      return {
        ...state,
        quantity: action.payload,
      };
    }
    case "setIdTrip": {
      return {
        ...state,
        tripId: action.payload,
      };
    }

    case "setPrice": {
      return {
        ...state,
        price: action.payload,
      };
    }
    case "setSeatIds": {
      // let array = [...state.seatIds];
      // array.push(action.payload);
      return {
        ...state,
        routeStationBook: [],
        seatIds: action.payload,
      };
    }
    case "removeSeatIds": {
      // let array = [...state.seatIds];
      // array.pop(action.payload);
      return {
        ...state,
        routeStationBook: [],
        seatIds: action.payload,
      };
    }
    case "setPickupPoint": {
      let array = [...state.routeStationBook];
      array[0] = action.payload;
      return {
        ...state,
        routeStationBook: array,
        seatIds: [],
      };
    }
    case "setPoint": {
      return {
        ...state,
        routeStationBook: action.payload,
        seatIds: [],
      };
    }
    case "setDropoffPoint": {
      let array = [...state.routeStationBook];
      array[1] = action.payload;
      return {
        ...state,
        routeStationBook: array,
        seatIds: [],
      };
    }
    case "setInforPassenger": {
      return {
        ...state,
        email: action.payload.email,
        phoneNumber: action.payload.phoneNumber,
        name: action.payload.name,
        note: action.payload.note,
      };
    }
    case "cancelTicket": {
      return {
        ...state,
        email: "",
        name: "",
        note: "",
        phoneNumber: "",
        price: 0,
        quantity: 0,
        routeStationBook: [null, null],
        tripId: null,
        seatIds: [],
      };
    }
    default:
      return state;
  }
};

export default inforBookReducer;
