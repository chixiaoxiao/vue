//公共验证规则

import Vue from 'vue'

let validator = {
    username: function (rule, value, callback) {
        if (!/^[a-z_A-Z0-9-.\u4e00-\u9fa5]+$/.test(value)) {
            return callback(new Error('请输入中文、数字、字母以及-_.'));
        }
        callback();
    },
    userPassword: function (rule, value, callback) {
        if (!/(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{6,20}$/.test(value)) {
            return callback(new Error('请填写6-20位字母、数字及符号的两种组合'));
        }
        callback();
    },
    resourceName: function (rule, value, callback) {
        if (!/^[a-z_A-Z0-9-.\u4e00-\u9fa5]{0,64}$/.test(value)) {
            return callback(new Error('请输入小于64位中文、数字、字母以及-_.'));
        }
        callback();
    },
    resourceName2: function (rule, value, callback) {
        if (!/^[a-z_A-Z-.0-9]{1,64}$/.test(value)) {
            return callback(new Error('请输入小于64位字母、数字以及-_.'));
        }
        callback();
    },
    imageName: function (rule, value, callback) {
        if (!/^[a-zA-Z0-9][a-zA-Z0-9.\-\_]{0,64}$/.test(value)) {
            return callback(new Error('字母数字开头，小于64位字母、数字以及-_.'));
        }
        callback();
    },
    ip: function (rule, value, callback) {
        if ( !/^(?:(?:2[0-4][0-9]\.)|(?:25[0-5]\.)|(?:1[0-9][0-9]\.)|(?:[1-9][0-9]\.)|(?:[0-9]\.)){3}(?:(?:2[0-5][0-5])|(?:25[0-5])|(?:1[0-9][0-9])|(?:[1-9][0-9])|(?:[0-9]))$/.test(value) ) {
            return callback(new Error('ip输入不正确'));
        }
        callback();
    },
    password: function (rule, value, callback) {
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,20}$/.test(value)) {
            return callback(new Error(' 请输入至少8~20位大小写字母加数字'));
        }
        callback();
    },
    email: function (rule, value, callback) {
        if (!/^[\w\+\-]+(\.[\w\+\-]+)*@[a-z\d\-]+(\.[a-z\d\-]+)*\.([a-z]{2,4})$/.test(value)) {
            return callback(new Error('请填写有效的邮箱'));
        }
        callback();
    },
    mobile: function (rule, value, callback) {
        if (!/^1[3-9]\d{9}$/.test(value)) {
            return callback(new Error('请填写有效的手机号'));
        }
        callback();
    },
}

Vue.prototype.$validator = validator;
