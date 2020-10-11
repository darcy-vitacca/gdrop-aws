import {
  SET_USER,
  SET_ERRORS,
  SET_USER_AVAILABILITIES,
  CLEAR_USER_AVAILABILITIES,
  UPDATE_AVAILABILITIES,
  CLEAR_ERRORS,
  SET_MESSAGE,
  CLEAR_MESSAGE,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_DATA,
  LOADING_USER,
  CLEAR_LOADING,
  RESET_DATA,
  RESET_UI,
  RESET_USER,
  CONTACT,
  CLEAR_CONTACT,
  SET_LOCATION,
  SET_AVAILABILITIES,
  CLEAR_AVAILABILITIES,
  DELETE_AVAILABILITIES,
  CALCULATE_DISTANCE
} from "../reducers/types";
import axios from "axios";
import emailjs from "emailjs-com";

export const pageChangeErrorClear = (state) => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  dispatch({ type: CLEAR_MESSAGE });
};

export const resetUI = () => (dispatch) => {
  dispatch({ type: RESET_UI });
};

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/login", userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/mycalendar");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

//LOGOUT USER
export const logoutUser = (history) => (dispatch) => {
  localStorage.removeItem(`FBIdToken`);
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
  if (history) {
    history.push("/login");
  }
};
//SET LOCATION
export const SetUserLocation = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  dispatch({ type: CLEAR_MESSAGE });
  axios
    .post("/setlocation", newUserData)
    .then((res) => {
      console.log(res.data);
      dispatch(getUserData());
      dispatch({ type: SET_MESSAGE, payload: res.data.message });
      dispatch({ type: CLEAR_LOADING });
    })

    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

//FORGOT PASSWORD
export const forgotPassword = (userData, history) => (dispatch) => {
  console.log(userData);
  dispatch({ type: LOADING_UI });
  dispatch({ type: CLEAR_ERRORS });
  dispatch({ type: CLEAR_MESSAGE });
  axios
    .post("/forgotpassword", userData)
    .then((res) => {
      dispatch({ type: SET_MESSAGE, payload: res.data.message });
    })

    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
//CHANGE PASSWORD
export const ChangePassword = (userData, history) => (dispatch) => {
  console.log(userData);
  dispatch({ type: LOADING_UI });
  axios
    .post("/updatepassword", userData)
    .then((res) => {
      console.log(res);
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: SET_MESSAGE, payload: res.data.message });
    })

    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
//CHANGE EMAIL
export const ChangeEmail = (userData, history) => (dispatch) => {
  console.log(userData);
  dispatch({ type: LOADING_UI });
  dispatch({ type: CLEAR_ERRORS });
  dispatch({ type: CLEAR_MESSAGE });
  axios
    .post("/updateemail", userData)
    .then((res) => {
      dispatch({ type: SET_MESSAGE, payload: res.data.message });
      dispatch(getUserData());
    })

    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

//HELPER - GET USER DATA
export const getUserData = () => (dispatch) => {
  let uid;
  dispatch({ type: LOADING_USER });
  axios
    .get("/user")
    .then((res) => {
      uid = res.data.credentials.userId;
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

//SIGNUP USER
export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/signup", newUserData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/mycalendar");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

//DELETE ACCOUNT
export const DeleteAccount = (handle, userId, history) => (dispatch) => {
  const userCredentials = {
    handle: handle,
    userId: userId,
  };
  dispatch({ type: LOADING_UI });
  axios
    .delete(`/delete/${userId}/${handle}`, userCredentials)
    .then((res) => {
      dispatch(logoutUser(history));
      dispatch({ type: RESET_DATA });
      dispatch({ type: RESET_UI });
      dispatch({ type: RESET_USER });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const Contact = (userId, handle, history) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  dispatch({ type: CLEAR_CONTACT });
  dispatch({ type: CONTACT, userId: userId, handle: handle });
  history.push("/inbox");
};

export const clearContact = () => (dispatch) => {
  dispatch({ type: CLEAR_CONTACT });
};

// export const contactForm = (formData) => (dispatch) => {
//   dispatch({ type: LOADING_UI });
//   dispatch({ type: CLEAR_MESSAGE });
//   dispatch({ type: CLEAR_ERRORS });
//   const templateParams = {
//     from_name: `${formData.firstName} ${formData.lastName}`,
//     reply_to: formData.email,
//     state: formData.state,
//     currentEmployer: formData.currentEmployer ? formData.currentEmployer : "",
//     message: formData.enquiry,
//   };
//   emailjs
//     .send(
//       "service_gj94f58",
//       "template_jlpaeya",
//       templateParams,
//       "user_ab3pyJc4cyGkWpr0MFdkO"
//     )
//     .then(
//       (res) => {
//         dispatch({ type: SET_MESSAGE, payload: `Message Successful` });
//       },
//       (err) => {
//         dispatch({ type: SET_ERRORS, payload: `Message Failed` });
//       }
//     );
// };

//GET CALENDAR
export const GetCalendar = (userId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  dispatch({ type: CLEAR_MESSAGE });
  dispatch({ type: CLEAR_AVAILABILITIES });
  axios
    .get(`/user/${userId}`)
    .then((res) => {
      console.log(res.data);
      dispatch({ type: SET_AVAILABILITIES, payload: res.data.calendarData });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

//GET MY CALENDAR TODO: needs to be in user not data
export const GetMyCalendar = (userId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  dispatch({ type: CLEAR_MESSAGE });
  dispatch({ type: CLEAR_USER_AVAILABILITIES });
  axios
    .get(`/user/${userId}`)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: SET_USER_AVAILABILITIES,
        payload: res.data.calendarData,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
//UPDATE AVAILIBILITES TODO: need to clean this up
export const UpdateAvailibilites = (newAvailabilty) => (dispatch) => {
  dispatch({ type: UPDATE_AVAILABILITIES, payload: newAvailabilty });
};
//DELETE AVAILBILITES
export const DeleteAvailibility = (availabilty) => (dispatch) => {
  dispatch({ type: DELETE_AVAILABILITIES, payload: availabilty });
};

//SUBMIT AVAILBILITES CHANGE
export const SaveAvailbilities = (availabilties) => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  dispatch({ type: CLEAR_MESSAGE });
  axios
    .post("/modifydates", availabilties)
    .then((res) => {
      console.log(res)
      dispatch({ type: SET_MESSAGE, payload: res.data.message });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const CalculateDistance = (locationData) => (dispatch) =>{
  dispatch({ type: LOADING_UI });
 
  axios.post('/calculatedistance', locationData)
  .then((res) => {
    console.log(res.data)
  dispatch({ type: CALCULATE_DISTANCE, payload: res.data.calculatedData });
  })
  .catch((err) => {
    console.log(err);
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data,
    });
  });
}


//HELPER - SET AUTHORIZATION HEADER
const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};
