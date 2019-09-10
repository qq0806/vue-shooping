<template>
  <div>
    <div>
      <div class="cl-header">商品分类</div>
      <div class="cl-content">
        <div class="cl-sidebar">
          <van-sidebar v-model="activeKey" class="cl-sidebar-left-van">
            <div
              v-for="(item, index) in category"
              :key="index"
              class="cl-sidebar-text"
              @click="sidebarAll(index)"
            >
              <van-sidebar-item :title="item.mallCategoryName" />
            </div>
          </van-sidebar>
        </div>
        <div class="cl-labelPage" v-if="bxMallSubDto">
          <van-tabs
            @click="labelPageAll"
            v-model="active"
          >
            <van-tab
              v-for="(item, index) in bxMallSubDto"
              :title="item.mallSubName"
              :key="index"
              :name="index"
            >
            </van-tab>
          </van-tabs>
          <div id="app">
            <div class="cl-labelPage-box">
              <div
                v-for="(item, index) in objId"
                :key="index"
                class="cl-labelPage-img-box"
                @click="labelPage(item)"
              >
                <div>
                  <img :src="item.image" alt="" class="cl-labelPage-img" />
                </div>
                <div class="cl-labelPage-name">
                  <div class="cl-labelPage-name1">
                    {{ item.name }}
                  </div>
                  <div class="cl-labelPage-price">
                    <span class="cl-labelPage-span1"
                      ><b>￥{{ item.present_price }}</b></span
                    >
                    <span class="cl-labelPage-span2">{{ item.orl_price }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Bottom></Bottom>
      </div>
    </div>
  </div>
</template>

<script>
import Bottom from "../components/Bottom/Bottom";
export default {
  name: "classification",
  components: {
    Bottom
  },
  props: {},
  data() {
    return {
      activeKey: 0,
      category: [],
      bxMallSubDto: [],
      mallCategoryId: "",
      mallSubId: "",
      objId: "",
      labelPageArr: "",
      active: 0,
      single: ""
    };
  },
  methods: {
    //点击查看详细分类
    labelPageAll(name) {
      this.mallSubId = this.bxMallSubDto[name].mallSubId;
      this.$axios
        .req(`api/classification?mallSubId=${this.mallSubId}`)
        .then(response => {
          if (response) {
            this.objId = response.dataList;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    //查看分类信息
    sidebarAll(index) {
      this.bxMallSubDto = this.category[index].bxMallSubDto;
      this.mallSubId = this.bxMallSubDto[0].mallSubId;
      this.$axios
        .req(`api/classification?mallSubId=${this.mallSubId}`)
        .then(response => {
          if (response) {
            this.objId = response.dataList;
          }
        })
        .catch(e => {
          console.log(e);
        });
      this.active = 0;
    },
    //查看物品详情
    labelPage(item) {
      this.$store.state.category2 = item.id;
      this.$router.push({
        name: "detailsPage",
        query: {
          goodsId3: item.id
        }
      });
    }
  },
  mounted() {
    //如果不是通过点击详细分类传参
    if (!this.$route.query.bxMallSubDto) {
      this.category = this.$route.query.category1;
      this.bxMallSubDto = this.category[0].bxMallSubDto;
      this.mallSubId = this.bxMallSubDto[0].mallSubId;
      this.activeKey = this.category[0].mallCategoryId - 1;
      this.$axios
        .req(`api/classification?mallSubId=${this.mallSubId}`)
        .then(response => {
          if (response) {
            this.objId = response.dataList;
          }
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      this.category = this.$route.query.category;
      this.bxMallSubDto = this.$route.query.bxMallSubDto;
      this.mallCategoryId = this.$route.query.mallCategoryId;
      this.activeKey = this.mallCategoryId - 1;
      this.mallSubId = this.bxMallSubDto[0].mallSubId;
      this.$axios
        .req(`api/classification?mallSubId=${this.mallSubId}`)
        .then(response => {
          if (response) {
            this.objId = response.dataList;
          }
        })
        .catch(e => {
          console.log(e);
        });
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
#app {
  margin-bottom: 110px;
}
.cl-header {
  width: 100vw;
  height: 100px;
  font-size: 30px;
  text-align: center;
  line-height: 100px;
  border-bottom: #f2f2f2 1px solid;
}
.cl-sidebar-text {
  width: 20vw;
}
.van-sidebar-item--select {
  border-color: white;
}
.cl-content {
  display: flex;
  position: relative;
  margin-bottom: 200px;
}
.cl-labelPage {
  width: 80vw;
  position: absolute;
  right: 0;
}
.cl-labelPage-img-box {
  display: flex;
  border-top: #f2f2f2 0.5px solid;
  border-bottom: #f2f2f2 0.5px solid;
}
.cl-labelPage-name {
  margin: 20px 0px 20px 40px;
}
.cl-labelPage-name1 {
  font-size: 26px;
  /*font-weight: bold;*/
  color: #bd2323;
}
.cl-labelPage-price {
  margin-top: 40px;
}
.cl-labelPage-img {
  height: 160px;
  width: 160px;
  margin: 20px 0px 20px 20px;
  border: #f2f2f2 1px solid;
}
.cl-labelPage-span1 {
  color: #bd2323;
  font-size: 30px;
}
.cl-labelPage-span2 {
  text-decoration: line-through;
  font-size: 20px;
  margin-left: 20px;
}
</style>
