import * as actionType from "../actions/actionType"
import { updateObject } from "../utilReducer/utilReducer"
const initialState = {
    backDrop: false,
    errorMsg: false,
    processRequestMsg: false,
    memberMsg: false,
    conformRequest:false,
    userConformation:false

}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.CLOSE_ERROR_MSG:
            return updateObject(state, { errorMsg: false, backDrop: false })
        case actionType.OPEN_ERROR_MSG:
            return updateObject(state, { errorMsg: true, backDrop: true })
        case actionType.PROCESS_REQUEST_MSG:
            return updateObject(state, { processRequestMsg: action.payload, backDrop: action.payload })
        case actionType.RESET_MODEL:
            return updateObject(state = initialState)
            case actionType.USER_SELECTION:
            return updateObject(state,{userConformation:action.payload,conformRequest:!state.conformRequest,backDrop:!state.backDrop})
            case actionType.CONFORM_REQUEST:
            return updateObject(state,{conformRequest:!state.conformRequest,backDrop:!state.backDrop})
        case actionType.IS_ALREADY_MEMBER:
            return updateObject(state, { memberMsg: true, backDrop: true })
        default:
            return state;

    }



}

export default reducer