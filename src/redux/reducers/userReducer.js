import {
  SET_USER,
  CLEAR_LOADING,
  SET_AUTHENTICATED,
  LOADING_USER,
  SET_UNAUTHENTICATED,
  SET_USER_AVAILABILITIES,
  CLEAR_USER_AVAILABILITIES,
  UPDATE_AVAILABILITIES,
  RESET_USER,
  DELETE_AVAILABILITIES,
  CALCULATE_DISTANCE
} from "./types";

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  availabilities: {},
  calculatedDistance : null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        ...state,
        authenticated: true,
        loading: false,
        ...action.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_LOADING:
      return {
        ...state,
        loading: false,
      };
    case SET_USER_AVAILABILITIES:
      return {
        ...state,
        availabilities: action.payload !== undefined ? action.payload : {},
        loading: false,
      };
    case CLEAR_USER_AVAILABILITIES:
      return {
        ...state,
        availabilities: {},
      };
    case UPDATE_AVAILABILITIES:
      return {
        ...state,
        availabilities: Object.assign(state.availabilities, action.payload),
        loading: false,
      };
    case DELETE_AVAILABILITIES:
      delete state.availabilities[action.payload];
      console.log(state.availabilities)
      return {
        ...state,
        availabilities: state.availabilities,
        loading: false,
      };
    case RESET_USER:
      return initialState;

    case CALCULATE_DISTANCE: 
    console.log(action.payload)
    return {
      ...state,
      calculatedDistance : action.payload,
      loading: false,
    }
    default:
      return state;
  }
}
