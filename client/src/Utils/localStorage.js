const xAuth="xAuth"

export const getLocalStorageInfo=()=>{
    let val=localStorage.getItem(xAuth)
    console.log("get from local",val)

}
export const storeInLocalStorage=(data)=>{
    console.log(data)
    localStorage.setItem(xAuth,data)
}

export const removeInfoLocalStorage=()=>{
    localStorage.removeItem(xAuth)
}