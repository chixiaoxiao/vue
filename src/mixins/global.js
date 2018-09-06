//全局混入
import Vue from 'vue'

let mixin = {
    data() {
        return {
            globalTimer: ''
        }
    },
    methods: {
        getCheckedData(checked, key = '', multiple = false) {
            if (checked.length === 0) {
                this.$message.warning('请选择操作项！');
                return false;
            }
            if (multiple === false && checked.length > 1) {
                this.$message.warning('只能选择单项！');
                return false;
            }
            if (key) {
                let value = checked.map((item) => {
                    return item[key]
                }).join(',');
                return value;
            }
            if (multiple === false) {
                return checked[0];
            }
            return checked;
        },
        pageReload() {
            this.$store.dispatch('pageReload', true);
            this.$nextTick(function () {
                this.$store.dispatch('pageReload', false);
            })
        },
        delay(callback, time = 500) {
            if (this.globalTimer === '') {
                this.globalTimer = setTimeout(() => {
                    callback();
                    this.globalTimer = '';
                }, time)
            }
        },
        notify(res) {
            let type = res.code === 200 ? 'success' : 'error';
            if (Array.isArray(res.msg)) {
                let offset = 0;
                res.msg.forEach((msg) => {
                    this.$notify({
                        type: type,
                        message: msg,
                        offset: offset
                    });
                    offset += 50;
                })
            } else {
                this.$notify({
                    type: type,
                    message: res.msg
                });
            }
        }
    }
};

Vue.mixin(mixin);
