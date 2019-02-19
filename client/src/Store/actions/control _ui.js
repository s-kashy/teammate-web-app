import * as typeAction from "./actionType"


export const closeSpinner=()=>{
    return {
        type: typeAction.CLOSE_SPINNER,
        payload: false
      };
    };
}


export const openSpinner=()=>{
    return {
        type: typeAction.OPEN_SPINNER,
        payload: true
      };
    };

