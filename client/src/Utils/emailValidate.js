import { isEmail } from "validator"



export const checkEmail = (email) => {
    if (email==="" || email===undefined){
        return false
    }
   
    return isEmail(email)
}
export const checkPassword = (password) => {
        if (password==="" || password===undefined){
            return false
        }
    return password.split("").length >= 6
}
export const checkMatchPassword = (password, confirmPassword) => {
    return password === confirmPassword
}


