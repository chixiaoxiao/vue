//全局混入
import Vue from 'vue'

/*
    返回日期:2018-06-05
    value值：0为当天，-1为后一天，6近一周，30近一月
 */
let getBeforeDate = function(value) {
    let d = new Date();
    let year = d.getFullYear();
    let mon=d.getMonth()+1;
    let day=d.getDate();
    let s = '';
    if(day <= value){
        if(mon>1) {
            mon=mon-1;
        }
        else {
            year = year-1;
            mon = 12;
        }
    }
    d.setDate(d.getDate()-value);
    year = d.getFullYear();
    mon=d.getMonth()+1;
    day=d.getDate();
    s = year+"-"+(mon<10?('0'+mon):mon)+"-"+(day<10?('0'+day):day);
    return s;
}

export default {
    getBeforeDate
}
