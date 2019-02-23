import axios from "axios"


export const getRequestData = (data) => {

    if (data.method =='post') {
        return axios({
            method: 'post',
            data: data.data,
            url: data.url.toString(),
            headers: data.headers,
            params:data.params
        }).then(res => {
            return Promise.resolve(res)
        }).catch(err=>{
            return Promise.reject(err)
        })
    } else if (data.method==="get"){
      
        return axios({
            method: 'get',
            data: data.data,
            url: data.url,
            headers: data.header,
            params:data.params
        }).then(res=>{
            console.log("res get ",res)
            return Promise.resolve(res)
        }).catch(err=>{
            return Promise.reject(err)
        })
    }
    else{
      
        return axios({
            method: 'delete',
            data: data.data,
            url: data.url,
            headers: data.header,
            params:data.params
        }).then(res=>{
            console.log("res get ",res)
            return Promise.resolve(res)
        }).catch(err=>{
            return Promise.reject(err)
        })
    }

}


