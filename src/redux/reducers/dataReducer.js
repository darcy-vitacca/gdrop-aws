import {
  LOADING_DATA,
  CLEAR_LOADING_DATA,
  RESET_DATA,
  CONTACT,
  SET_AVAILABILITIES,
  CLEAR_AVAILABILITIES
} from "./types";

const initialState = {
  loading: false,
  availabilities: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_AVAILABILITIES:
      return {
        ...state,
        availabilities: action.payload !== undefined ? action.payload : {},
        loading: false
      };
      case CLEAR_AVAILABILITIES:
        return {
          ...state,
          availabilities: {},
        };
    case CONTACT:
      return {
        ...state,
        contact: {
          userId: action.userId,
          handle: action.handle,
        },
      };
      case CLEAR_LOADING_DATA:
        return {
          ...state,
          loading: false,
        };
        case CLEAR_LOADING_DATA:
          return {
            ...state,
            loading: false,
          };
    case RESET_DATA:
      return initialState;
    default:
      return state;
  }
}
