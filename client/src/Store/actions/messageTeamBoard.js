import * as actionType from "./actionType"
import {getRequestData} from '../../RequestData/RequestData'
import { GET_ALL_MESSAGES_OF_GROUP, POST_MESSAGE_OF_USER } from "../../Url/Url"

export const getAllTeamMessages = (id) => {
    var data = {
        url: GET_ALL_MESSAGES_OF_GROUP,
        method: "get",
        headers: {
            id: id
        },
        data: "",
        params: ""
    }
    return dispatch => {
        return getRequestData(data).then(res => {
            dispatch(saveAllMessagesOfTeam(res.data))
            return Promise.resolve(res.data)
        })
    }
}

export const saveAllMessagesOfTeam = (data) => {
    return {
        type: actionType.SAVE_ALL_TEAM_MESSAGE,
        payload:data
    }
}
