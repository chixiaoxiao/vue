import http from '../utils/http';

export default {

    //查询当前用户信息
    getUserInfo() {
        return http.get('getUserInfo');
    }
}

