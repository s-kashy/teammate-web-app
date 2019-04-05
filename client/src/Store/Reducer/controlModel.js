import * as actionType from "../actions/actionType"
import { updateObject } from "../utilReducer/utilReducer"
const initialState = {
    backDrop: false,
    errorMsg: false,
    processRequestMsg:false

}

const reducer = (state = initialState, action) => {
    switch (action.type) {
            case actionType.CLOSE_ERROR_MSG:
            return updateObject(state, { errorMsg: false,backDrop:false })
        case actionType.OPEN_ERROR_MSG:
            return updateObject(state, { errorMsg: true,backDrop:true })
            case actionType.PROCESS_REQUEST_MSG:
            return updateObject(state,{processRequestMsg:action.payload,backDrop:action.payload})
        default:
            return state;

    }



}

export default reducer