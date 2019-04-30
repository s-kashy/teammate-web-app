import * as actionType from "../actions/actionType"
import { updateObject } from "../utilReducer/utilReducer"
const initialState = {
    generalInfo: "",
    dateAndTime: "",
    location: "",
    emailManger: "",
    yourTeams: [],
    teamSelected: "",
    teamsBySearch: [],
    userLocation: {}

}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SAVE_GENERAL_INFO:
            return updateObject(state, { generalInfo: action.payload })
        case actionType.SAVE_DATE_TIME:
            return updateObject(state, { dateAndTime: action.payload })
        case actionType.SAVE_LOCATION:
            return updateObject(state, { location: action.payload })
        case actionType.SAVE_EMAIL_MANAGER:
            return updateObject(state, { emailManger: action.payload })
        case actionType.YOUR_TEAMS:
            return updateObject(state, { yourTeams: action.payload })
        case actionType.SEARCH_TEAMS:
            return updateObject(state, { teamsBySearch: action.payload })
        case actionType.CLEAR_ALL_TEAMS:
            return updateObject(state ,{yourTeams:[],teamsBySearch:[]})
        case actionType.LOAD_CHAT_GROUP:
            return updateObject(state, { teamSelected: action.payload })
        case actionType.CLEAR_SELECTED_TEAM:
            return updateObject(state, { teamsBySearch: [], teamSelected: [] })
        case actionType.SET_USER_LOCATION:
            return updateObject(state, { userLocation: action.payload })
        default:
            return state;

    }



}

export default reducer