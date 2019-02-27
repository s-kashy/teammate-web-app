import * as type from "./actionType"
import { getRequestData } from "../../RequestData/RequestData"
import { GET_USER_PROFILE, NEW_PROFILE } from "../../Url/Url"
import { Z_DEFAULT_COMPRESSION } from "zlib";


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

var data={
    email:emailUser
}
    var dataUser = {
        url: GET_USER_PROFILE,
        method: "get",
        header: {
            email: emailUser,
            
        },
        data:"",
        params: ""
    }
    return dispatch => {
        getRequestData(dataUser).then(res => {
         console.log("get user profile =>",res.data)
            dispatch(updateProfileUser(res.data))

        }).catch(err => {

            console.log(err)
        })

    }

}
export const postUserProfile = (rUrl, userProfile) => {
    var data = {
        url: rUrl,
        method: "post",
        header: {
            auth: ""
        },
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
export const initializeUser=(email)=>{
    console.log("initializeUser")
return dispatch=>{
    dispatch(updateUserEmail(email))
    dispatch(getUserProfile(email))
}
}



