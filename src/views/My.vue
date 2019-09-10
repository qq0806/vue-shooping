<template>
  <div>
    <div class="my-haeder">会员中心</div>
    <!--    头部-->
    <div class="my-body">
      <div class="my-van-img">
        <van-icon name="setting-o" size="20px" @click="gopersonal" />
      </div>
      <div class="my-core" v-if="!this.$store.state.user">
        <div class="my-ba"></div>
        <button @click="login" class="my-button1">登录/注册</button>
      </div>
      <div v-else class="my-user">
        <img :src="userInfo.avatar" class="my-img1" />
        <div class="my-name">
          <span class="my-name-span">欢迎您:{{ userInfo.nickname }}</span>
          <button @click="signout" class="my-signout">退出登录</button>
        </div>
      </div>
    </div>
    <!--    代付款-->
    <div class="my-box">
      <div class="my-event">
        <div>
          <van-icon name="balance-pay" size="20px" />
        </div>
        <div>代付款</div>
      </div>
      <div class="my-event">`
        <van-icon name="free-postage" size="20px" />
        <div>代发货</div>
      </div>
      <div class="my-event">
        <van-icon name="points" size="20px" />
        <div>代收货</div>
      </div>
      <div class="my-event" @click="clickItem3" >
          <van-icon name="thumb-circle-o" size="20px" :info="info1" />
        <div>评价</div>
      </div>
      <div class="my-event" @click="clickItem31">
        <van-icon name="like-o" size="20px" />
        <div>已完成</div>
      </div>
    </div>
    <!--    底部任务-->
    <div class="my-botton">
      <div class="my-order" @click="fullorder">
        <van-icon name="records" size="20px" />
        <span>全部订单</span>
        <span class="my-button-span">＞</span>
      </div>
      <div class="my-coc" @click="Collection">
        <van-icon name="star-o" size="20px" />
        <span>收藏商品</span>
        <span class="my-button-span">＞</span>
      </div>
      <div class="my-address" @click="addressList">
        <van-icon name="location-o" size="20px" />
        <span>地址管理</span>
        <span class="my-button-span">＞</span>
      </div>
      <div class="my-recent" @click="browse">
        <van-icon name="eye-o" size="20px" />
        <span>最近浏览</span>
        <span class="my-button-span">＞</span>
      </div>
    </div>
    <div>
      <Bottom></Bottom>
    </div>
  </div>
</template>

<script>
import Bottom from "../components/Bottom/Bottom";
import { Toast } from "vant";
import axois from "axios";
export default {
  name: "my",
  components: {
    Bottom
  },
  props: {},
  data() {
    return {
      list1:[]
    };
  },
  methods: {
    //个人信息
    gopersonal () {
      this.$router.push({name:"personal"})
    },
    //获取用户信息
    getUserData () {
      axois
              .post(`api/queryUser`,{})
              .then(response => {
                if (response) {
                  this.$store.state.user = response.userInfo;
                }
              })
              .catch(e =>{
                console.log(e);
              })
    },
    //退出登录
    signout() {
      this.$axios
        .req("api/loginOut", {})
        .then(response => {
          if (response.code === 0) {
            Toast.success("退出成功");
            localStorage.removeItem("user");
            this.$store.state.user = "";
            //浏览记录
            localStorage.removeItem("browseData");
            //定位
            this.$store.state.Location = false;
          }
          console.log(response);
        })
        .catch(e => {
          console.log(e);
        });
    },
    //评论
    clickItem3() {
      this.$router.push({name:"comment"})
    },
    //已完成
    clickItem31() {
      this.$router.push({name:"fullOrder"})
    },
    //登录或注册
    login() {
      this.$router.push({ name: "login" });
    },
    //全部订单
    fullorder() {
      this.$router.push({ name: "fullOrder" });
    },
    //我的收藏
    Collection() {
      this.$router.push({ name: "myCollection" });
    },
    //地址列表
    addressList() {
      this.$store.state.addressReturn = true;
      this.$router.push({ name: "addressList" });
      console.log(this.$store.state.addressReturn);
    },
    //浏览历史
    browse() {
      this.$router.push({ name: "browseHistory" });
    },
    //获取未评论数据
    getOrderNum () {
      this.$axios
              .req("api/tobeEvaluated")
              .then(response =>{
                if (response){
                  this.list1 = response.data.list
                }
              })
              .catch(e=>{
                console.log(e);
              })
    },
  },
  mounted() {
    if (this.$store.state.user) {
      this.getOrderNum ()
    }
    this.getUserData ()
  },
  created() {},
  filters: {},
  computed: {
    userInfo() {
      return this.$store.state.user;
    },
    info1 () {
      return this.list1.length
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.my-haeder {
  width: 100vw;
  height: 80px;
  font-size: 30px;
  background-color: white;
  text-align: center;
  line-height: 80px;
}
.my-body {
  width: 100vw;
  height: 30vh;
  background-color: #bd2323;
  position: relative;
}
.my-van-img {
  color: white;
  position: absolute;
  top: 30px;
  right: 30px;
}
.my-core {
  width: 100vw;
  height: 30vh;
  top: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
//背景图片
.my-ba {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-image: url("../imsge/name.jpg");
  background-size: 100%;
}
.my-button1 {
  border: 0;
  background: rgba(0, 0, 0, 0);
  color: white;
  margin-top: 10px;
}
.my-img1 {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-size: 100%;
  margin-top: 100px;
}
.my-user {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}
.my-name {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.my-name-span {
  font-size: 30px;
}
.my-signout {
  background: rgba(0, 0, 0, 0);
  border: 0;
  margin-top: 20px;
}
.my-box {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
}
.my-event {
  text-align: center;
  margin-left: 30px;
  margin-right: 30px;
}
.my-order {
  height: 100px;
  width: 95vw;
  /*padding-left: 20px;*/
  margin-left: 20px;
  margin-top: 20px;
  margin-bottom: 40px;
  line-height: 100px;
  display: flex;
  align-items: center;
  font-size: 30px;
  border-bottom: solid #f2f2f2 1px;
  border-top: solid #f2f2f2 1px;
  position: relative;
}
.my-coc,
.my-address,
.my-recent {
  height: 100px;
  width: 95vw;
  /*padding-left: 20px;*/
  margin-left: 20px;
  line-height: 100px;
  display: flex;
  align-items: center;
  font-size: 30px;
  border-bottom: solid #f2f2f2 1px;
  border-top: solid #f2f2f2 1px;
  position: relative;
}
.my-button-span {
  position: absolute;
  right: 40px;
}
//评论的右上角提示信息
.van-info {
  line-height: 25px;
}
</style>
