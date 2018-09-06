<template>
<div>
    <ul>
        <li><i class="handle-icon-on"></i><copy value="handle-icon-on" width="200px"></copy></li>
        <li><i class="handle-icon-off"></i><copy value="handle-icon-off" width="200px"></copy></li>
        <li><i class="handle-icon-restart"></i><copy value="handle-icon-restart" width="200px"></copy></li>
        <li><i class="handle-icon-del"></i><copy value="handle-icon-del" width="200px"></copy></li>
        <li><i class="handle-icon-lock"></i><copy value="handle-icon-lock" width="200px"></copy></li>
        <li><i class="handle-icon-unlock"></i><copy value="handle-icon-unlock" width="200px"></copy></li>
        <li><i class="handle-icon-tag"></i><copy value="handle-icon-tag" width="200px"></copy></li>
        <li><i class="handle-icon-renew"></i><copy value="handle-icon-renew" width="200px"></copy></li>
        <li><i class="handle-icon-more"></i><copy value="handle-icon-more" width="200px"></copy></li>
        <li><i class="handle-icon-login"></i><copy value="handle-icon-login" width="200px"></copy></li>
        <li><i class="handle-icon-power"></i><copy value="handle-icon-power" width="200px"></copy></li>
        <li><i class="handle-icon-power-grey"></i><copy value="handle-icon-power-grey" width="200px"></copy></li>
        <li><i class="handle-icon-schost"></i><copy value="handle-icon-schost" width="200px"></copy></li>
    </ul>
    <ul>
        <li><i class="handle-icon-new"></i><copy value="handle-icon-new" width="200px"></copy></li>
        <li><i class="handle-icon-update"></i><copy value="handle-icon-update" width="200px"></copy></li>
        <li><i class="handle-icon-time"></i><copy value="handle-icon-time" width="200px"></copy></li>
        <li><i class="handle-icon-edit"></i><copy value="handle-icon-edit" width="200px"></copy></li>
    </ul>
    <ul>
        <li><i class="handle-icon-jurisdiction"></i><copy value="handle-icon-jurisdiction" width="200px"></copy></li>
        <li><i class="handle-icon-defence"></i><copy value="handle-icon-defence" width="200px"></copy></li>
    </ul>
    <ul>
        <li><i class="handle-icon-backup"></i><copy value="handle-icon-backup" width="200px"></copy></li>
        <li><i class="handle-icon-file"></i><copy value="handle-icon-file" width="200px"></copy></li>
        <li><i class="handle-icon-backup-new"></i><copy value="handle-icon-backup-new" width="200px"></copy></li>
        <li><i class="handle-icon-online-edit"></i><copy value="handle-icon-online-edit" width="200px"></copy></li>
        <li><i class="handle-icon-apply"></i><copy value="handle-icon-apply" width="200px"></copy></li>
        <li><i class="handle-icon-import"></i><copy value="handle-icon-import" width="200px"></copy></li>
        <li><i class="handle-icon-query"></i><copy value="handle-icon-query" width="200px"></copy></li>
        <li><i class="handle-icon-auto-backup"></i><copy value="handle-icon-auto-backup" width="200px"></copy></li>
        <li><i class="handle-icon-back-data"></i><copy value="handle-icon-back-data" width="200px"></copy></li>
    </ul>
    <ul>
        <li><i class="handle-icon-edit-security"></i><copy value="handle-icon-edit-security" width="200px"></copy></li>
        <li><i class="handle-icon-visit"></i><copy value="handle-icon-visit" width="200px"></copy></li>
        <li><i class="handle-icon-download"></i><copy value="handle-icon-download" width="200px"></copy></li>
        <li><i class="handle-icon-wrong-list"></i><copy value="handle-icon-wrong-list" width="200px"></copy></li>
        <li><i class="handle-icon-commonip"></i><copy value="handle-icon-commonip" width="200px"></copy></li>
        <li><i class="handle-icon-diflogin"></i><copy value="handle-icon-diflogin" width="200px"></copy></li>
        <li><i class="handle-icon-notifier"></i><copy value="handle-icon-notifier" width="200px"></copy></li>
        <li><i class="handle-icon-monitor"></i><copy value="handle-icon-monitor" width="200px"></copy></li>
        <li><i class="handle-icon-attack"></i><copy value="handle-icon-attack" width="200px"></copy></li>
        <li><i class="handle-icon-add-nlb"></i><copy value="handle-icon-add-nlb" width="200px"></copy></li>
        <li><i class="handle-icon-icon1"></i><copy value="handle-icon-icon1" width="200px"></copy></li>
        <li><i class="handle-icon-setting"></i><copy value="handle-icon-setting" width="200px"></copy></li>
    </ul>
    <ul>
        <li><i class="bigger-present"></i><copy value="bigger-present" width="200px"></copy></li>
        <li><i class="bigger-flow-chart"></i><copy value="bigger-flow-chart" width="200px"></copy></li>
        <li><i class="bigger-edit-btn"></i><copy value="bigger-edit-btn" width="200px"></copy></li>
        <li><i class="bigger-del-btn"></i><copy value="bigger-del-btn" width="200px"></copy></li>
        <li><i class="bigger-help-symbol"></i><copy value="bigger-help-symbol" width="200px"></copy></li>
        <li><i class="bigger-menu-compute bg"></i><copy value="bigger-menu-compute" width="200px"></copy></li>
        <li><i class="bigger-menu-network bg"></i><copy value="bigger-menu-network" width="200px"></copy></li>
        <li><i class="bigger-menu-safety bg"></i><copy value="bigger-menu-safety" width="200px"></copy></li>
        <li><i class="bigger-menu-database bg"></i><copy value="bigger-menu-database" width="200px"></copy></li>
        <li><i class="bigger-menu-storage bg"></i><copy value="bigger-menu-storage" width="200px"></copy></li>
        <li><i class="bigger-menu-tool bg"></i><copy value="bigger-menu-tool" width="200px"></copy></li>
        <li><i class="bigger-slave"></i><copy value="bigger-slave" width="200px"></copy></li>
    </ul>
</div>
</template>

<script>
import copy from "@/views/common/copy";

export default {
    components: {
        copy,
    },
}
</script>

<style scoped>
ul {
    margin-top: 30px;
    display: flex;
    flex-flow: row wrap;
}

li {
    margin-right: 20px;
    line-height: 30px;
    height: 30px;
    font-size: 16px;
}
.bg {
    background-color: #444;
}
</style>
