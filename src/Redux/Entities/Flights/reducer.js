import { UPDATE_FLIGHT, REMOVE_FLIGHT, CREATE_FLIGHT } from "./types.js";

const initialState = [
  {
    budget: 1900,
    campaignFlightId: 17250,
    campaignId: 21370,
    endDate: "2020-12-31T00:00:00",
    modifiedBy: "karl@bidtellect.com",
    modifiedDate: "2020-10-08T07:20:27.48",
    notes: "this is a note",
    preBidShadingSavings: 0,
    preBidShadingSpent: 51.01,
    spent: 351.01,
    startDate: "2020-06-21T00:00:00",
  },
  {
    budget: 2500,
    campaignFlightId: 17251,
    campaignId: 21370,
    endDate: "2021-12-31T00:00:00",
    modifiedBy: "karl@bidtellect.com",
    modifiedDate: "2020-10-08T07:20:27.48",
    notes: "better notes",
    preBidShadingSavings: 0,
    preBidShadingSpent: 243.59,
    spent: 243.59,
    startDate: "2021-01-21T00:00:00",
  }
];

export default function flightReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_FLIGHT: {
      console.log("In reducer updating state! :D");
      const { value, flightIndex, property } = action.payload;

      let newFlights = [...state];
      newFlights[flightIndex][property] = value;

      return newFlights;
    }

    case REMOVE_FLIGHT: {
      console.log("In reducer removing flight from state! :D");
      /* CODING CHALLENGE: Implement the logic necessary to remove the selected flight from reducer state */
      // Destructure "action.paylaod" to get the passed "flightIndex"
      const { flightIndex } = action.payload;

      // Challenge 4: Return a copy of state without the flight that was passed by index
      let newFlights = state.filter((_, index) => flightIndex !== index);

      return newFlights;
    }

    case CREATE_FLIGHT: {
      console.log("In reducer adding flight to state! :D");
      const { newFlight } = action.payload;

      return [...state, newFlight];
    }

    default:
      return state;
  }
}
