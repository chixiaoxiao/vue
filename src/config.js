import Vue from 'vue'

let config = Object.assign(window.config, {
    node: {
        beijing: '北京',
        wuxi: '无锡'
    },
    mysqlVersion : {
        1: 'mysql5.6',
        2: 'mysql5.7'
    },
    redisVersion : {
        1: 'redis3.2',
        2: 'redis4.0'
    },
    productType: {
        VM: '主机',
        UVM: '专属主机',
        BANDWIDTH: '带宽',
        IP: '共享带宽IP',
        SHAREDBAND: '共享带宽',
        DATABASE: 'MySQL',
        REDIS: 'Redis',
        CFS: '共享存储',
        DEF: '高防',
        DEBW: '高防业务带宽',
        PHT: '云物理机'
    },
    countType: {
        hour: '按需',
        month: '包月',
        year: '包年'
    },
    couponType: {
        1: '折扣券',
        2: '满减券',
        3: '试用券',
        4: '免费券'
    },
    ADefenceNode: [
        {"id":"huadong",'name':'华东节点'},{"id":"huabei",'name':'华北节点'},
    ],
    ADefenceIps: {
        'huadong': [{"id":"ct",'name':'电信'},{"id":"mobile",'name':'移动'},{"id":"cnc",'name':'联通'}],
        'huabei': [{"id":"bgp",'name':'BGP'}],
    },
});
Vue.prototype.$config = config;

export default config;
