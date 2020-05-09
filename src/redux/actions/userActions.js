import {
  SET_USER, SET_ERRORS, SET_UNAUTHENTICATED, CLEAR_ERRORS,
  LOADING_UI,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ
} from "../type";
import axios from "axios"
export const loginUser = (userData, history) => (dispatch) => {
  dispatch({
    type: LOADING_UI
  })
  axios
    .post('/login', userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });


}

//sign up user

export const signupUser = (userData, history) => (dispatch) => {
  dispatch({
    type: LOADING_UI
  })
  axios
    .post('/signup', userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });


}
export const getUserData = () => {
  return (dispatch) => {
    dispatch({
      type: LOADING_USER
    })
    axios.get("/user").then((res) => {
      dispatch(
        {
          type: SET_USER,
          playload: res.data
        }
      )
    })
      .catch((error) => {
        console.log(error)
      })

  }
}

//for logout


export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common['Authorization']
  dispatch({
    type: SET_UNAUTHENTICATED
  })
}

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
};

//upload Image


export const uploadImage=(formData)=>
{
  return (dispatch)=>{
  dispatch({type:LOADING_USER})
  axios.post("/user/image",formData)
  .then((response)=>
  {
    dispatch(getUserData())
    
  }).catch((error)=>{
    console.log(error);
  })
}
}
//action for edit user details

export const editUserDetails=(userDetails)=>(dispatch)=>
{
  dispatch({
    type:LOADING_USER
  })
  axios.post("/user",userDetails)
  .then(()=>
  {
    dispatch(getUserData());
  })
  .catch((error)=>
  {
    console.log(error)
  })
}
//notifications


export const markNotificationsRead=(notificationIds)=>dispatch=>{
  axios.post("/notifications",notificationIds)
  .then((res)=>{
    dispatch({
      type:MARK_NOTIFICATIONS_READ
    })
  })
  .catch((error)=>{
    console.log(error)
  }
  )
}
