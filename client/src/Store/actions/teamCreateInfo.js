import * as actionType from "./actionType"
import { getRequestData } from "../../RequestData/RequestData"
import {GET_USER_TEAMS, JOIN_TEAM, SEND_EMAIL_TOKEN, CONFIRM_TOKEN_MATCH, NEW_TEAM, MANAGER_INFO_EXIST, FIND_TEAM_BY_CATEGORIES } from "../../Url/Url"


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
            console.log("res valid token", res)
            return Promise.resolve(res)
        }).catch(err => {
            return Promise.reject(err)
        })
    }
}
export const submitManagerCard = (data) => {
    var data = {
        url: NEW_TEAM,
        method: "post",
        headers: {
            'content-type': 'multipart/form-data',
        },
        data: data,
        params: ""
    }
    return dispatch => {
        return getRequestData(data).then(res => {
            console.log("result ", res)
            return Promise.resolve(res)
        }).catch(err => {
            return Promise.reject(err)
        })
    }
}
export const checkIfUserIsManager = (email) => {
    var data = {
        url: MANAGER_INFO_EXIST,
        method: "get",
        headers: "",
        data: email,
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

export const getTeamsByCategoryType = (data) => {
    var data = {
        url: FIND_TEAM_BY_CATEGORIES,
        method: "post",
        headers: {
            "content-type": 'application/json'

        },
        data: data,
        params: ""
    }
    return dispatch => {
        return getRequestData(data).then(res => {
            dispatch(loadYourTeams(res.data))
            return Promise.resolve(res)
        }).catch(err => {
            return Promise.reject(err)
        })
    }
}
export const viewTeamToJoin = (teamInfo) => {
    return dispatch => {
        dispatch(saveGeneralInfo(teamInfo.generalInfo))
        dispatch(saveDataAndTime(teamInfo.dateAndTime))
        dispatch(saveLocation(teamInfo.location))
        dispatch(saveEmailManger(teamInfo.emailManger))
    }
}

export const joinTeam = (data) => {
    var data = {
        url: JOIN_TEAM,
        method: "post",
        headers: {
            id: data.id
        },
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
export const getUsersTeams=(dataEmail)=>{
    var data = {
        url: GET_USER_TEAMS,
        method: "get",
        headers: {
            id: dataEmail.id
        },
        data: "",
        params: ""
    }
    return dispatch=>{
       return getRequestData(data).then(res=>{
            dispatch(loadYourTeams(res.data))
            return Promise.resolve(res.data)
        })
    }
}
export const loadYourTeams = (data) => {
    return {
        type: actionType.YOUR_TEAMS,
        payload: data
    }
}
export const clearAllTeams=()=>{
    return {
        type:actionType.CLEAR_ALL_TEAMS
    }
}