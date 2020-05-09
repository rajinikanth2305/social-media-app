import {SET_SCREAMS,
    LOADING_DATA,
    DELETE_SCREAM,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    POST_SCREAM,
    SET_ERRORS,
    LOADING_UI,
    CLEAR_ERRORS,
    SET_SCREAM,
    SUBMIT_COMMENT,
    STOP_LOADING_UI
} from "../type"
import axios from "axios"
//get all screams
export const getScreams=()=>dispatch=>{
    dispatch({
        type:LOADING_DATA
    })
    axios.get("/screams")
    .then((res)=>
    {
        dispatch({
            type:"SET_SCREAMS",
            payload:res.data
        })
    })
    .catch((error)=>{
        dispatch({
            type:SET_SCREAMS,
            payload:[]
        })

    })
    
}

//like a scream

export const likeScream=(screamId)=>dispatch=>{
    axios.get(`/scream/${screamId}/like`)
    .then((res)=>{
        dispatch({
            type:LIKE_SCREAM,
            payload:res.data
        })
    })
        .catch((error)=>{
            console.log(error)
        })

    }
//delete scream


export const deleteScream=(screamId)=>(dispatch)=>
{
    axios.delete(`/scream/${screamId}`)
    .then(()=>{
        dispatch({
            type:DELETE_SCREAM,
            payload:screamId
        })
    })
    .catch((error)=>{
        console.log(error)
    })
}

//get a scream

export const getScream = (screamId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .get(`/scream/${screamId}`)
      .then((res) => {
        dispatch({
          type: SET_SCREAM,
          payload: res.data
        });
        dispatch({ type: STOP_LOADING_UI });
      })
      .catch((err) => console.log(err));
  };
//unlike a scream

export const unlikeScream=(screamId)=>dispatch=>{
    axios.get(`/scream/${screamId}/unlike`)
    .then((res)=>{
        dispatch({
            type:UNLIKE_SCREAM,
            payload:res.data
        })
    }).catch((error)=>{
            console.log(error)
        })

    }

//post a scream


export const postScream=(newScream)=>dispatch=>{
    dispatch({
        type:LOADING_UI
    })
    axios.post("/scream",newScream)
    .then((res)=>{
        dispatch({
            type:POST_SCREAM,
            payload:res.data
        });
        dispatch({
            type:CLEAR_ERRORS
        })
    })
    .catch((error)=>{
        dispatch({
            type:SET_ERRORS,
            payload:error.response.data

        })
    })
}

export const clearErrors=()=>dispatch=>{
    dispatch({
        type:CLEAR_ERRORS
    })
}

//submit a cooment


export const submitComment=(screamId,commentData)=>(dispatch)=>{
    axios.post(`/scream/${screamId}/comment`,commentData)
    .then((res)=>{
        dispatch({
            type:SUBMIT_COMMENT,
            payload:res.data
        })
        dispatch(clearErrors())
    })
    .catch((err)=>{
        dispatch({
            type:SET_ERRORS,
            payload:err.response.data
        })
    })
}
//get user details

export const getUserData=(userHandle)=>dispatch=>{
    dispatch({
        type:LOADING_DATA
    })
    axios.get(`/user/${userHandle}`)
    .then((res)=>{
        dispatch({
            type:SET_SCREAMS,
            payload:res.data.screams

        })
    })
    .catch((err)=>{
        dispatch({
            type:SET_SCREAMS,
            payload:null
        })
    })
}