import axios from 'axios'

const $api = axios.create({
  baseURL:'http://127.0.0.1:7001/api'
})


// 响应拦截
// $api.interceptors.response((res)=>{
//   return res.data;
// })

export  default  $api;
