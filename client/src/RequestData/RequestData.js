import axios from "axios"


export const getRequestData = (data) => {

    if (data.method === 'post') {
       
        return axios.request({
            method: 'post',
            data: data.data,
            url: data.url.toString(),
            config: {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            },
            headers: data.headers,
            params: data.params
        }).then(res => {
            return Promise.resolve(res)
        }).catch(err => {
            return Promise.reject(err)
        })
    } else if (data.method == "get") {
    
        return axios.request({
            method: 'get',
            data: data.data,
            url: data.url.toString(),
            headers: data.headers,
            params: data.params
        }).then(res => {
            return Promise.resolve(res)
        }).catch(err => {
            return Promise.reject(err)
        })
    }
    else {

        return axios.request({
            method: 'delete',
            data: data.data,
            url: data.url,
            headers: data.header,
            params: data.params,

        }).then(res => {

            return Promise.resolve(res)
        }).catch(err => {
            return Promise.reject(err)
        })
    }

}

