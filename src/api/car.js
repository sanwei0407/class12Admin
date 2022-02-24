import $api from './api'

export  const  getAll = async (data)=>{
   let res = await  $api.post('/car/getAll',data);
   return res.data;
}

export  const addCar = async  (data)=>{
  let res = await  $api.post('/car/create',data);
  return res.data;
}

export const delCar = async (data)=>{
  let res = await  $api.post('/car/del',data);
  return res.data;
}
