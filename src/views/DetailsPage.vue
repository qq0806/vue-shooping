<template>
  <div>
    <div id="app">
      <div class="detailsPage-return" @click="detailsPageReturn">
        <van-icon name="arrow-left" size="20px" />
      </div>
      <div class="detailsPage-rotary">
        <van-swipe :autoplay="3000" indicator-color="white" @change="onChange">
          <van-swipe-item
            ><img
              :src="goodsIdAll.image_path"
              class="detailsPageImg"
              @click="detailsPageImg"
          /></van-swipe-item>
          <van-swipe-item
            ><img
              :src="goodsIdAll.image_path"
              class="detailsPageImg"
              @click="detailsPageImg"
          /></van-swipe-item>
          <div class="custom-indicator" slot="indicator">
            {{ current + 1 }}/2
          </div>
        </van-swipe>
      </div>
      <div class="detailsPage-shopping-name">{{ goodsIdAll.name }}</div>
      <div class="detailsPage-shopping-price">￥{{ goodsIdAll.present_price }}</div>
      <div class="detailsPage-box">
        <div class="detailsPage-freight">
          运费：0
        </div>
        <div class="detailsPage-surplus">剩余：{{ goodsIdAll.amount }}</div>
        <div
          v-if="collections === 1"
          class="detailsPage-collection"
          @click="cancelCollection"
        >
          <div>取消收藏：</div>
          <div><van-icon name="like" size="20px" color="red" /></div>
        </div>
        <div v-else class="detailsPage-collection" @click="collection">
          <div>收藏：</div>
          <div><van-icon name="like-o" size="20px" /></div>
        </div>
      </div>
      <div class="detailsPage-shopping">
        <div class="detailsPage-shopping-1">
          <div class="detailsPage-shopping-Icon1">
            <van-icon name="shop-collect-o" size="20px" />
          </div>
          <div>有赞的店</div>
          <div class="detailsPage-shopping-officer">官方</div>
        </div>
        <div class="detailsPage-shopping-1">
          <div>进入店铺</div>
          <div class="detailsPage-shopping-Icon">
            <van-icon name="arrow" size="20px" />
          </div>
        </div>
      </div>
      <div class="cl-labelPage-font-van">
        <van-tabs v-model="active">
          <van-tab title="商品详情">
            <div
              v-html="goodsIdAll.detail"
              class="cl-labelPage-CommodityDetails"
            ></div>
          </van-tab>
          <van-tab title="商品评论">
            <div class="Commodity-evaluation-box">
            <div v-for="(item,index) in evaluateAll" :key="index" >
              <div v-if="item.anonymous === false" class="Commodity-evaluation-Real-name">
                <div class="Commodity-evaluation-img"></div>
                <div class="Commodity-evaluation-name">
                  <div>{{item.user[0].nickname}}</div>
                  <div>
                    <van-rate
                            v-model="item.rate"
                            readonly
                            :size="20"
                            color="red"
                            void-icon="star"
                            void-color="#eee"
                    />
                  </div>
                  <div>
                    {{item.content}}
                  </div>
                </div>
                <div class="Commodity-evaluation-time">{{item.comment_time}}</div>
              </div>
              <div v-else class="Commodity-evaluation-anonymous">
                <div class="Commodity-evaluation-img"></div>
                <div class="Commodity-evaluation-name">
                  <div>{{item.comment_nickname}}</div>
                  <div>
                    <van-rate
                            v-model="item.rate"
                            readonly
                            :size="20"
                            color="red"
                            void-icon="star"
                            void-color="#eee"
                    />
                  </div>
                  <div>
                    {{item.content}}
                  </div>
                </div>
                <div class="Commodity-evaluation-time">{{item.comment_time}}</div>
              </div>
            </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
      <div class="detailsPage-shopping-button">
        <van-goods-action>
          <van-goods-action-icon icon="chat-o" text="客服" size="20px" />
          <van-goods-action-icon
            :info="info2"
            icon="cart-o"
            text="购物车"
            @click="onClickIcon"
          />
          <van-goods-action-button
            type="warning"
            text="加入购物车"
            @click="onClickButton"
          />
          <van-goods-action-button
            type="danger"
            text="立即购买"
            @click="onClickButton1"
          />
          <div class="Buy-immediately">
            <van-popup
              v-model="show1"
              position="bottom"
              z-index="1000"
              style="height: 40vh; width: 100vw; background-color: white"
            >
              <div class="on-box">
                <div class="on-box-img">
                  <img :src="goodsIdAll.image_path" class="on-img" />
                </div>
                <div class="on-box-name">
                  <div class="on-name">{{ goodsIdAll.name }}</div>
                  <div class="on-price">￥{{ goodsIdAll.orl_price }}</div>
                </div>
                <div class="on-font" @click="onFont">
                  <van-icon name="cross" size="15px" />
                </div>
              </div>
              <div class="on-bottom">
                <div>
                  <div class="on-bottom-name">
                    购买数量: <span>{{ this.value }}</span>
                  </div>
                  <div>
                    <span class="on-bottom-span1"
                      >剩余:{{ goodsIdAll.amount }}</span
                    ><span class="on-bottom-span2"><b>每人限购50件</b></span>
                  </div>
                </div>
                <div class="on-stepping">
                  <van-stepper
                    v-model="value"
                    :max="50"
                    input-width="40px"
                    button-size="40px"
                  />
                </div>
              </div>
              <div class="on-bottom1" @click="BuyImmediately">立即购买</div>
            </van-popup>
          </div>
        </van-goods-action>
      </div>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
import { Toast } from "vant";
export default {
  name: "detailsPage",
  components: {},
  props: {},
  data() {
    return {
      goodsId: "",
      goodsIdAll: "",
      //评价数据
      evaluateAll:"",
      current: 0,
      active: 0,
      collections: 0,
      show1: false,
      value: 1,
      goodsId1: [],
      getshoppingAll:[],
      browseData:[]
    };
  },
  methods: {
    //请求详情页数据
    detailsData() {
      this.$axios
        .req(`api/goods/one?id=${this.goodsId}&page=${1}`)
        .then(response => {
          if (response.goods) {
            this.goodsIdAll = response.goods.goodsOne;
            this.evaluateAll =response.goods.comment;
            this.browseData.push(response.goods.goodsOne);
            localStorage.setItem("browseData",JSON.stringify(this.browseData))
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    //检查商品是否收藏
    inspectData() {
      this.$axios
        .req(`api/isCollection`, { id: this.goodsId })
        .then(response => {
          if (response) {
            this.collections = response.isCollection;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    onChange(index) {
      this.current = index;
    },
    //图片浏览
    detailsPageImg() {
      ImagePreview({
        images: [this.goodsIdAll.image, this.goodsIdAll.image],
        startPosition: 1,
        onClose() {
          // do something
        }
      });
    },
    //点击收藏
    collection() {
      if (!this.$store.state.user) {
        this.$router.push({ name: "login" });
        this.$store.state.collection = true;
      } else {
        this.$axios
          .req("api/collection", this.goodsIdAll)
          .then(response => {
            if (response.code === 200) {
              Toast.success("收藏成功");
            }
          })
          .catch(e => {
            console.log(e);
          });
        this.collections = 1;
      }
    },
    //取消收藏
    cancelCollection() {
      this.$axios
        .req("api/cancelCollection", { id: this.goodsId })
        .then(response => {
          if (response.code === 200) {
            Toast.fail("已取消收藏");
          }
        })
        .catch(e => {
          console.log(e);
        });
      this.collections = 0;
    },
    //返回上一页
    detailsPageReturn() {
      this.$router.go(-1);
    },
    //进入购物车
    onClickIcon() {
      this.$router.push({ name: "shopping" });
    },
    //加入购物车
    onClickButton() {
      if (!this.$store.state.user) {
        this.$router.push({ name: "login" });
      } else {
        this.$axios
          .req(`api/addShop`, { id: this.goodsId })
          .then(response => {
            if (response.code === 200) {
              Toast.success("加入购物车成功");
              this.$store.state.goodsId.push(this.goodsId);
              console.log(this.$store.state.goodsId);
              // localStorage存值
              // this.goodsId1.push(this.goodsId);
              // localStorage.setItem("goodsID", JSON.stringify(this.goodsId1));
            }
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    //立即购买
    onClickButton1() {
      this.show1 = true;
    },
    //取消购买
    onFont() {
      this.show1 = false;
    },
    //进入订单结算页面
    BuyImmediately() {
      this.$router.push({
        name: "settlement",
        query: {
          goodsIdAll: this.goodsIdAll,
          num:this.value
        }
      });
    },
    //请求购物车数据，
    getshoppingData() {
      this.$axios
              .req(`api/getCard`, {})
              .then(response => {
                if (response) {
                  this.getshoppingAll = response.shopList;
                }
              })
              .catch(e => {
                console.log(e);
              });
    },
  },
  mounted() {
    this.detailsData();
    //goodsId 商品推荐
    //goodsId1 1F\2f\3F
    //goodsId2 热销商品
    //goodsId3 分类页
    //goodsId4 购物车
    //goodsId5 收藏页
    if (this.$route.query.goodsId) {
      this.goodsId = this.$route.query.goodsId;
      this.detailsData();
    } else if (this.$route.query.goodsId1) {
      this.goodsId = this.$route.query.goodsId1;
      this.detailsData();
    } else if (this.$route.query.goodsId2) {
      this.goodsId = this.$route.query.goodsId2;
      this.detailsData();
    } else if (this.$route.query.goodsId3) {
      this.goodsId = this.$route.query.goodsId3;
      this.detailsData();
    } else if (this.$route.query.goodsId4) {
      this.goodsId = this.$route.query.goodsId4;
      this.detailsData();
    } else if (this.$route.query.goodsId5) {
      this.goodsId = this.$route.query.goodsId5;
      this.detailsData();
    } else if (this.$route.query.goodsId6) {
      this.goodsId = this.$route.query.goodsId6;
      this.detailsData();
    }
    this.inspectData();
    this.getshoppingData()
    // this.goodsId1 = JSON.parse(localStorage.getItem("goodsID"));
    // console.log(this.goodsId1);
    //浏览历史
    if (localStorage.browseData) {
      this.browseData = JSON.parse(localStorage.getItem("browseData"))
    }
  },
  created() {},
  filters: {},
  computed: {
    info2 () {
      return this.getshoppingAll.length
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.detailsPage-return {
  height: 60px;
  width: 60px;
  border-radius: 50%;
  background-color: #999999;
  color: white;
  /*margin: 20px;*/
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
}
.detailsPageImg {
  width: 100vw;
  height: 50vh;
}
.custom-indicator {
  text-align: center;
}
.detailsPage-shopping-name {
  margin: 20px 0 20px 20px;
  font-size: 30px;
}
.detailsPage-shopping-price {
  margin-left: 20px;
  color: #bd2323;
}
.detailsPage-box {
  width: 100vw;
  height: 80px;
  color: #999;
  font-size: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0;
  border-top: #f2f2f2 solid 1px;
  border-bottom: #f2f2f2 solid 1px;
}
.detailsPage-freight {
  margin-left: 40px;
}
.detailsPage-collection {
  margin-right: 40px;
  display: flex;
  align-items: center;
}
.detailsPage-shopping {
  width: 100vw;
  height: 80px;
  font-size: 30px;
  align-items: center;
  display: flex;
  justify-content: space-between;
}
.detailsPage-shopping-1 {
  display: flex;
  margin: 0 40px;
}
.detailsPage-shopping-Icon1 {
  margin-right: 20px;
}
.detailsPage-shoppings {
  font-size: 30px;
}
.cl-labelPage-shopping-shopping {
  display: flex;
  justify-content: space-around;
}
.cl-labelPage-shopping-5 {
  height: 60px;
  width: 200px;
  font-size: 30px;
  text-align: center;
  line-height: 60px;
  color: #999999;
}
//改变button标签的高度和字体大小
.van-button--large {
  height: 110px;
  font-size: 40px;
}
//改变客服、购物车外框的大小
.van-goods-action-icon {
  font-size: 30px;
  height: 110px;
  width: 15vw;
}
//改变客服、购物车外框图标的大小
.van-goods-action-icon__icon {
  font-size: 50px;
}
//商品详情图片的margin
.cl-labelPage-CommodityDetails {
  margin-bottom: 110px;
}
//商品评论
.Commodity-evaluation-box {
  margin-bottom: 135px
}
//实名评价
.Commodity-evaluation-Real-name {
  width: 100vw;
  display: flex;
  align-items: center;
  margin: 20px 0;
}
//头像
.Commodity-evaluation-img {
  height: 140px;
  width: 140px;
  background-image: url("../imsge/name.jpg");
  background-size: 100%;
  border-radius: 50%;
}
.Commodity-evaluation-name {
  margin-left: 20px;
  font-size: 30px;
}
.Commodity-evaluation-time {
  margin-left: 80px;
}
//匿名评价
.Commodity-evaluation-anonymous {
  width: 100vw;
  display: flex;
  align-items: center;
}
.on-box {
  display: flex;
  position: relative;
}
.on-box-img {
  border: #999 1px solid;
}
.on-img {
  width: 160px;
  height: 160px;
}
.on-name {
  margin: 30px;
  font-size: 30px;
}
.on-price {
  color: red;
  margin-left: 26px;
}
.on-font {
  height: 30px;
  width: 30px;
  border: black 2px solid;
  border-radius: 50%;
  position: absolute;
  right: 40px;
  top: 40px;
  /*background-color: black;*/
}
.on-bottom {
  height: 180px;
  display: flex;
  position: relative;
  border-top: lightgrey solid 2px;
  border-bottom: lightgrey solid 2px;
  margin-top: 20px;
}
.on-stepping {
  position: absolute;
  margin-top: 40px;
  right: 60px;
}
.on-bottom-name {
  margin: 30px;
  font-size: 30px;
}
.on-bottom-span1 {
  margin-left: 30px;
  color: lightgrey;
  font-size: 30px;
}
.on-bottom-span2 {
  color: red;
  margin-left: 30px;
  font-size: 30px;
}
.on-bottom1 {
  width: 100vw;
  height: 100px;
  background-color: red;
  color: white;
  font-size: 40px;
  line-height: 100px;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
}
//评论的右上角提示信息
.van-info {
  line-height: 25px;
}
</style>
