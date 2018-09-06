import Vue from 'vue'
import Router from 'vue-router'

import layout from '@/views/layout'
import index from '@/views/index/index'


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: layout,
            children: [
                {path: '', component: index},
                // {path: 'icon', component: resolve => require(['@/views/index/icon'], resolve)},
                //订单
                {path: 'order', component: resolve => require(['@/views/order/index'], resolve)},
                //主机
                {path: 'vm', component: resolve => require(['@/views/vm/list'], resolve), name: 'vm', meta: {permission: 'Vm.select'}},
                {path: 'vmAdd', component: resolve => require(['@/views/vm/add'], resolve), name: 'vmAdd', meta: {permission: 'Vm.add'}},
                {path: 'vmBuyMore', component: resolve => require(['@/views/vm/vmBuyMore'], resolve), meta: {permission: 'Vm.add'}},
                {path: 'vmWatch', component: resolve => require(['@/views/vm/vmWatch'], resolve), meta: {permission: 'Vm.select'}},
                {path: 'vmOp', component: resolve => require(['@/views/vm/vmOp'], resolve), meta: {permission: 'Vm.update'}},
                {path: 'vmUpdate', component: resolve => require(['@/views/vm/vmUpdate'], resolve), meta: {permission: 'Vm.update'}},
                {path: 'vmSnap', component: resolve => require(['@/views/vm/vmSnap'], resolve), meta: {permission: 'Vm.select'}},
                {path: 'vmLog', component: resolve => require(['@/views/vm/vmLog'], resolve), meta: {permission: 'Vm.select'}},
                //弹性IP
                {path: 'net', component: resolve => require(['@/views/net/index'], resolve), meta: {permission: 'Net.select'}},
                //云防火墙
                {path: 'security', component: resolve => require(['@/views/security/index'], resolve), meta: {permission: 'Security.select'}},
                //镜像
                {path: 'image', component: resolve => require(['@/views/image/index'], resolve), meta: {permission: 'Image.select'}},
                //内网虚IP
                {path: 'vip', component: resolve => require(['@/views/vip/index'], resolve), meta: {permission: 'Vip.select'}},
                //共享带宽
                {path: 'sNet', component: resolve => require(['@/views/sNet/index'], resolve), meta: {permission: 'Snet.select'}},
                //负载均衡
                {path: 'nlb', component: resolve => require(['@/views/nlb/index'], resolve), meta: {permission: 'Nlb.select'}},
                {path: 'nlbVserver', component: resolve => require(['@/views/nlb/vserver'], resolve), meta: {permission: 'Nlb.update'}},
                //免费试用
                {path: 'freeTrial', component: resolve => require(['@/views/freeTrial/index'], resolve), meta: {permission: 'Vm.add'}},
                //防攻击
                {path: 'attack', component: resolve => require(['@/views/attack/index'], resolve), meta: {permission: 'Attack.select'}},
                //mysql
                {path: 'mysql', component: resolve => require(['@/views/mysql/index'], resolve), meta: {permission: 'Db.select'}},
                {path: 'mysqlAdd', component: resolve => require(['@/views/mysql/add'], resolve), name: 'mysqlAdd', meta: {permission: 'Db.add'}},
                {path: 'mysqlAddSlave', component: resolve => require(['@/views/mysql/addSlave'], resolve), meta: {permission: 'Db.add'}},
                {path: 'mysqlBackup', component: resolve => require(['@/views/mysql/backup'], resolve), meta: {permission: 'Db.select'}},
                {path: 'mysqlConfigFile', component: resolve => require(['@/views/mysql/configFile'], resolve), meta: {permission: 'Db.select'}},
                {path: 'mysqlWatch', component: resolve => require(['@/views/mysql/watch'], resolve), meta: {permission: 'Db.select'}},
                {path: 'mysqlDetailedInfo', component: resolve => require(['@/views/mysql/detailedInfo'], resolve), meta: {permission: 'Db.select'}},
                {path: 'mysqlUp', component: resolve => require(['@/views/mysql/up'], resolve), meta: {permission: 'Db.update'}},
                {path: 'mysqlBack', component: resolve => require(['@/views/mysql/back'], resolve), meta: {permission: 'Db.select'}},
                {path: 'mysqlLog', component: resolve => require(['@/views/mysql/log'], resolve), meta: {permission: 'Db.select'}},
                {path: 'mysqlDownLog', component: resolve => require(['@/views/mysql/downLog'], resolve), meta: {permission: 'Db.select'}},
                {path: 'mysqlResetPwd', component: resolve => require(['@/views/mysql/resetPwd'], resolve), meta: {permission: 'Db.update'}},
                //redis
                {path: 'redis', component: resolve => require(['@/views/redis/index'], resolve), meta: {permission: 'DbRedis.select'}},
                {path: 'redisAdd', component: resolve => require(['@/views/redis/add'], resolve), meta: {permission: 'DbRedis.add'}},
                {path: 'redisAddSlave', component: resolve => require(['@/views/redis/addSlave'], resolve), meta: {permission: 'DbRedis.add'}},
                {path: 'redisBackup', component: resolve => require(['@/views/redis/backup'], resolve), meta: {permission: 'DbRedis.select'}},
                {path: 'redisConfigFile', component: resolve => require(['@/views/redis/configFile'], resolve), meta: {permission: 'DbRedis.select'}},
                {path: 'redisWatch', component: resolve => require(['@/views/redis/watch'], resolve), meta: {permission: 'DbRedis.select'}},
                {path: 'redisDetailedInfo', component: resolve => require(['@/views/redis/detailedInfo'], resolve), meta: {permission: 'DbRedis.select'}},
                {path: 'redisUp', component: resolve => require(['@/views/redis/up'], resolve), meta: {permission: 'DbRedis.update'}},
                {path: 'redisBack', component: resolve => require(['@/views/redis/back'], resolve), meta: {permission: 'DbRedis.select'}},
                {path: 'redisLog', component: resolve => require(['@/views/redis/log'], resolve), meta: {permission: 'DbRedis.select'}},
                {path: 'redisSlowLog', component: resolve => require(['@/views/redis/slowLog'], resolve), meta: {permission: 'DbRedis.select'}},
                {path: 'redisResetPwd', component: resolve => require(['@/views/redis/resetPwd'], resolve), meta: {permission: 'DbRedis.update'}},
                //ADefence
                {path: 'ADefence', component: resolve => require(['@/views/ADefence/index'], resolve), meta: {permission: 'ADefence.select'}},
                { path: 'ADefence', component:  resolve => require(['@/views/ADefence/index'], resolve) },
                { path: 'ADefenceAdd', component: resolve => require(['@/views/ADefence/add'], resolve) },
                { path: 'ADefenceStrategy', component: resolve => require(['@/views/ADefence/strategy'], resolve)},
                { path: 'ADefenceLog', component: resolve => require(['@/views/ADefence/log'], resolve) },
                // 云物理机
                {path: 'pht', component: resolve => require(['@/views/pht/index'], resolve), meta: {permission: 'Pht.select'}},
                {path: 'phtLog', component: resolve => require(['@/views/pht/phtLog'], resolve), meta: {permission: 'Pht.select'}},
                // 监控告警
                {path: 'monitor', component: resolve => require(['@/views/monitor/index'], resolve), meta: {permission: 'Monitor.select'}},
                // 一键续费
                {path: 'renew', component: resolve => require(['@/views/renew/index'], resolve)},
                // 共享存储
                {path: 'cfs', component: resolve => require(['@/views/cfs/index'], resolve), meta: {permission: 'Cfs.select'}},
                {path: 'cfsLog', component: resolve => require(['@/views/cfs/cfsLog'], resolve), meta: {permission: 'Cfs.select'}},
                {path: 'cfsPermission', component: resolve => require(['@/views/cfs/cfsPermission'], resolve), meta: {permission: 'Cfs.select'}},
                //回收站
                {path: 'recycled', component: resolve => require(['@/views/recycled/index'], resolve)},
                //防暴力破解
                {path: 'cracker', component: resolve => require(['@/views/cracker/index'], resolve), meta: {permission: 'Crack.select'}},
                //帐号与权限
                {path: 'subUser', component: resolve => require(['@/views/subUser/index'], resolve), meta: {permission: 'main'}},
                {path: 'subUserMember', component: resolve => require(['@/views/subUser/member'], resolve), meta: {permission: 'main'}},
                {path: 'subUserRole', component: resolve => require(['@/views/subUser/role'], resolve), meta: {permission: 'main'}},

                //日志
                { path: 'logs', component:  resolve => require(['@/views/logs/index'], resolve), meta: {permission: 'UserLog.select'} },

            ]
        }
    ]

})
