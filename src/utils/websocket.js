// WebSocket
import config from '@/config';
import Bus from '@/utils/bus'

let ws = '';

function socket_connect(init_send_msg) {
    ws = new WebSocket(config.socketUrl)
    ws.onopen = function () {
        // Web Socket 已连接上，使用 send() 方法发送数据
        console.log('socket open success ...')
        ws.send(JSON.stringify(init_send_msg));

        ws.onmessage = function (evt) {
            let data = evt.data;
            data = JSON.parse(data)
            console.log(data)
            wsMessage(data);
            let messageType = data.product + 'Message';
            Bus.$emit(messageType, data);
        }

        ws.onclose = function () {
            setTimeout(function () {
                console.log("socket reconnect ...");
                socket_connect(init_send_msg)
            }, 2000)
        }

        ws.onerror = function () {
           console.log("socket error ...");
        };

    };

    
}

function wsMessage(data) {
    let type = '', operate = '', result = '';
    switch (data.product) {
        case 'pht' :
            type = "物理机";
            break;
        case 'vm' :
            type = "主机";
            break;
        case 'mysql' :
            type = "MySQL";
            break;
        case 'redis' :
            type = "Redis";
            break;
        case 'spt' :
            type = "快照";
            break;
        case 'img' :
            type = "镜像";
            break;
        case 'cfs' : 
            type = '共享存储';
            break;
        case 'permission' : 
            type = '子账号';
            break;
        default:
            type = '资源';
            break;
    }
    switch (data.operateCommand) {
        case 'Add' :
            operate = "创建";
            break;
        case 'Restart' :
            operate = "重启";
            break;
        case 'Start' :
            operate = "开机";
            break;
        case 'Halt' :
            operate = "关机";
            break;
        case 'Upgrade' :
            operate = "升级";
            break;
        case 'Reinstall' :
            operate = "重装";
            break;
        case 'Delete' :
            operate = "删除";
            break;
        case 'ScaleCapacity' : 
            operate = '系统扩容';
            break;
        case 'roleUpdate' : 
            operate = '权限改变';
            break;
        case 'updateMemberRole' : 
            operate = '权限角色被改变';
            break;
        default:
            operate = '操作';
            break;
    }
    switch (data.result) {
        case '0' :
            result = "中...";
            break;
        case '1' :
            result = data.product == 'permission' ? '': "成功!";
            break;
        case '-1' :
            result = "失败!";
            break;
    }
    Bus.$notify({
        title: '提示',
        message: type + ' ' + data.name + ' ' + operate + result,
        type: data.result == -1 ? 'error' : 'success',
    });
}

export default {
    init: function (init_send_msg) {
        socket_connect(init_send_msg)
    },
    send(msg) {
        ws.send(msg);
    }
}



