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
            console.log(res)
            return Promise.resolve(res)
        }).catch(err => {
            console.log("err",err)
            return Promise.reject(err)
        })
    }
}
export const checkValidToken = (data) => {
    var data = {
      url: CONFIRM_TOKEN_MATCH,
      method: "get",
      header: "",
      data: data,
      params: ""
  }
  return dispatch => {
      return getRequestData(data).then(res => {
          console.log("action res",res)
          return Promise.resolve(res)
      }).catch(err => {
          console.log("err",err)
          return Promise.reject(err)
      })
  }
}