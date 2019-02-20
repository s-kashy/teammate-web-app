import * as actionType from "../actions/actionType"
import {updateObject} from "../utilReducer/utilReducer"
const initialState={
    isAuthenticate:null,
    
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.LOGIN_CHECK_TOKEN:{
          return updateObject(state,{isAuthenticate:action.payload})
        }
        case actionType.SIGN_IN_WITH_C:{
            return updateObject(state,{isAuthenticate:action.payload})
        }

        case actionType.NEW_USER:{
            return updateObject(state,{isAuthenticate:action.payload})
        }
        case actionType.LOGOUT:{
            return updateObject(state,{isAuthenticate:action.payload})
        }
        default:
        return state;

    }



}

export default reducer