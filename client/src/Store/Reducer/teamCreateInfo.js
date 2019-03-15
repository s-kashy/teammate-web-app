import * as actionType from "../actions/actionType"
import { updateObject } from "../utilReducer/utilReducer"
const initialState = {
    generalInfo: "",
    dateAndTime: "",
    location: ""
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SAVE_GENERAL_INFO:
            return updateObject(state, { generalInfo: action.payload })
        case actionType.SAVE_DATE_TIME:
            return updateObject(state, { dateAndTime: action.payload })
        case actionType.SAVE_LOCATION:
            return updateObject(state, { location: action.payload })

        default:
            return state;

    }



}

export default reducer