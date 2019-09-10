<template>
  <div>
    <div>
      <div class="shopping-header-font">购物车</div>
      <div class="shopping-header-box-box" v-if="!this.$store.state.user">
        <div class="shopping-header-img">
          <img src="../imsge/shop.png" class="shopping-header-img-img" />
        </div>
        <div class="shopping-header-font1">请先登录噢～～</div>
        <div class="shopping-header-login" @click="shoppingLogin">去登录</div>
      </div>
      <div v-else>
        <div class="shopping-head-content">
          <div class="shopping-price-box">
            <div
              v-if="checked === false"
              class="shopping-shadow-font shopping-All-election"
            >
              <input
                type="checkbox"
                @change="change1"
                v-model="checked"
                class="shopping-input"
              />全选
            </div>
            <div v-else class="shopping-shadow-font shopping-All-election">
              <input
                type="checkbox"
                @change="change1"
                v-model="checked"
                class="shopping-input"
              />取消全选
            </div>
            <div class="shopping-Total-prices" v-if="priceAll > 0">
              <div>
                合计：<span class="shopping-Total-price-span"
                  >￥{{ priceAll }}</span
                >
              </div>
              <div>请确认订单</div>
            </div>
            <div class="shopping-Total-prices" v-else>
              合计：<span class="shopping-Total-price-span">￥0.00</span>
            </div>
          </div>
          <div class="shopping-Event-box" v-if="priceAll > 0">
            <div class="shopping-delete" @click="deletes">删除</div>
            <div class="shopping-settlement" @click="goSettlement">去结算</div>
          </div>
        </div>
        <div class="box">
          <div
            v-for="(item, index) in shoppingAll"
            :key="index"
            class="shopping-loop"
          >
            <div class="shopping-loop-1 shopping-shadow-font">
              <input
                v-model="item.check"
                type="checkbox"
                @change="change2"
                class="shopping-input"
              />
            </div>
            <div class="shopping-loop-imgs">
              <img :src="item.image_path" class="shopping-loop-img" @click="imgItem1(item)" />
            </div>
            <div class="shopping-loop-names">
              <div class="shopping-loop-name">{{ item.name }}</div>
              <div class="shopping-loop-price">
                ￥<span>{{ item.present_price }}</span>
              </div>
            </div>
            <div class="shopping-loop-stepping">
              <van-stepper
                v-model="item.count"
                integer
                input-width="32px"
                button-size="24px"
                @change="addTo(item)"
              >
              </van-stepper>
            </div>
          </div>
        </div>
        <div v-if="shoppingAll.length === 0" class="tips">
          购物车已清空，请去商城添加商品
        </div>
      </div>
      <Bottom></Bottom>
    </div>
  </div>
</template>
<script>
import Bottom from "../components/Bottom/Bottom";
import { Dialog } from "vant";
import axios from "axios";
import { Toast } from "vant";
export default {
  name: "shopping",
  components: {
    Bottom
  },
  props: {},
  data() {
    return {
      checked: false,
      shadow: true,
      shoppingAll: [],
      value: 1,
      showDiv: false,
      deleteID: [],
      settlementAll: [],
      IdAll:[]
    };
  },
  methods: {
    //点击事件去登录页
    shoppingLogin() {
      this.$router.push({ name: "login" });
    },
    //请求购物车数据
    shoppingData() {
      this.$axios
        .req(`api/getCard`, {})
        .then(response => {
          if (response) {
            this.shoppingAll = response.shopList;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    //全选、反选
    change1() {
      this.shoppingAll.map(item => {
        item.check = this.checked;
      });
    },
    //单选
    change2() {
      this.checked = this.shoppingAll.every(item => {
        return item.check;
      });
    },
    //进入单品详情
    imgItem1 (item) {
      this.$router.push({
        name:"detailsPage",
        query:{
          goodsId4:item.cid
        }
      })
    },
    //删除商品
    deletes() {
      Dialog.confirm({
        title: "删除",
        message: "亲，您确定要删除商品吗？"
      })
        .then(() => {
          this.shoppingAll.forEach(item => {
            if (item.check === true) {
              this.deleteID.push(item.cid);
            }
          });
          axios
            .post("api/deleteShop", this.deleteID)
            .then(response => {
              if (response) {
                Toast.success("删除成功");
                this.shoppingData();
              }
            })
            .catch(e => {
              console.log(e);
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    //去结算
    goSettlement() {
      this.shoppingAll.forEach(item => {
        if (item.check === true) {
          this.settlementAll.push(item);
          this.IdAll.push(item.cid)
        }
    });
      this.$router.push({
        name: "settlement",
        query: {
          settlement: this.settlementAll,
          IdAll:this.IdAll
        }
      });
    },
    //购物车加减商品
    addTo(item) {
      this.$axios
        .req("api/editCart", {
          count: item.count,
          id: item.cid,
          mallPrice: item.mallPrice
        })
        .then(response => {
          if (response) {
            console.log(response);
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
      this.shoppingData();
  },
  created() {},
  filters: {},
  computed: {
    priceAll() {
      let prices = 0;
      this.shoppingAll.forEach(item => {
        if (item.check === true) {
          prices += item.present_price * item.count;
        }
      });
      return prices.toFixed(2);
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.shopping-header-font {
  width: 100vw;
  height: 80px;
  text-align: center;
  line-height: 80px;
  font-size: 30px;
  border-bottom: #f2f2f2 1px solid;
}
.shopping-header-img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: lightgrey;
  margin: 40px auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.shopping-header-img-img {
  height: 140px;
  width: 140px;
}
.shopping-header-font1 {
  color: #999;
}
.shopping-header-box-box {
  text-align: center;
}
.shopping-header-login {
  width: 200px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  margin: 40px auto;
  border: #bd2323 solid 3px;
  border-radius: 30px;
}
.shopping-price-box {
  width: 100vw;
  height: 140px;
  border-top: lightgrey solid 1px;
  border-bottom: lightgrey solid 1px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 30px;
}
.shopping-All-election {
  width: 200px;
  margin-left: -80px;
}
.shopping-Total-prices {
  margin-right: -60px;
}
.shopping-Total-price-span {
  color: red;
  display: inline-block;
  width: 180px;
}
.shopping-input {
  /*height: 30px;*/
  /*width: 30px;*/
  zoom: 180%;
}
.shopping-Event-box {
  width: 100vw;
  height: 100px;
  font-size: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.shopping-delete {
  width: 120px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  background-color: #ff079a;
  color: white;
  margin-right: 20px;
}
.shopping-settlement {
  width: 140px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  background-color: skyblue;
  color: white;
  margin-right: 40px;
}
.box {
  margin-bottom: 110px;
}
.shopping-loop {
  width: 100vw;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: #f2f2f2 solid 1px;
  position: relative;
}
.shopping-loop-1 {
  margin-left: 30px;
}
.shopping-loop-img {
  height: 140px;
  width: 140px;
  border: lightgrey solid 2px;
  margin-left: 40px;
}
.shopping-loop-names {
  height: 180px;
  color: #bd020a;
  font-size: 30px;
  margin-left: 40px;
}
.shopping-loop-name {
  margin-top: 20px;
}
.shopping-loop-price {
  margin-top: 50px;
}
.shopping-loop-stepping {
  position: absolute;
  right: 100px;
  bottom: 30px;
}
.tips {
  width: 100vw;
  height: 200px;
  text-align: center;
  line-height: 200px;
  color: lightgrey;
  font-size: 40px;
}

</style>
