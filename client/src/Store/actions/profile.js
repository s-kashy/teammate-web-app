import * as type from "./actionType"
import { getRequestData } from "../../RequestData/RequestData"
import { GET_USER_PROFILE, UPDATE_PROFILE ,NEW_PROFILE} from "../../Url/Url"



export const updateUserEmail = (email) => {

    return {
        type: type.EMAIL_USER,
        payload: email
    }
}

export const updateProfileUser = (profile) => {
    return {
        type: type.PROFILE_USER,
        payload: profile
    }
}

export const getUserProfile = (emailUser) => {

    var dataUser = {
        url: GET_USER_PROFILE,
        method: "get",
        header: {
            email: emailUser,

        },
        data: "",
        params: ""
    }
    return dispatch => {
        getRequestData(dataUser).then(res => {
           dispatch(updateProfileUser(res.data))

        }).catch(err => {
           console.log(err)
        })

    }

}
export const postUserProfile = ( userProfile) => {
    var headersOpt = {
        'content-type': 'multipart/form-data'
    };
    var data = {
        url: NEW_PROFILE,
        method: "post",
        header: headersOpt,
        data: userProfile,
        params: ""
    }
    return dispatch => {
        getRequestData(data).then(res => {
        }).catch(err => {
            console.log(err)
        })
    }

}
export const updateUserProfileOnServer = (id, profileEdit) => {
console.log("update action reducer",profileEdit)
    var data = {
        url: UPDATE_PROFILE,
        method: "post",
        headers: {
            id: id
        },
        data: profileEdit,
        params: ""
    }
    return dispatch => {
        getRequestData(data).then(res => {
            console.log("reducer",res)
        }).catch(err => {
            console.log(err)
        })
    }
}
export const initializeUser = (email) => {
    return dispatch => {
        dispatch(updateUserEmail(email))
        dispatch(getUserProfile(email))
    }
}


