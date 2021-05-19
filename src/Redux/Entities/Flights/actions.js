import { UPDATE_FLIGHT, REMOVE_FLIGHT, CREATE_FLIGHT } from "./types";

export const updateFlight = (value, flightIndex, property) => {
  return {
    type: UPDATE_FLIGHT,
    payload: {
      value,
      flightIndex,
      property,
    },
  };
};

export const removeFlight = (flightIndex) => {
  return {
   /* CODING CHALLENGE: Write the logic to map the action to the reducer function and provide payload data*/
  };
};

export const createFlight = (newFlight) => {
  return {
    type: CREATE_FLIGHT,
    payload: {
      newFlight,
    },
  };
};
