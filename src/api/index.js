/*
 * @Author: Yokee
 * @Date: 2020-11-17 10:14:27
 * @LastEditTime: 2020-11-25 11:02:34
 * @FilePath: \admin\src\api\index.js
 */
import { post, get } from "../request";

//登录
export async function login(data ={username,password}) {
  let res = await post("/api/login/signin",data);
  return res;
}
//修改密码
export async function changePassword({oldPassword,password,rePassword}){
  let res = await post('/api/user/update/password',{oldPassword,password,rePassword})
  return res
}
/***********************       域名管理       ********************* */
//新增域名
export async function createDomain({domain}) {
  let res = await post("/api/admin/domain/create", {domain});
  return res;
}
//域名开关
export async function updataDomain({id,status}) { 
  let res= await post('/api/admin/domain/update',{id,status})
  return res
 }
//域名列表
 export async function listDomain(data={page,limit}) { 
   let res =await get('/api/admin/domain/list',data)
   return res
  }
/******************************************************************** */



/**---------------------         短链接         ------------------- */
//修改链接
export async function updataLink(data){
  let res = await post('/api/admin/link/update',data)
  return res
}
//新增链接
export async function createLink(data){
  let res = await post('/api/admin/link/create',data)
  return res
}
//短链接列表
export async function listLink(data) { 
  let res = await get('/api/admin/link/list',data)
  return res
 }

/**---------------------------------------------------------------- */


/***************************        统计       ************************** */
//大分类的每日统计
export async function sysLog(data={start,end,type}) { 
  let res = await get('/api/admin/count/day/sys/log',data)
  return res
 }

 //指定域名的每日统计
 export async function urlLog(data={start,end,type,url}) { 
  let res = await get('/api/admin/count/day/url/log',data)
  return res
 }

 //指定日期间来源域名排行
 export async function topRef({page}) { 
  let res = await get('/api/admin/count/top/ref',{page})
  return res
 }
//指定日期间短域名排行榜
export async function topLite(data={start,end}) { 
  let res = await get('/api/admin/count/top/lite',data)
  return res
 }

//短时间内访问次数
export async function countMi() { 
  let res = await get('/api/admin/count/mi')
  return res
 }

 //短链接访问来源分析 
 export async function refPa({urlId,start,end}) {
   let res = await get('/api/admin/count/ref/pa',{urlId,start,end})
   return res
   }