import * as actionType from "./actionType"


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
