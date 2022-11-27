const setQuantity = (quantity) => {
  return {
    type: "setQuantity",
    payload: quantity,
  };
};

const setIdTrip = (id) => {
  return {
    type: "setIdTrip",
    payload: id,
  };
};

const setPrice = (price) => {
  return {
    type: "setPrice",
    payload: price,
  };
};

const setAgency = (data) => {
  return {
    type: "setAgency",
    payload: data,
  };
};

const setPickupPoint = (id) => {
  return {
    type: "setPickupPoint",
    payload: id,
  };
};

const setDropoffPoint = (id) => {
  return {
    type: "setDropoffPoint",
    payload: id,
  };
};

const setPoint = (array) => {
  return {
    type: "setPoint",
    payload: array,
  };
};

const setInforPassenger = (object) => {
  return {
    type: "setInforPassenger",
    payload: object,
  };
};

const setSeatIds = (idSeat) => {
  return {
    type: "setSeatIds",
    payload: idSeat,
  };
};

const removeSeatIds = (idSeat) => {
  return {
    type: "removeSeatIds",
    payload: idSeat,
  };
};

const cancelTicket = () => {
  return {
    type: "cancelTicket",
  };
};

export {
  setQuantity,
  setPickupPoint,
  setDropoffPoint,
  setInforPassenger,
  setIdTrip,
  cancelTicket,
  setSeatIds,
  removeSeatIds,
  setPrice,
  setPoint,
  setAgency,
};
