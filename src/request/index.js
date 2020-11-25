/*
 * @Author: Yokee
 * @Date: 2020-11-17 09:52:23
 * @LastEditTime: 2020-11-25 10:59:41
 * @FilePath: \admin\src\request\index.js
 */
import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.headers.get["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.transformRequest = [
  function(data) {
    let ret = "";
    for (let it in data) {
      if (
        data[it] instanceof Array ||
        data[it] instanceof Object ||
        data[it] instanceof Number
      ) {
        data[it] = JSON.stringify(data[it]);
      }
      ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
    }
    return ret;
  }
];

const service = axios.create({
  baseURL: "https://jump.byteborder.com", // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
});

service.interceptors.request.use(request => {
  const token = store.state?.user?.user?.token
  request.headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    'Authorization': token || ''
  };
  return request;
});
service.interceptors.response.use(
    (response) => {
        //只将请求结果的data字段返回
        const { errorCode, message, success, data } = response.data

        if (!success) {
            Message({
                message:message,
                type: 'error',
                duration:1000
            })
            return false
        } else {
            return response.data.data
        }

    },
    (err) => {
        //发生网络错误后会走到这里
        Message({
            message:'网络错误',
            type: 'error',
            duration:1000
        })
    }
)

export function get(url,data,config){
    return service.get(url,{params:{...data}},
        {...config}
    )
}

export function post(url,data,config){
    return service.post(url,{...data},{...config})
}