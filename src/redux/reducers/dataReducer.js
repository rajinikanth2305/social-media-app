import {SET_SCREAMS,
    DELETE_SCREAM,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    POST_SCREAM,
    SET_SCREAM,
    SUBMIT_COMMENT,
    LOADING_DATA} from "../type"

const initialState={
    screams:[],
    scream:{},
    loading:false
}

export default (state=initialState,actions)=>{
    switch(actions.type){
        case LOADING_DATA:
            return{
                ...state,
                loading:true
            }
        case SET_SCREAMS:
            return{
                ...state,
                screams:actions.payload,
                loading:false
            }
        case LIKE_SCREAM:
            let index=state.screams.findIndex((scream)=>scream.screamId === actions.payload.screamId);
            state.screams[index]=actions.payload
            if(state.scream.screamId===actions.payload.screamId){
                state.scream={...actions.payload,comments:[...state.scream.comments]}
                
            }

            return {
                ...state
            }
        case UNLIKE_SCREAM:
                let index1=state.screams.findIndex((scream)=>scream.screamId === actions.payload.screamId);
                state.screams[index1]=actions.payload;
                if(state.scream.screamId===actions.payload.screamId){
                    state.scream={...actions.payload,comments:[...state.scream.comments]}

                }

                return {
                    ...state
                }
        case DELETE_SCREAM:
            let newIndex=state.screams.findIndex((scream)=>scream.screamId===actions.payload);
            state.screams.splice(newIndex,1);
            return {
                ...state
            }
        case POST_SCREAM:
            return {
                ...state,
                screams:[
                    actions.payload,
                    ...state.screams

                ]
            }
        case SET_SCREAM:
            return {
                ...state,
                scream:actions.payload
            }
        case SUBMIT_COMMENT:
            let new1=state.screams.findIndex((scream)=>scream.screamId === actions.payload.screamId);
            state.screams[new1].commentCount+=1


            return {
                ...state,
                scream:{
                    ...state.scream,
                    commentCount:state.scream.commentCount+=1,
                    comments:[actions.payload,...state.scream.comments]
                }

            }
        default:
            return state
    

    }
}