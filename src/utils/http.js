import axios from 'axios'
import config from '@/config'
import store from '@/store'
import {Message} from 'element-ui';

axios.defaults.baseURL = config.apiUrl;
axios.defaults.headers.common['authType'] = 'cookie';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config
}, function (error) {
    // Do something with request error
    return Promise.reject(error)
});
// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    if (response.data.code == 401) { //未登录
        location.href = config.homeUrl + '/#in';
    }
    if (response.data.code == 402) { //权限不足
        Message.error('操作权限不足，请联系您的主账号管理员！');
        return new Promise(() => {
        });
    }
    if (response.data.code == 403) { //项目不存在
        location.reload();
    }
    return response.data
}, function (error) {
    // Do something with response error
    return Promise.reject(error)
});

const addParams = function (params) {
    params.local_id = params.hasOwnProperty('local_id') ? params.local_id : store.state.localId;
    params.project_id = params.hasOwnProperty('project_id') ? params.project_id : store.state.projectId;
    return params;
}

const get = function (url, params = {}) {
    params = addParams(params);
    return axios.get(url, {
        params: params
    }).catch(() => {
    });
}

const post = function (url, params = {}) {
    params = addParams(params);
    return axios.post(url, params).catch(() => {
    });
}

const postFile = function (url, params = {}) {
    params = addParams(params);
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    return axios.post(url, params, config);
}

export default {
    get,
    post,
    postFile
};
