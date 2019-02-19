import axios from "axios"


export const postRequestData = (data) => {
 
        let url = "/api/auth/sign"
        var data1 = {
            pass:"sda"
        }
      return axios({
          method:'post',
          data:data1,
          url:url})




}

export const getRequestData = () => { }



