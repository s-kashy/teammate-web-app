import * as type from "./actionType"
import { getRequestData } from "../../RequestData/RequestData"
import { GET_USER_PROFILE, UPDATE_PROFILE } from "../../Url/Url"



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
            console.log("get user profile =>", res.data)
            dispatch(updateProfileUser(res.data))

        }).catch(err => {

            console.log(err)
        })

    }

}
export const postUserProfile = (rUrl, userProfile) => {

    var headersOpt = {
        "Content-type": "Application/json",
    };
    var data = {
        url: rUrl.toString(),
        method: "post",
        header: headersOpt,
        data: userProfile,
        params: ""
    }
    return dispatch => {
        getRequestData(data).then(res => {
            dispatch(updateProfileUser(userProfile))

        }).catch(err => {

            console.log(err)
        })
    }

}
export const updateUserProfileOnServer=(id,profileEdit)=>{
  
    var data = {
        url: UPDATE_PROFILE,
        method: "post",
        headers: {
            id: id
        },
        data: profileEdit,
        params:""
    }
    return dispatch=>{
        getRequestData(data).then(res=>{
            dispatch(getUserProfile(profileEdit))
            console.log(res)
        }).catch(err=>{
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


