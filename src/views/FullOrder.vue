<template>
  <div class="fullOrder">
    <div class="full-header">
      <div class="full-header-img" @click="fullreturn">
        <van-icon name="arrow-left" size="20px" />
      </div>
      <div>全部订单</div>
    </div>
    <div v-if="!this.$store.state.user" class="full-Tips">
      亲，您还没登录噢～～
    </div>
    <div class="full-content-box" v-if="this.$store.state.user">
      <div v-for="(item,index) in FullAll" :key="index" class="full-content-loop1">
        <div class="full-content-loop1-name">
          订单编号:{{item.order_id}}
        </div>
         <div v-for="(item1,index1) in item.order_list" :key="index1" class="full-content-loop2">
          <img :src="item1.image_path" alt="" class="full-content-img">
          <div class="full-content-loop2-name">{{item1.name}}</div>
          <div class="full-content-loop2-box">
            <div>￥{{item1.present_price}}</div>
            <div class="full-content-count">
              <van-icon name="cross" size="14px" color="lightblue" />
              <div class="full-content-count1">{{item1.count}}</div>
            </div>
          </div>
         </div>
        <div class="full-content-bottom">
          <div class="full-content-bottom1">
            创建时间：{{item.add_time}}
          </div>
          <div class="full-content-bottom2">
            收货地址：{{item.address}}
          </div>
          <div class="full-content-bottom3">
            <div>共{{item.counts}}件商品</div>&nbsp;&nbsp;
            <div>合计：{{item.mallPrice}}</div>
          </div>
        </div>
       </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "fullOrder",
  components: {},
  props: {},
  data() {
    return {
      FullAll:[],
    };
  },
  methods: {
    fullreturn() {
      this.$router.push({ name: "my" });
    },
    //订单查询
    getOrderNum () {
      this.$axios
              .req(`api/myOrder`)
              .then(response =>{
                if (response) {
                  this.FullAll = response.list;
                  this.FullAll.forEach(item =>{
                    let Num = 0;
                    item.order_list.forEach(item1 =>{
                      Num += item1.count;
                      // Num = Num + item1.count
                    })
                    item.counts = Num;
                  });

                }
              })
              .catch(e=>{
                console.log(e);
              })
    }
  },
  mounted() {
    if (this.$store.state.user) {
      this.getOrderNum ()
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
  .fullOrder{
    background-color: #f2f2f2;
  }
.full-header {
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
.full-header-img {
  position: absolute;
  left: 40px;
  top: 50%;
  transform: translateY(-20px);
}
  //登录提示
  .full-Tips {
    width: 100vw;
    height: 200px;
    font-size: 30px;
    color: skyblue;
    line-height: 200px;
    text-align: center;
  }

//第一个循环
.full-content-loop1{
  margin: 20px auto;
  width: 90vw;
  background-color: white;
  border-radius: 40px;
}
//订单号
.full-content-loop1-name{
  margin-top: 40px;
  padding-top: 20px;
  margin-left: 30px;
  font-size: 30px;
  width: 83vw;
}
//第二个循环
.full-content-loop2 {
  width: 83vw;
  display: flex;
  border-top: lightblue solid 1px;
  /*border-bottom: lightblue solid 1px;*/
  margin: 10px auto ;
  position: relative;
}
//物品图片
  .full-content-img {
    width: 140px;
    height: 140px;
    border: lightblue solid 2px;
    margin: 20px 0px;
  }
  //物品名字
  .full-content-loop2-name{
    margin: 20px 20px;
  }
  //价格和数量
  .full-content-loop2-box {
    position: absolute;
    right: 10px;
    top: 20px;
  }
  //数量
  .full-content-count{
    display: flex;
    align-items: center;
  }
  .full-content-count1 {
    font-size: 30px;
    color: lightblue;
  }
  //
  .full-content-bottom {
    height: 140px;
    width: 90vw;
  }
  //地址、时间
  .full-content-bottom1,
  .full-content-bottom2 {
    margin: 10px 20px;
  }
  //总价
  .full-content-bottom3 {
    display: flex;
    margin:10px 0 0 20px;
  }
</style>
