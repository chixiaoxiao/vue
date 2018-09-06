<template>
    <div class="layout" v-if="pageShow">
        <div class="layout-header">
            <div class="layout-header-logo">
                <a :href="$config.homeUrl"><img src="~@/assets/images/logo.png"/></a>
            </div>
            <div class="layout-header-menu">
                <ul class="layout-header-menu-left">
                    <li>
                        <router-link to="/">控制台</router-link>
                    </li>
                    <li>
                        <el-badge class="badge" :is-dot="hasTicket">
                            <a :href="$config.accountUrl+'/Support'">工单</a>
                        </el-badge>
                    </li>
                    <li>
                        <el-badge class="badge" :is-dot="hasNotice">
                            <a :href="$config.accountUrl+'/Notice'">消息</a>
                        </el-badge>
                    </li>
                    <li>
                        <el-dropdown placement="bottom-start" @command="projectChange">
                            <span class="project-dropdown-link">
                                <i class="ion-ionic project-mark"></i> {{currentProject.project_name}}<i
                                class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown" class="layout-header-dropdown">
                                <el-dropdown-item v-for="item in projectList" :command="item.id" :key="item.id">
                                    {{item.project_name}}
                                </el-dropdown-item>
                                <el-dropdown-item v-if="userInfo.user_role == 'main'" style="margin-top: 10px;">
                                    <router-link to="subUser">
                                        <el-button size="mini" style="width: 100%;">账号与权限</el-button>
                                    </router-link>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </li>
                    <li>
                        <a href="javascript:;" class="link-to-old-console" @click="toConsole">返回老版</a>
                    </li>
                </ul>
                <ul class="layout-header-menu-right">
                    <li>
                        <el-dropdown @command="userMenuChange">
                            <span class="project-dropdown-link">
                                <i class="ion-person"></i> {{userInfo.phone || '未登录'}}<i
                                class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown" class="layout-header-dropdown">
                                <el-dropdown-item command="user">用户中心</el-dropdown-item>
                                <el-dropdown-item command="updatePwd">修改密码</el-dropdown-item>
                                <el-dropdown-item command="logout" divided>退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </li>
                    <li>
                        <a :href="$config.accountUrl+'/Pay'">
                            <el-button type="warning" size="small" style="font-size: 14px;">充值</el-button>
                        </a>
                    </li>
                    <li v-has="'Vm.add'">
                        <router-link to="/vmAdd">
                            <el-button type="primary" size="small" style="font-size: 14px;">创建主机</el-button>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="layout-body">
            <!--侧边栏 一二级导航-->
            <el-menu :default-active="activeAsideMenu" :collapse="collapse" @select="asideMenuSelect" unique-opened
                     background-color="#444" text-color="#FFF"
                     active-text-color="#4273ea" class="layout-aside" router>
                <div class="node-select">
                    <i class="el-icon-location"></i>
                    <el-dropdown trigger="click" v-show="!collapse" @command="changeNode">
                        <span>
                            {{node[localId]}}节点
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="(v,k) in node" :key='k' :command="k">{{v}}节点</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <el-submenu :index="'menu'+index1" v-for="(menu1, index1) in menus" :key="index1">
                    <template slot="title">
                        <i :class="menu1.icon"></i>
                        <span>{{menu1.name}}</span>
                    </template>
                    <el-menu-item :index="menu2.path" v-for="(menu2, index2) in menu1.sub" :key="index2">
                        {{menu2.name}}
                    </el-menu-item>
                </el-submenu>
                <div class="menu_collapse" @click="collapse=!collapse"></div>
            </el-menu>
            <div class="layout-content">
                <div class="layout-content-header">
                    <!--站点地图-->
                    <el-tag>{{node[localId]}}节点</el-tag>
                    <el-breadcrumb separator=">">
                        <el-breadcrumb-item :to="{ path: menu.path}" v-for="(menu,index) in getBreadcrumb()"
                                            :key="index">{{menu.name}}
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                    <!--三级导航-->
                    <ul>
                        <li :class="getContentMenuClass(menu.path)" @click="contentMenuClick(menu.path)"
                            v-for="(menu,index) in contentMenu" :key="index" v-if="!menu.show">
                            <i class="bg"></i>
                            <span>{{menu.name}}</span>
                        </li>
                        <li v-if="!contentMenu.length && time" @click="contentMenuClick('vmAdd')">
                            <i class="bg" style="border-bottom-color: #ffe58f;"></i>
                            <span style="color: #4f4f4f;">{{time}} 内购买云主机享 <b style="color: #f56c6c;">6折优惠</b> 哦</span>
                        </li>
                    </ul>
                </div>
                <div class="container">
                    <router-view v-if="!$store.state.pageReload && hasPermission && hasADefenceService"></router-view>

                    <div class="not-permission" v-if="!hasADefenceService">
                        <el-alert
                            title="对不起，当前节点暂不支持高防服务"
                            type="error"
                            description=""
                            show-icon :closable="false">
                        </el-alert>
                    </div>

                    <div class="not-permission" v-if="!hasPermission">
                        <el-alert
                            title="对不起，您没有该页面的访问权限！"
                            type="error"
                            :description='$route.meta.permission == "main"?"":"如您需要访问该页面，请联系您的主账号管理员分配权限。"'
                            show-icon :closable="false">
                        </el-alert>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import apiUser from '@/api/user';
    import apiProject from '@/api/project';
    import apiNotice from '@/api/notice';
    import apiTicket from '@/api/ticket';
    import websocket from '@/utils/websocket';
    import Bus from '@/utils/bus'

    export default {
        data() {
            return {
                menus: [
                    {
                        name: '计算', icon: 'bigger-menu-compute', sub: [
                            {
                                name: '云主机', path: '/vm', sub: [
                                    {name: '主机监控', path: '/vmWatch'},
                                    {name: '操作主机', path: '/vmOp'},
                                    {name: '升级配置', path: '/vmUpdate'},
                                    {name: '快照管理', path: '/vmSnap'},
                                    {name: '主机日志', path: '/vmLog'}
                                ]
                            },
                            {name: '镜像', path: '/image'},
                            {
                                name: '云物理机', path: '/pht', sub: [
                                    {name: '物理机日志', path: '/phtLog', show: true},
                                ]
                            },
                        ]
                    },
                    {
                        name: '网络', icon: 'bigger-menu-network', sub: [
                            {name: '弹性IP', path: '/net'},
                            {name: '共享带宽', path: '/snet'},
                            {name: '内网虚拟IP', path: '/vip'},
                            {
                                name: '负载均衡', path: '/nlb', sub: [
                                    {name: '监听器', path: '/nlbVserver', show: true},
                                ]
                            }
                        ]
                    },
                    {
                        name: '云安全', icon: 'bigger-menu-safety', sub: [
                            {name: '云防火墙', path: '/security'},
                            {name: '防攻击', path: '/attack'},
                            {name: '防暴力破解', path: '/cracker'},
                            {name: '监控告警', path: '/Monitor'},
                            {name: '高防服务', path: '/ADefence', sub: [
                                {name: '操作日志', path: '/ADefenceLog', show: true},
                            ]},
                        ]
                    },
                    {
                        name: '云数据库', icon: 'bigger-menu-database', sub: [
                            {
                                name: 'MySQL', path: '/mysql', sub: [
                                    {name: '性能监控', path: '/mysqlWatch'},
                                    {name: '详细信息', path: '/mysqlDetailedInfo'},
                                    {name: '升级配置', path: '/mysqlUp'},
                                    {name: '制作备份', path: '/mysqlBack'},
                                    {name: '操作日志', path: '/mysqlLog'},
                                    {name: '实例日志', path: '/mysqlDownLog'},
                                    {name: '重置密码', path: '/mysqlResetPwd'}
                                ]
                            },
                            {
                                name: 'Redis', path: '/redis', sub: [
                                    {name: '性能监控', path: '/redisWatch'},
                                    {name: '详细信息', path: '/redisDetailedInfo'},
                                    {name: '升级配置', path: '/redisUp'},
                                    {name: '制作备份', path: '/redisBack'},
                                    {name: '操作日志', path: '/redisLog'},
                                    {name: '慢查询分析', path: '/redisSlowLog'},
                                    {name: '重置密码', path: '/redisResetPwd'}
                                ]
                            }
                        ]
                    },
                    {
                        name: '存储', icon: 'bigger-menu-storage', sub: [
                            {name: '共享存储', path: '/cfs', sub: [
                                {name: '权限组', path: '/cfsPermission', show: true},
                                {name: '操作日志', path: '/cfsLog', show: true},
                            ]},
                        ]
                    },
                    {
                        name: '管理工具', icon: 'bigger-menu-tool', sub: [
                            {
                                name: '帐号与权限', path: '/subUser', sub: [
                                    {name: '项目管理', path: '/subUser'},
                                    {name: '帐号管理', path: '/subUserMember'},
                                    {name: '角色管理', path: '/subUserRole'}
                                ]
                            },
                            {name: '一键续费', path: '/renew'},
                            {name: '回收站', path: '/recycled'},
                            {name: '操作日志', path: '/logs'}
                        ]
                    }
                ],
                node: config.node,
                activeAsideMenu: "/vm",
                collapse: false,
                projectList: [],
                currentProject: {},
                hasNotice: false,
                hasTicket: false,
                pageShow: false,
                time: '',
            }
        },
        computed: {
            localId: function () {
                return this.$store.state.localId
            },
            contentMenu: function () {
                let _this = this;
                let contentMenu = [];
                _this.activeAsideMenu = '/';
                this.menus.forEach(function (item) {
                    if (item.sub) {
                        item.sub.forEach(function (item2) {
                            if (_this.$route.path.startsWith(item2.path)) {
                                _this.activeAsideMenu = item2.path;
                                if (item2.sub) {
                                    contentMenu = item2.sub;
                                }
                            }
                        })
                    }
                });
                if (contentMenu.map(i => {
                    return i.path
                }).includes(this.$route.path)) {
                    return contentMenu;
                } else {
                    return [];
                }
            },
            userInfo: function () {
                return this.$store.state.userInfo;
            },
            hasPermission: function () {
                if (this.$store.state.projectId === '') {
                    return false;
                }
                let permission = this.$route.meta.permission;
                let permissionList = this.$store.state.permission;
                if (typeof(permission) !== 'undefined' && permissionList !== 'all' && !permissionList[permission]) {
                    return false;
                }
                return true;
            },
            hasADefenceService: function(){
                if( this.$store.state.localId == 'beijing' ){
                    if( this.$route.path == '/ADefence' || this.$route.path == '/ADefenceAdd' || this.$route.path == '/ADefenceLog' || this.$route.path == '/ADefenceStrategy' ){
                        return false
                    }
                }
                return true;
            }
        },
        created: function () {
            this.init();
            this.getNoticeNum();
            this.getTicketNum();
            this.setProjectList();
        },
        methods: {
            changeNode(v) {
                if (this.localId != v) {
                    this.$store.dispatch('changeNode', v);
                    this.pageReload();
                }
            },
            asideMenuSelect(index) {
                this.activeAsideMenu = index;
            },
            contentMenuClick(path) {
                this.$router.push({path: path})
            },
            getContentMenuClass(path) {
                return this.$route.path === path ? 'active' : '';
            },
            getBreadcrumb() {
                return this.getBreadcrumbRecursive(this.menus, this.$route.path);
            },
            getBreadcrumbRecursive(menu, currentPath) {
                let _this = this;
                let paths = [];
                menu.forEach(function (item) {
                    if (item.path === currentPath) {
                        paths.push({name: item.name, path: item.path});
                    } else {
                        if (item.sub) {
                            let temp = _this.getBreadcrumbRecursive(item.sub, currentPath);
                            if (temp.length !== 0) {
                                paths.push({name: item.name, path: item.path});
                                paths = paths.concat(temp);
                            }
                        }
                    }
                })
                return paths;
            },
            init() {
                apiUser.getUserInfo().then(res => {
                    if(res.code === 200){
                        this.$store.dispatch('login', res.data);
                        this.time = res.data.auth_time;
                        this.time && this.countDown();
                        websocket.init({"uid": res.data.ws_token})
                        Bus.$on('permissionMessage', () => {
                            this.getPermissionList();
                        });
                    }
                }).then(() => {
                    this.getProjectList();
                })
            },
            getProjectList() {
                apiProject.projectSelect({page_size: 50}).then(res => {
                    this.projectList = res.data.list;
                    this.setCurrentProject();
                }).then(() => {
                    this.getPermissionList();
                })
            },
            getPermissionList() {
                apiProject.memberHasPermission(this.$store.state.projectId).then(res => {
                    this.$store.dispatch('setPermission', res.data);
                }).then(() => {
                    this.pageShow = true;
                });
            },
            projectChange(command) {
                this.$store.dispatch('changeProject', command);
                this.setCurrentProject();
                this.pageReload();
            },
            setCurrentProject() {
                let currentProjectId = this.$store.state.projectId;
                let currentProjectExist = false;
                this.projectList.forEach((item, index) => {
                    if (item.id == currentProjectId) {
                        this.currentProject = item;
                        currentProjectExist = true;
                    }
                })
                if (!currentProjectExist) {
                    if (this.projectList.length > 0) {
                        this.currentProject = this.projectList[0];
                        this.$store.dispatch('changeProject', this.currentProject.id);
                    } else {
                        this.currentProject = {};
                        this.$store.dispatch('changeProject', '');
                    }
                }
            },
            toConsole() {
                var d = new Date();
                d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
                var expires = "expires=" + d.toUTCString();
                window.document.cookie = "consoleUrl=old; path=/; domain=.biggeryun.com; " + expires;
                window.location.href = this.$config.consoleOldUrl;
            },
            userMenuChange(command) {
                if (command == 'user') {
                    window.location.href = this.$config.accountUrl;
                } else if (command == 'updatePwd') {
                    window.location.href = this.$config.accountUrl + '/Index/update_pwd';
                } else if (command == 'logout') {
                    window.location.href = this.$config.accountUrl + '/User/out';
                }
            },
            getNoticeNum() {
                apiNotice.getUnreadNum().then(res => {
                    this.hasNotice = res.data > 0;
                });
            },
            getTicketNum() {
                apiTicket.getUnreadNum().then(res => {
                    this.hasTicket = res.data > 0;
                });
            },
            setProjectList() {
                Bus.$on('projectDelete', () => {
                    this.getProjectList();
                });
            },
            countDown() {
                let time = this.time.split(':');
                let h = parseInt(time[0]);
                let m = parseInt(time[1]);
                let s = parseInt(time[2]);
                s--;
                if (s < 0) {
                    s = 59;
                    m--;
                    if (m < 0) {
                        m = 59;
                        h--;
                    }
                }
                s = s < 10 ? '0' + s: s;
                m = m < 10 ? '0' + m: m;
                h = h < 10 ? '0' + h: h;
                this.time = h + ':' + m + ':' + s;
                if (s == 0 && m == 0 && h == 0) {
                    this.time = 0;
                } else {
                    setTimeout( this.countDown, 1000);
                }
            }
        }
    };
</script>

<style>
    /*下拉框  覆盖默认样式*/
    .layout-header .el-dropdown {
        color: #97b2d3;
        cursor: pointer;
    }

    .layout-header-dropdown {
        background: #203d60;
        border: none;
        min-width: 120px;
        max-width: 200px;
        overflow-x: hidden;
        max-height: 300px;
        overflow-y: auto;
    }

    .layout-header-dropdown .el-dropdown-menu__item {
        color: #97b2d3;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .layout-header-dropdown .el-dropdown-menu__item:hover {
        background: #152d49;
    }

    .layout-header-dropdown .popper__arrow {
        display: none;
    }

    .layout-header-dropdown .el-dropdown-menu__item--divided {
        border: none;
    }

    .layout-header-dropdown .el-dropdown-menu__item--divided:before {
        background-color: #152d49;
    }
</style>
<style scoped>
    .layout-header a.link-to-old-console{display: inline-block; width: 88px; height: 30px; background: #0e2a4d; font-size:14px; border:1px solid #97b2d3; color: #97b2d3; line-height: 30px; border-radius: 2px; text-align: center;}
    .layout-header a.link-to-old-console:hover{text-decoration: none; }
    .layout {
        width: 100%;
        height: 100%;
        min-width: 1210px;
        display: flex;
        flex-flow: column wrap;
    }

    /*头部*/
    .layout-header {
        height: 64px;
        background-color: #203d60;
        padding: 0 60px;
        font-size: 14px;
        color: #97b2d3;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
    }

    .layout-header a {
        color: #97b2d3;
    }

    /*logo*/
    .layout-header-logo {
        flex: 1;
    }

    .layout-header-logo a {
        display: block;
    }

    /*顶部菜单*/
    .layout-header-menu {
        flex: 8;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .project-mark {
        color: #27CD69;
    }

    .layout-header-menu > ul {
        display: flex;
        height: 100%;
        align-items: center;
    }

    .layout-header-menu li {
        padding: 0 20px;
    }

    .layout-body {
        flex: 1;
        display: flex;
        flex-flow: row nowrap;
        align-items: stretch;
        overflow: hidden;
    }

    .layout-content {
        flex: 1;
        display: flex;
        flex-flow: column nowrap;
        padding: 0 0 20px 20px;
        background: #f4f5f5;
    }

    .layout-content-header {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
    }

    .el-tag {
        color: #fff;
        background: #0c6;
        border-radius: 0;
        margin-right: 5px;
    }

    .layout-content-header ul {
        flex: 1;
        text-align: right;
        display: flex;
        height: 40px;
        justify-content: flex-end;
        align-items: flex-end;
        padding-right: 10px;
    }

    .layout-content-header ul li {
        box-sizing: border-box;
        padding: 0 20px;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        position: relative;
        cursor: pointer;
    }

    .layout-content-header ul li.active {
        color: #fff;
    }

    .layout-content-header ul li .bg {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        box-sizing: border-box;
        border-left: 10px solid transparent;
        border-bottom: 30px solid #e2e2e2;
    }

    .layout-content-header ul li.active .bg {
        border-bottom-color: #4273ea;
    }

    .layout-content-header ul li span {
        position: relative;
        z-index: 2;
    }

    .container {
        flex: 1;
        background: #fff;
        overflow: auto;
        padding-left: 10px;
        box-sizing: border-box;
    }

    .el-icon-location {
        font-size: 18px;
        color: #0c6;
    }

    .node-select .el-dropdown-selfdefine {
        cursor: pointer;
        color: #fff;
    }

    .layout-aside:not(.el-menu--collapse) {
        width: 180px;
        flex: none;
    }

    .el-submenu .el-menu-item {
        min-width: 180px;
    }

    .el-submenu [class^="ion-"] {
        vertical-align: middle;
        margin-right: 5px;
        width: 24px;
        display: inline-block;
        text-align: center;
        font-size: 18px;
    }

    .el-submenu__title i, .el-menu-item i {
        color: #fff;
    }

    .menu_collapse {
        position: absolute;
        top: 40%;
        left: 100%;
        height: 30px;
        border-bottom: 10px solid transparent;
        border-left: 20px solid #d9dee4;
        border-top: 10px solid transparent;
        cursor: pointer;
    }

    .node-select {
        display: flex;
        height: 50px;
        justify-content: center;
        align-items: center;
        white-space: nowrap;
    }

    .not-permission {
        margin-top: 20px;
    }
</style>
