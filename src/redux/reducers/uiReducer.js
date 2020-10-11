import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  RESET_UI,
  SET_MESSAGE,
  CLEAR_MESSAGE,
} from "./types";

const initialState = {
  loading: false,
  errors: null,
  message: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null,
      };
    case SET_MESSAGE:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    case CLEAR_MESSAGE:
      return {
        ...state,
        loading: false,
        message: null,
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    case RESET_UI:
      return initialState;
    default:
      return state;
  }
}
