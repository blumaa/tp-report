import { GET_PlACE, GET_PLACES } from '../constants/action_types';

// src/reducers/reports.js
const INITIAL_STATE = {
  allPlaces: [],
  selectedPlace: {},
  mapCenter: {lat: 52.536228, lng:13.42606}
};

function placesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "GET_PLACES": {
      // console.log(action)
      // return { authUser: action.authUser, loading: false };
    }
    case "SET_MAP_CENTER": {
      // console.log(action.locale)
      return {
        ...state,
        mapCenter: action.locale
      }
      // return { authUser: action.authUser, loading: false };
    }
    case "ADD_PLACE": {
      // console.log(action.place)
      return {
        ...state,
        allPlaces: [...state.allPlaces, action.place]
      };
    }
    case "CLEAR_PLACES": {
      // console.log(action.place)
      return {
        ...state,
        allPlaces: []
      };
    }
    default: return state;
  }
}
export default placesReducer;
