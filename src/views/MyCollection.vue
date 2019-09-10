<template>
  <div>
    <div class="collection-header">
      <div class="collection-header-img" @click="collection">
        <van-icon name="arrow-left" size="20px" />
      </div>
      <div>我的收藏</div>
    </div>
    <div v-if="!this.$store.state.user" class="collection-Tips">
      亲，您还没登录噢～～
    </div>
    <div v-if="this.$store.state.user">
      <div class="collection-loop-box">
        <div
          v-for="(item, index) in collectionAll"
          :key="index"
          class="collection-loop1"
        >
          <img :src="item.image_path" class="collection-loop-img" @click="clickItem5(item)" />
          <div>
            <div class="collection-loop1-name">
              {{ item.name}}
            </div>
            <div class="collection-loop1-div">
              <div class="collection-loop1-price">
                ￥{{ item.present_price }}
              </div>
              <div
                class="collection-loop1-click"
                @click="CollectionDelete(item)"
              >
                <van-icon name="cross" size="18px" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="this.collectionAll.length === 0" class="collection-Tips">
        亲，您还没收藏任何商品～～
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "myCollection",
  components: {},
  props: {},
  data() {
    return {
      collectionAll: [],
      user:""
    };
  },
  methods: {
    collection() {
      this.$router.push({ name: "my" });
    },
    //获取收藏
    CollectionData1() {
      this.$axios
        .req(`api/collection/list`)
        .then(response => {
          if (response) {
            this.collectionAll = response.data.list;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    //删除收藏
    CollectionDelete(item) {
      this.$axios
        .req("api/cancelCollection", { id: item.cid})
        .then(response => {
          if (response.code === 200) {
            Toast.fail("已取消收藏");
           this.CollectionData1();
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
      //进入详情页
      clickItem5(item) {
          this.$router.push({
              name:"detailsPage",
              query:{
                  goodsId5:item.cid
              }
          })
      },
  },

  mounted() {
   if (this.$store.state.user) {
     this.CollectionData1();
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
.collection-header {
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
.collection-header-img {
  position: absolute;
  left: 40px;
  top: 50%;
  transform: translateY(-20px);
}
//登录提示
.collection-Tips {
  width: 100vw;
  height: 200px;
  font-size: 30px;
  color: skyblue;
  line-height: 200px;
  text-align: center;
}
//循环
.collection-loop1 {
  width: 100vw;
  display: flex;
}
.collection-loop-img {
  width: 160px;
  height: 160px;
  margin: 20px;
  border: lightblue solid 2px;
}
.collection-loop1-name {
  width: 70vw;
  margin: 30px 0;
  font-size: 30px;
}
.collection-loop1-div {
  width: 70vw;
  font-size: 28px;
  display: flex;
  justify-content: space-between;
}
</style>
