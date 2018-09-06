//全局过滤器
import Vue from 'vue'

let filters = {
    //格式化金额
    formatAmount: function (value, minus = '返款') {
        if (isNaN(value)) {
            return value;
        }
        let res = parseFloat(value).toFixed(2);
        if (res < 0) {
            res = minus + ' ' + Math.abs(res).toFixed(2);
        }
        return res
    },
    // 格式化镜像版本
    imageVersion: function (value) {
        if (!value) {
            return false;
        }
        value = value.replace('Windows', 'Win').replace('Standard', '标准版').replace('Datacenter', '数据中心版').replace('Enterprise', '企业版');
        return value + (value.indexOf('Win') === 0 ? '位（CN）' : '位');
    },
    //单位转换
    unitChange: function (value) {
        let size = '';
        if (!value) {
            size = 0 + 'B'
        } else if (value < 1024) {
            size = value + 'B'
        } else if (value < 1024 * 1024) {
            size = (value / 1024).toFixed(2) + 'KB';
        } else {
            size = (value / 1024 / 1024).toFixed(2) + 'MB';
        }
        return size;
    },
    //memory数据转换
    memoryUnit: function (value) {
        return value <= 1500 ? value / 1000 : value / 1024;
    },
    //套餐转换
    formatCountType: function (value) {
        let name = '';
        switch (value) {
            case 'year':
                name = '包年';
                break;
            case 'month':
                name = '包月';
                break;
            case 'hour':
                name = '按需';
                break;
        }
        return name;
    },
    //隐藏手机号中间4位
    formatPhone: function (value) {
        var reg = /^(\d{3})\d{4}(\d{4})$/;
        
        return value.replace(reg, "$1****$2");
    }
}

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
