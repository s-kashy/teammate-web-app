import * as actionType from "../actions/actionType"
import { updateObject } from "../utilReducer/utilReducer"
const initialState = {
    spinnerState: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.OPEN_SPINNER:
            return updateObject(state, { spinnerState: true })

        case actionType.CLOSE_SPINNER:
            return updateObject(state, { spinnerState: false })

        default:
            return state;

    }



}

export default reducer