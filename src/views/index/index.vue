<template>
    <div>
        <div class="row">
            <el-row>
                <el-col :span="18">
                    <el-card class="card" shadow="hover">
                        <div class="card-header">账号信息</div>
                        <div class="card-content">
                            <div class="user-item">
                                <label>ID：</label>
                                <span>{{userInfo.id}}</span>
                            </div>
                            <div class="user-item">
                                <label>账号：</label>
                                <span>{{userInfo.phone}}</span>
                            </div>
                            <div class="user-item">
                                <label>类型：</label>
                                <span>{{userInfo.parent_user_id=='0'?'主账号':'子账号'}}</span>
                            </div>
                            <div class="user-item">
                                <label>账号状态：</label>
                                <span class="user-auth-success" v-if="userInfo.is_auth">已认证</span>
                                <span class="user-auth-error" v-else>未认证</span>
                            </div>
                        </div>
                    </el-card>

                    <el-card class="card" shadow="hover">
                        <div class="card-header">计算</div>
                        <div class="card-content">
                            <div class="product">
                                <div class="product-item">
                                    <label>{{productNum.vm || 0 }}</label>
                                    <span>云主机</span>
                                </div>
                                <div class="product-item">
                                    <label>{{productNum.pht || 0 }}</label>
                                    <span>云物理机</span>
                                </div>
                            </div>
                        </div>

                        <div class="card-header">网络</div>
                        <div class="card-content">
                            <div class="product">
                                <div class="product-item">
                                    <label>{{productNum.net || 0 }}</label>
                                    <span>弹性IP</span>
                                </div>
                                <div class="product-item">
                                    <label>{{productNum.snet || 0 }}</label>
                                    <span>共享带宽</span>
                                </div>
                                <div class="product-item">
                                    <label>{{productNum.vip || 0 }}</label>
                                    <span>内网虚IP</span>
                                </div>
                                <div class="product-item">
                                    <label>{{productNum.nlb || 0 }}</label>
                                    <span>负载均衡</span>
                                </div>
                            </div>
                        </div>

                        <div class="card-header">云安全</div>
                        <div class="card-content">
                            <div class="product">
                                <div class="product-item">
                                    <label>{{productNum.security || 0 }}</label>
                                    <span>云防火墙</span>
                                </div>
                                <div class="product-item">
                                    <label>{{productNum.monitor || 0 }}</label>
                                    <span>监控告警</span>
                                </div>
                                <div class="product-item">
                                    <label>{{productNum.adefence || 0 }}</label>
                                    <span>高防</span>
                                </div>
                            </div>
                        </div>

                        <div class="card-header">存储</div>
                        <div class="card-content">
                            <div class="product">
                                <div class="product-item">
                                    <label>{{productNum.cfs || 0 }}</label>
                                    <span>共享存储</span>
                                </div>
                            </div>
                        </div>

                        <div class="card-header">云数据库</div>
                        <div class="card-content">
                            <div class="product">
                                <div class="product-item">
                                    <label>{{productNum.mysql || 0 }}</label>
                                    <span>MySQL</span>
                                </div>
                                <div class="product-item">
                                    <label>{{productNum.redis || 0 }}</label>
                                    <span>Redis</span>
                                </div>
                            </div>
                        </div>

                    </el-card>
                </el-col>
                <el-col :span="6" style="padding: 0 15px;">
                    <!-- <div class="system-msg">云主机再升级，免费试用最高可达 30 天！</div> -->
                    
                    <el-card class="card" shadow="hover" v-if="userInfo.user_role=='main'">
                        <div class="card-header">财务信息</div>
                        <div class="card-content">
                            <div class="account">
                                <div class="account-item">
                                    <label>余额：</label>
                                    <span>{{userInfo.amount | formatAmount('-')}} 元</span>
                                    <a :href="$config.accountUrl+'/Pay'" class="account-link">去充值</a>
                                </div>
                                <div class="account-item">
                                    <label>优惠券：</label>
                                    <span>{{couponNum}} 张</span>
                                </div>
                                <div class="account-btn">
                                    <el-button @click="goTrans()">交易记录</el-button>
                                    <el-button @click="goBill()">本月账单</el-button>
                                </div>
                            </div>
                        </div>
                    </el-card>

                    <el-card class="card" shadow="hover">
                        <div class="card-header">待办事项</div>
                        <div class="card-content">
                            <div class="message">
                                <!-- <div class="message-item">
                                    <label>未处理工单：</label>
                                    <span><i class="message-num">{{ticketNum}}</i> 个</span>
                                    <a :href="$config.accountUrl+'/Support'" class="message-link">去处理</a>
                                </div> -->
                                <div class="message-item">
                                    <label>即将到期资源（7天）：</label>
                                    <span><i class="message-num">{{productDueNum}}</i> 个</span>
                                    <router-link to="/renew" class="message-link">去续费</router-link>
                                </div>
                            </div>
                        </div>
                    </el-card>

                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>

    import apiCoupon from '@/api/coupon';
    import apiTicket from '@/api/ticket';
    import apiProduct from '@/api/product';

    export default {
        name: 'index',
        data() {
            return {
                couponNum: 0,
                ticketNum: 0,
                productNum: [],
                productDueNum: 0,
                productType:['vm','pht','net','snet','vip','nlb','security','monitor','cfs','mysql','redis','adefence']
            }
        },
        computed: {
            userInfo() {
                return this.$store.state.userInfo;
            }
        },
        created: function () {
            this.getCouponNum();
            //this.getTicketNum();
            this.getProductNum();
            this.getProductDueNum();
        },
        methods: {
            getCouponNum() {
                apiCoupon.getAvailableNum().then(res => {
                    this.couponNum = res.data;
                });
            },
            getTicketNum() {
                apiTicket.getUnreadNum().then(res => {
                    this.ticketNum = res.data;
                });
            },
            goTrans() {
                window.location.href = this.$config.accountUrl + '/Transaction';
            },
            goBill() {
                window.location.href = this.$config.accountUrl + '/Bill';
            },
            getProductNum() {
                var theArr = [];
                this.productType.forEach(element => {
                    apiProduct.getProductNum({ product_type:element}).then(res => {
                        //theArr[element] = res.data;
                        this.$set(theArr,element,res.data);
                        // console.log(theArr);
                    });
                });
                this.productNum=theArr;
                // console.log(this.productNum);                
            },
            getProductDueNum() {
                apiProduct.getDueNum().then(res => {
                    this.productDueNum = res.data;
                });
            },
        }
    }
</script>

<style scoped>

    .row {
        margin: 20px 0;
        font-size: 14px;
    }

    .card {
        margin-bottom: 15px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
        background-color: #ffffff;
        border: solid 1px #e0e0e0;
    }

    .card-header {
        margin-bottom: 15px;
        font-size: 14px;
        font-weight: bold;
        color: #4f4f4f;
    }

    .card-content {
        display: flex;
    }

    .user-item {
        margin-right: 30px;
        color: #4f4f4f;
    }

    .user-item label {
        opacity: 0.64;
    }

    .user-auth-success {
        color: #00cc66;
    }

    .user-auth-error {
        color: red;
    }

    .product {
        display: flex;
        margin-bottom: 30px;
    }

    .product-item {
        width: 140px;
        height: 70px;
        background-color: #f5f5f6;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        margin-right: 20px;
    }

    .product-item label {
        opacity: 0.32;
        font-size: 18px;
        color: #4f4f4f;
        margin-bottom: 5px;
    }

    .product-item span {
        font-size: 14px;
        color: #4f4f4f;
    }

    .system-msg {
        font-size: 14px;
        color: #4f4f4f;
        border-radius: 1px;
        background-color: #fffbe6;
        border: solid 1px #ffe58f;
        padding: 10px 20px;
        margin-bottom: 20px;
    }

    .account {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .account-item {
        background-color: #f5f5f6;
        margin-bottom: 10px;
        padding: 10px;
    }

    .account-link {
        float: right;
        color: #eb6f2c;
    }

    .account-btn {
        text-align: right;
        margin-top: 10px;
    }

    .message {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .message-item {
        background-color: #f5f5f6;
        margin-bottom: 10px;
        padding: 10px;
    }

    .message-num {
        color: red;
    }

    .message-link {
        float: right;
        color: #eb6f2c;
    }
</style>
