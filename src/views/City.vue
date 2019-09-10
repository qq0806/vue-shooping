<template>
  <div class="city">
    <div class="city-box">
      <div class="city-header">
        <div class="city-span">
          <span class="city-return" @click="cityReturn">＜</span>
          <span class="city-list">城市列表</span>
        </div>
      </div>
      <div class="city-input">
        <van-search
          placeholder="请输入城市关键词"
          v-model="citys"
          class="input"
          @focus="FocusObj1"
          @blur="BlurObj1"
          @keydown.delete="Delete"
        />
      </div>
      <CityListData v-if="this.showCity === true" :cityData2="cityData2"></CityListData>
      <div v-else-if="this.showCity === false">
      <div class="city-current1">当前城市</div>
      <div class="city-current2">
        <div class="city-current3">{{this.$store.state.cityData}}</div>
      </div>
      <div class="city-current1">热门城市</div>
      <div v-if="indexList.hotCities" class="city-popular">
        <div v-for="(item, index) in indexList.hotCities" :key="index" @click="Popular(item)">
          {{ item.name }}
        </div>
      </div>
      <div class="city-Letter-font">
        <van-index-bar>
          <div v-for="(item,index) in indexList.cities" :key="index">
            <van-index-anchor :index="index" />
            <div v-for="(item1,index1) in item" :key="index1"  @click="CtiyItem(item1)" >
             <van-cell :title="item1.name"/>
            </div>
          </div>
        </van-index-bar>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import city from "../js/city";
import CityListData from "../components/CityListData/CityListData"
export default {
  name: "city",
  components: {
    CityListData
  },
  props: {},
  data() {
    return {
      citys: "",
      indexList: [],
      cityData1:[],
      cityData2:[],
      cityData3:[],
      showCity:false
    };
  },
  methods: {
    cityReturn() {
      this.$router.push({ name: "home" });
    },
    //热门城市
    Popular (item) {
      this.$store.state.cityData = item.name
    },
    //城市
    CtiyItem(item1) {
      this.$store.state.cityData = item1.name
    },
    //获取焦点
    FocusObj1 () {
      this.showCity = true
    },
    //失去焦点
    BlurObj1 () {
      this.showCity = false
    },
    //键盘事件
    Delete () {
      this.cityData2 = this.cityData3
    }
  },
  mounted() {
    this.indexList = city.data;
    console.log(this.indexList);
    //cityData2 获取所有城市
   for (let i in this.indexList.cities) {
     this.cityData1.push(this.indexList.cities[i])
   }
   this.cityData1.forEach(item =>{
     item.forEach(item1 =>{
       this.cityData2.push(item1)
     })
   });
   this.cityData3 = this.cityData2;
    console.log(this.cityData3);
  },
  created() {},
  filters: {},
  computed: {},
  watch: {
    citys (val){
      console.log(val);
      this.cityData2 = this.cityData2.filter(item =>{
        return JSON.stringify(item).indexOf(val) !== -1
             });
      console.log(this.cityData2);
    }
  },
  directives: {}
};
</script>

<style scoped lang="scss">
.city {
  width: 100vw;
  height: 100vh;
  background-color: #f2f2f2;
}
.city-header {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
}
.city-span {
  width: 100vw;
  height: 80px;
  background-color: white;
  line-height: 80px;
  font-size: 30px;
  display: flex;
  justify-content: center;
  position: relative;
}
.city-return {
  position: absolute;
  left: 20px;
}
.city-input {
  margin-top: 100px;
}
.van-cell {
  width: 80vw;
  height: 60px;
  background-color: white;
  line-height: 60px;
}
.city-current1 {
  margin: 20px;
  font-size: 30px;
}
.city-current2 {
  background-color: white;
  width: 100vw;
  height: 100px;
  display: flex;
}
.city-current3 {
  border: solid 1px #7d7e80;
  height: 60px;
  width: 30vw;
  text-align: center;
  line-height: 60px;
  margin: 20px;
  font-size: 30px;
}
.city-popular {
  height: 190px;
  display: flex;
  flex-wrap: wrap;
  background-color: white;
}
.city-popular > div {
  margin-left: 20px;
  margin-top: 20px;
  width: 30vw;
  height: 60px;
  text-align: center;
  line-height: 60px;
  font-size: 30px;
  border: solid 1px #7d7e80;
}
</style>
