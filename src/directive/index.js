//指令
import Vue from 'vue'
import store from '@/store'

//权限指令
Vue.directive('has', {
    update: function (el, binding) {
        let permission = binding.value;
        let permissionList = store.state.permission;
        if (permissionList !== 'all' && !permissionList[permission]) {
            el.style.display = 'none';
        }else{
            el.style.display = '';
        }
    }
});
