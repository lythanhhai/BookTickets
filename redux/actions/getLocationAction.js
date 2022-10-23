const getLocationStart = (item) => {
    return {
        type: "getLocationStart",
        payload: item
    }
}
const getLocationStop = (item) => {
    return {
        type: "getLocationStop",
        payload: item
    }
}

const swapLocation = () => {
    return {
        type: "swapLocation",
    }
}


export { getLocationStart, getLocationStop, swapLocation }