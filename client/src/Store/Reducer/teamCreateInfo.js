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
      


            default:
            return state;

    }



}

export default reducer