import * as type from "./actionType"
import { getRequestData } from "../../RequestData/RequestData"
import { GET_USER_PROFILE, UPDATE_PROFILE, NEW_PROFILE, UPDATE_PROFILE_NO_IMAGE, NEW_PROFILE_NO_IMAGE } from "../../Url/Url"


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
        headers: {
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
export const updateUserNoImage = (id, userProfile) => {

    var data = {
        url: UPDATE_PROFILE_NO_IMAGE,
        method: "post",
        header: {
            id: id
        },
        data: userProfile,
        params: ""
    }
    return dispatch => {
        getRequestData(data).then(res => {
            dispatch(updateProfileUser(res.data))
        }).catch(err => {
            console.log(err)
        })
    }

}
export const newUserNoImageUpload = (newUserProfile) => {
    var data = {
        url: NEW_PROFILE_NO_IMAGE,
        method: "post",
        header: "",
        data: newUserProfile,
        params: ""
    }
    return dispatch => {
        getRequestData(data).then(res => {
            dispatch(updateProfileUser(res.data))
        }).catch(err => {

        })
    }
}
export const postUserProfile = (userProfile) => {
    var headersOpt = {
        'content-type': 'multiPart/form-data'
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

    var data = {
        url: UPDATE_PROFILE,
        method: "post",
        headers: {
            'content-type': 'multipart/form-data',
            id:id
        },
        data: profileEdit,
        params: ""
    }
    return dispatch => {
        getRequestData(data).then(res => {
            console.log("res", res)
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


