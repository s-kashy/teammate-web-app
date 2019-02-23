

export const getLocalStorageInfo=()=>{
   return localStorage.getItem('auth');

   

}
export const storeInLocalStorage=(data)=>{
       localStorage.setItem("auth",data)
}

export const removeInfoLocalStorage=()=>{
    localStorage.removeItem("auth")
    
}