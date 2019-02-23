import * as type from "./actionType"
import { getRequestData } from "../../RequestData/RequestData"
import { LOG_IN_CHECK, SIGN_IN_NEW_USER, LOG_IN_WITH_CREDENTIAL, LOG_OUT } from "../../Url/Url"
import { getLocalStorageInfo, storeInLocalStorage, removeInfoLocalStorage } from "../../Utils/localStorage"



export const setAuth = (result) => {
    return {
        type: type.LOGIN_CHECK_TOKEN,
        payload: result
    }
}
export const loginWithCredential = (userInfo) => {

    let dataSent = {
        url: LOG_IN_WITH_CREDENTIAL,
        header: {
            auth: ""
        },
        method: "post",
        data: { email: userInfo.email, password: userInfo.password },
        params: ""
    }
    return dispatch => {
        return getRequestData(dataSent).then(res => {
            console.log("res from server", res)
            storeInLocalStorage(res.headers.auth)
            dispatch(setAuth(true))
            return Promise.resolve("200")
        }).catch(err => {
            console.log(err)
            dispatch(setAuth(false))
            return Promise.reject("400")

        })
    }

}
export const authCheckState = () => {
    var token = getLocalStorageInfo()

    var data = {
        url: LOG_IN_CHECK,
        method: "get",
        header: {
            auth: token
        },
        data: null,
        params: ""
    }
    return dispatch => {
        if (token !== null) {
            getRequestData(data).then(res => {
                dispatch(setAuth(true))
            }).catch(err => {
                dispatch(setAuth(false))
            })
        } else {
            dispatch(setAuth(false))
        }

    }

}

export const newUserJoin = (newUser) => {

    return dispatch => {
        let dataSent = {
            url: SIGN_IN_NEW_USER,
            header: {
                auth: ""
            },
            method: "post",
            data: { email: newUser.email, password: newUser.password },
            params: ""
        }
        return getRequestData(dataSent).then(res => {
            storeInLocalStorage(res.headers.auth)
            dispatch(setAuth(true))
            return Promise.resolve("200")
        }).catch(err => {
            console.log(err)

            dispatch(setAuth(false))
            return Promise.reject("400")


        })
    }


}
export const logoutUser = () => {
var token=getLocalStorageInfo()
    return dispatch => {
        let dataSent = {
            url: LOG_OUT,
            header: {
                auth: token
            },
            method: "delete",
            data: "",
            params: ""
        }
        return getRequestData(dataSent).then(res => {
         
         
            removeInfoLocalStorage()
            dispatch(setAuth(false))
            return Promise.resolve("200")
        }).catch(err => {
            console.log(err)
            removeInfoLocalStorage()
            dispatch(setAuth(false))
            return Promise.reject("400")


        })
    }



}




