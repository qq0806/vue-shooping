<template>
  <div>
    <div class="browse-header">
      <div class="browse-header-img" @click="browsereturn">
        <van-icon name="arrow-left" size="20px" />
      </div>
      <div>最近浏览</div>
    </div>
    <div v-for="(item,index) in browseData1" :key="index" class="browse-loop-box">
      <img :src="item.image_path" alt="" class="browse-loop-img">
      <div class="browse-loop-name">
        <div>{{item.name}}</div>
        <div class="browse-loop-price">￥{{item.present_price}}</div>
      </div>
      <div class="browse-loop-image" @click="loopItem(item,index)">
        <van-icon name="cross" size="16px" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "browseHistory",
  components: {},
  props: {},
  data() {
    return {
      browseData1:[]
    };
  },
  methods: {
    browsereturn() {
      this.$router.push({ name: "my" });
    },
    loopItem (item,index) {
      this.browseData1.splice(index,1);
      localStorage.setItem("browseData",JSON.stringify(this.browseData1))
    },
  },
  mounted() {
    if (localStorage.browseData) {
      this.browseData1 = JSON.parse(localStorage.getItem("browseData"))
    }
    //赋值给this.browseData1，然后把数据push进这个数组，在把它用JSON.stringify存起来
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
  .browse-header {
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
  .browse-header-img {
    position: absolute;
    left: 40px;
    top: 50%;
    transform: translateY(-20px);
  }
  //循环
  .browse-loop-box{
    height: 200px;
    width: 100vw;
    display: flex;
    align-items: center;
    border-bottom: lightblue solid 1px;
    position: relative;
  }
  //商品图片
  .browse-loop-img {
    width: 140px;
    height: 140px;
    border: lightblue solid 2px;
    margin: 20px 0px 0px 20px;
  }
  //商品名字
  .browse-loop-name {
    font-size: 30px;
    margin-top: 20px;
    margin-left: 20px;
  }
  //商品价格
  .browse-loop-price{
    margin-top: 40px;
    color: red;
  }
  //vant图标
  .browse-loop-image {
    position: absolute;
    right: 20px;
    bottom: 20px;
  }

</style>
