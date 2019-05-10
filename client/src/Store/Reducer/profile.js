import * as actionType from "../actions/actionType"
import { updateObject } from "../utilReducer/utilReducer"
const initialState = {
    userProfile: null,
    email: null,
   
}


const reducer = (state = initialState, action) => {
    
    switch (action.type) {
        case actionType.EMAIL_USER:
              return updateObject(state, { email: action.payload })


           case actionType.PROFILE_USER:{
               return updateObject(state,{userProfile:action.payload})
           } 


            default:
            return state;

    }



}

export default reducer