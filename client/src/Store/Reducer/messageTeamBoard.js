import * as actionType from "../actions/actionType"
import { updateObject } from "../utilReducer/utilReducer"
const initialState = {
    messages: [],

}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SAVE_ALL_TEAM_MESSAGE:
            return updateObject(state, { messages: action.payload })
        case actionType.CLEAR_MESSAGES:
            return updateObject(state, action.payload)
        default:
            return state
    }


}
export default reducer