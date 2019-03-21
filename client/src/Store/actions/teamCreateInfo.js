import * as actionType from "./actionType"
import { getRequestData } from "../../RequestData/RequestData"
import { SEND_EMAIL_TOKEN, CONFIRM_TOKEN_MATCH } from "../../Url/Url"


export const saveGeneralInfo = (general) => {
    return {
        type: actionType.SAVE_GENERAL_INFO,
        payload: general
    }
}

export const saveDataAndTime = (dateAndTime) => {
    return {
        type: actionType.SAVE_DATE_TIME,
        payload: dateAndTime
    }

}
export const saveLocation = (location) => {
    return {
        type: actionType.SAVE_LOCATION,
        payload: location
    }
}
export const saveEmailManger = (emailManager) => {
    return {
        type: actionType.SAVE_EMAIL_MANAGER,
        payload: emailManager
    }
}
export const sendEmailToken = (data) => {
    var data = {
        url: SEND_EMAIL_TOKEN,
        method: "post",
        header: "",
        data: data,
        params: ""
    }
    return dispatch => {
        return getRequestData(data).then(res => {
            return Promise.resolve(res)
        }).catch(err => {

            return Promise.reject(err)
        })
    }
}
export const checkValidToken = (data) => {
    var data = {
        url: CONFIRM_TOKEN_MATCH,
        method: "post",
        headers: "",
        data: data,
        params: ""
    }
    return dispatch => {
        return getRequestData(data).then(res => {
            return Promise.resolve(res)
        }).catch(err => {
            return Promise.reject(err)
        })
    }
}