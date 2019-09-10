<template>
  <div>
    <div class="addressList-header">
      <div class="addressList-header-img" @click="return2">
        <van-icon name="arrow-left" size="20px" />
      </div>
      <div>地址列表</div>
    </div>
    <div v-if="!this.$store.state.user" class="addressList-Tips">
      亲，您还没登录噢～～
    </div>
    <div v-if="this.$store.state.user">
    <div class="addressList-tips" v-if="!this.addressAll">
      暂无收货地址～～
    </div>
    <div class="addressList-span-van">
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        :disabled-list="disabledList"
        @add="onAdd"
        @edit="onEdit"
        @select="onSelect"
      />
    </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "addressList",
  components: {},
  props: {},
  data() {
    return {
      addressAll: {},
      chosenAddressId: "",
      disabledList: [],
      list:[],
      //默认收货地址
      defaultAddress: [],
      IdAll:"",
      SettlementAll:""
    };
  },
  methods: {
    //查询收货地址
    queryAddress() {
      this.$axios
        .req(`api/getAddress`)
        .then(response => {
          if (response) {
            this.list = response.address;
            this.list.map((item,index) => {
              item.id = index+1;
              if (item.isDefault === true) {
                this.chosenAddressId =item.id
              }
            })
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    //设置默认收货地址
    onSelect(item) {
      console.log(item);
      this.$axios
        .req("api/setDefaultAddress", { id:item._id })
        .then(response => {
          if (response) {
            console.log(response);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    return2() {
      if (this.$store.state.addressReturn === true) {
        this.$router.push({name:"my"});
        this.$store.state.addressReturn =false;
      } else if (this.$store.state.addressReturn === false) {
        this.SettlementAll = this.$store.state.SettlementArray;
        this.IdAll = this.$store.state.SettlementArrayId;
        this.$router.push({
          name:"settlement",
        query:{
          SettlementArray:this.SettlementAll,
          SettlementArrayId:this.IdAll,
        }
        })
      }

    },
    //新增地址
    onAdd() {
      this.$router.push({ name: "editAddress" });
    },
    //编辑地址
    onEdit(item) {
      this.$router.push({
        name: "editAddress",
        query: {
          areaList1: item
        }
      });
    }
  },
  mounted() {
    if (this.$store.state.user) {
      this.queryAddress();
    }
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
//头部
.addressList-header {
  height: 80px;
  width: 100vw;
  border-bottom: lightgrey solid 2px;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
//引入图片
.addressList-header-img {
  position: absolute;
  left: 40px;
  top: 50%;
  transform: translateY(-20px);
}
//登录提示
.addressList-Tips {
  width: 100vw;
  height: 200px;
  font-size: 30px;
  color: skyblue;
  line-height: 200px;
  text-align: center;
}

//提示
.addressList-tips {
  width: 100vw;
  height: 220px;
  text-align: center;
  line-height: 220px;
  font-size: 30px;
  color: lightgrey;
}
//底部
.addressList-bottom {
  width: 100vw;
  height: 100px;
  font-size: 30px;
  text-align: center;
  line-height: 100px;
  background-color: #bd1701;
  color: white;
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
