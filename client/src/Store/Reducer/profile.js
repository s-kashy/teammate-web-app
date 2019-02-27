import * as actionType from "../actions/actionType"
import { updateObject } from "../utilReducer/utilReducer"
const initialState = {
    userProfile: null,
    email: null
}


const reducer = (state = initialState, action) => {
    // console.log("in the reducer")
    switch (action.type) {
        case actionType.EMAIL_USER:
        console.log("email reducer",action.payload)
            return updateObject(state, { email: action.payload })


           case actionType.PROFILE_USER:{
               return updateObject(state,{userProfile:action.payload})
           } 


            default:
            return state;

    }



}

export default reducer