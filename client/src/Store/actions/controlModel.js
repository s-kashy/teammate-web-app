import * as typeAction from "./actionType"

export const closeErrorMsg = () => {
  return {
    type: typeAction.CLOSE_ERROR_MSG
  }
}
export const openErrorMsg = () => {
  return {
    type: typeAction.OPEN_ERROR_MSG
  }
}
export const processRequestMsg = (req) => {
  return {
    type: typeAction.PROCESS_REQUEST_MSG,
    payload: req
  }
}
export const resetModel = () => {
  return {
    type: typeAction.RESET_MODEL
  }
}
export const isMemberMsg=()=>{
  return {
    type:typeAction.IS_ALREADY_MEMBER
  }
}