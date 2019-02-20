import * as type from "./actionType"
import {  getRequestData } from "../../RequestData/RequestData"
import { LOG_IN_CHECK, SIGN_IN_NEW_USER, LOG_IN_WITH_CREDENTIAL, LOG_OUT } from "../../Url/Url"
import { getLocalStorageInfo, storeInLocalStorage, removeInfoLocalStorage } from "../../Utils/localStorage"



export const setAuth = (result) => {
    return {
        type: type.LOGIN_CHECK_TOKEN,
        payload: result
    }
}

export const authCheckState = () => {
    let token = getLocalStorageInfo()
    let data = {
        url: LOG_IN_CHECK,
        headers: token,
        method: "post",
        data: null,
        params:""
    }
    return dispatch => {
        if (token !== null) {
            getRequestData(data).then(res => {
                console.log(res)
            }).catch(err => {
                setAuth(false)
            })
        } else {
            dispatch(setAuth(false))
        }

    }

}

export const newUserJoin = (data) => {
    let dataSent = {
        url: SIGN_IN_NEW_USER,
        header: "",
        method: "post",
        data: data
    }
    getRequestData(dataSent).then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)

    })

}




