/*
 * @Author: Yokee
 * @Date: 2020-11-18 10:21:06
 * @LastEditTime: 2020-11-18 10:56:24
 * @FilePath: \admin\src\utils\time.js
 */
var dayjs = require('dayjs')
export default function changeTime(time){
    return dayjs(time).format('YYYY-MM-DD')
}