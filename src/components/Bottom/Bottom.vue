<template>
  <div>
    <div class="bottom">
      <div class="bottom-img" :class="{ bottomFont: num === 0 }" @click="mall">
        <van-icon name="wap-home" size="25px" />
        <div class="bottom-font">商城</div>
      </div>
      <div
        class="bottom-img"
        :class="{ bottomFont: num === 1 }"
        @click="classification"
      >
        <van-icon name="wap-nav" size="25px" />
        <div class="bottom-font">分类</div>
      </div>
      <div
        class="bottom-img"
        :class="{ bottomFont: num === 2 }"
        @click="shopping"
      >
        <van-icon name="shopping-cart" size="25px"/>
        <div class="bottom-font">购物车</div>
      </div>
      <div class="bottom-img" :class="{ bottomFont: num === 3 }" @click="my">
        <van-icon name="contact" size="25px" />
        <div class="bottom-font">我的</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Bottom",
  components: {},
  props: {
    num: {
      type: Number
    }
  },
  data() {
    return {
      classificationAll: ""
    };
  },
  methods: {
    //首页
    mall() {
      this.$emit("update:num", 0);
      this.$router.push({ name: "home" });
    },
    //分类
    classification() {
      this.$emit("update:num", 1);
      this.classificationAll = this.$store.state.category;
      this.$router.push({
        name: "classification",
        query: {
          category1: this.classificationAll
        }
      });
    },
    //购物车
    shopping() {
      this.$emit("update:num", 2);
      this.$router.push({ name: "shopping" });
    },
    //会员中心
    my() {
      this.$emit("update:num", 3);
      this.$router.push({ name: "my" });
    }
  },
  mounted() {},
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.bottom {
  width: 100vw;
  background-color: white;
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0px;
}
.bottom-img {
  text-align: center;
}
.bottom-font {
  font-size: 30px;
}
.bottomFont {
  color: orangered;
  text-align: center;
}
</style>
