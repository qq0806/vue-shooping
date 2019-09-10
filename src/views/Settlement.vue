<template>
  <div class="settlement">
    <div class="settlement-header">
      <div class="settlement-header-img" @click="return1">
        <van-icon name="arrow-left" size="20px" />
      </div>
      <div>订单结算</div>
    </div>
    <div class="settlement-address-box" v-if="this.defaultAddress">
      <div class="settlement-address-details">
        <div>收货人:{{ defaultAddress.name }}</div>
        <div>{{ defaultAddress.tel }}</div>
      </div>
      <div class="settlement-address-1">
        <div>收货地址:{{ defaultAddress.address }}</div>
        <div @click="goadd">
          <van-icon name="arrow" size="20px" />
        </div>
      </div>
      <van-notice-bar wrapable :scrollable="false">
        （收货不便时，可选择免费待收货服务）
      </van-notice-bar>
    </div>
    <div class="settlement-address" @click="address" v-else>
      点击添加收货地址
    </div>
    <div class="settlement-imgs"></div>
    <div class="settlement-loop-box" v-if="this.goSettlementAll.length > 0">
      <div
        v-for="(item, index) in goSettlementAll"
        :key="index"
        class="settlement-loops"
      >
        <div class="settlement-loop-imgs">
          <img :src="item.image_path" class="settlement-loop-img" />
        </div>
        <div class="settlement-loop-names">
          <div class="settlement-loop-name">{{ item.name }}</div>
          <div class="settlement-loop-prices">
            <div class="settlement-loop-price">
              ￥{{ (item.count * item.present_price).toFixed(2) }}
            </div>
            <div class="settlement-loop-num">
              <van-icon name="cross" />
              <div>{{ item.count }}</div>
            </div>
          </div>
        </div>
    </div>
    </div>
    <div v-else>
      <div class="SettlementItem-box">
          <img :src="SettlementItem.image_path" class="settlement-loop-img">
        <div class="settlement-loop-names">
          <div class="settlement-loop-name">{{SettlementItem.name}}</div>
          <div class="settlement-loop-prices">
            <div class="settlement-loop-price">￥{{SettlementItem.present_price}}</div>
            <div class="settlement-loop-num">
              <van-icon name="cross" />
              <div>{{ this.num }}</div>
            </div>
          </div>
       </div>
      </div>
    </div>
    <div class="settlement-bottom"v-if="this.goSettlementAll.length > 0">
      <div class="settlement-bottom-name1">
        合计：<span>￥{{ prices }}</span>
      </div>
      <div class="settlement-bottom-name" @click="placeOrder">提交订单</div>
    </div>
    <div class="settlement-bottom" v-else>
      <div class="settlement-bottom-name1">
        合计：<span>￥{{ price1 }}</span>
      </div>
      <div class="settlement-bottom-name" @click="placeOrder1">提交订单</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Toast } from "vant";
export default {
  name: "settlement",
  components: {},
  props: {},
  data() {
    return {
      goSettlementAll: [],
        IdAll2:[],
      defaultAddress: "",
        //直接购买
      SettlementItem: {},
      num:"",
      IdAll:[]
    };
  },
  methods: {
    //返回购物车
    return1() {
      this.$router.push({ name: "shopping" });
    },
    //添加地址
    address() {
      this.$router.push({ name: "addressList", query: {} });
    },
    //提交订单
    placeOrder() {
      if (!this.defaultAddress) {
        Toast("请添加收货地址");
      } else if (this.defaultAddress) {
          console.log(this.prices);
          axios
          .post("api/order", {
            address: this.defaultAddress.address,
            tel: this.defaultAddress.tel,
            orderId: this.IdAll2,
            totalPrice: this.prices,
            count: this.countAll,
            idDirect: false
          })
          .then(response => {
            if (response) {
              Toast.success("结算成功，一共" + this.prices + "元");
              this.$store.state.SettlementArray =[];
              this.$store.state.SettlementArrayId = [];
              this.$router.push({name: "shopping"});
            }
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    //直接购买
    placeOrder1 () {
      this.IdAll.push(this.SettlementItem.id);
      axios
              .post("api/order", {
                address: this.defaultAddress.address,
                tel: this.defaultAddress.tel,
                orderId:this.IdAll,
                totalPrice: this.price1,
                count: this.num,
                idDirect: true
              })
              .then(response => {
                if (response) {
                  Toast.success("结算成功，一共" + this.price1 + "元");
                  this.$router.push({
                      name: "detailsPage"
                    });
                }
              })
              .catch(e => {
                console.log(e);
              });
    },
    //查询默认收货地址
    getDefaultAddress() {
      this.$axios
        .req(`api/getDefaultAddress`)
        .then(response => {
          if (response.code === 200) {
            this.defaultAddress = response.defaultAdd;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    goadd () {
      this.$router.push({name:"addressList"})
    }
  },
  mounted() {
    if (this.$route.query.settlement && this.$route.query.IdAll) {
      this.goSettlementAll = this.$route.query.settlement;
      this.IdAll2 = this.$route.query.IdAll;
      this.$store.state.SettlementArray = this.goSettlementAll;
      this.$store.state.SettlementArrayId = this.IdAll2;
    } else if (this.$route.query.goodsIdAll && this.$route.query.num) {
      this.SettlementItem = this.$route.query.goodsIdAll;
      this.num = this.$route.query.num;
    } else if (this.$route.query.SettlementArray && this.$route.query.SettlementArrayId) {
      this.goSettlementAll = this.$route.query.SettlementArray;
      this.IdAll2 = this.$route.query.SettlementArrayId;
    }
    //查询默认收货地址
    this.getDefaultAddress();
  },
  created() {},
  filters: {},
  computed: {
    //通过购物车的价格
    prices() {
      let price = 0;
      this.goSettlementAll.forEach(item => {
        price += item.present_price * item.count;
      });
      return price.toFixed(2);
    },
    //直接购买的价格
    price1() {
      return  this.SettlementItem.present_price * this.num
    },
    //通过购物车的购买总数
    countAll() {
      let num = 0;
      this.goSettlementAll.forEach(item => {
        num += item.count;
      });
      return num;
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.settlement {
  position: relative;
  height: 100vh;
}
//头部的div
.settlement-header {
  height: 80px;
  width: 100vw;
  border-bottom: lightgrey solid 2px;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
//引入图片的div
.settlement-header-img {
  position: absolute;
  left: 40px;
  top: 50%;
  transform: translateY(-20px);
}
//添加地址的div
.settlement-address {
  width: 100vw;
  height: 140px;
  text-align: center;
  line-height: 140px;
}
//地址详情
.settlement-address-box {
  width: 100vw;
  margin: 40px 0;
}
//收货姓名、电话
.settlement-address-details {
  font-size: 30px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-around;
}
//收货地址
.settlement-address-1 {
  font-size: 30px;
  display: flex;
  justify-content: space-around;
}
//背景图片
.settlement-imgs {
  width: 100vw;
  height: 20px;
  background-image: url("../imsge/caitiao.jpg");
  background-size: 100%;
  background-repeat: no-repeat;
}
.settlement-loop-box {
  margin-bottom: 100px;
}
//循环div
.settlement-loops {
  display: flex;
  justify-content: flex-start;
  margin-top: 40px;
}
//物品图片
.settlement-loop-img {
  width: 160px;
  height: 160px;
  border: lightgrey solid 2px;
  margin-left: 40px;
}
//物品名字、价格div
.settlement-loop-names {
  width: 70vw;
  margin-left: 40px;
}
//物品名字
.settlement-loop-name {
  font-size: 28px;
  margin-top: 20px;
  color: red;
}
//物品价格、数量div
.settlement-loop-prices {
  height: 50px;
  font-size: 28px;
  margin-top: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
//商品价格
.settlement-loop-price {
  font-size: 28px;
  color: red;
}
//商品数量
.settlement-loop-num {
  display: flex;
  align-items: center;
  margin-right: 20px;
  font-size: 28px;
}
//直接购买
.SettlementItem-box {
  display: flex;
}
//底部div
.settlement-bottom {
  font-size: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: fixed;
  bottom: 0;
  right: 0;
}
//提交按钮
.settlement-bottom-name {
  height: 80px;
  width: 200px;
  text-align: center;
  line-height: 80px;
  background-color: #bd2323;
  color: white;
}
.settlement-bottom-name1 {
  margin-right: 40px;
}
</style>
