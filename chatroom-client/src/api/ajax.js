import axios  from 'axios';
import * as requestTypes from './request-types';

/**
 * url字符串拼接
 * @param {数据} data 
 */
function getParamStr(url,data){
    return url+"/"+data;
}


export default (url,data={},type)=>{
    switch(type){
        case requestTypes.GET:
            return axios.get(getParamStr(url,data));
        case requestTypes.POST:
            return axios.post(url,data);
        case requestTypes.PUT:
            return axios.put(url,data);
        case requestTypes.PATCH:
            return axios.patch(url,data);
        case requestTypes.DELETE:
            return axios.delete(getParamStr(url,data));
        default:
            return;
    }
}