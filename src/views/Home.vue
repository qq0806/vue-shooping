<template>
    <div class="Home">
        <div class="home-header">
            <van-loading type="spinner" color="#1989fa" v-if="this.$store.state.Location === false"/>
            <div class="home-city" @click="city" v-else>
                {{cityName}}
                <van-icon name="location-o"/>
            </div>
            <div class="home-input">
                <van-search placeholder="请输入搜索关键词" v-model="value" @focus="FocusObj" @blur="BlurObj"/>
            </div>
        </div>
        <Search v-if="search === true" :searchAll="searchAll"></Search>
        <div v-else>
            <van-pull-refresh v-model="isLoading" v-if="images" @refresh="onRefresh">
                <div class="home-wheel" v-if="images.slides">
                    <van-swipe :autoplay="3000">
                        <van-swipe-item v-for="(item, index) in images.slides" :key="index">
                            <img :src="item.image" alt="" class="home-image"/>
                        </van-swipe-item>
                    </van-swipe>
                    <div class="home-img">
                        <div
                                v-for="(item, index) in images.category"
                                :key="index"
                                class="img-item"
                                @click="classificationItem(item)"
                        >
                            <img :src="item.image" alt="" class="img"/>
                            <div>{{ item.mallCategoryName }}</div>
                        </div>
                    </div>
                </div>
                <div v-if="images.advertesPicture">
                    <img
                            :src="images.advertesPicture.PICTURE_ADDRESS"
                            alt=""
                            class="home-image1"
                    />
                </div>
                <div class="home-font">商品推荐</div>
                <div class="person-wrap" ref="personWrap">
                    <div class="home-shopping">
                        <div
                                v-for="(item, index) in images.recommend"
                                :key="index"
                                class="home-flex"
                        >
                            <img :src="item.image" alt="" class="shopping-img"/>
                            <div class="shopping-font">{{ item.goodsName }}</div>
                            <span>￥{{ item.price }}</span>
                            <span class="span-line">￥{{ item.mallPrice }}</span>
                            <div class="shopping-bottom">
              <span class="spam-join" @click="goShopping(item)">
                <van-icon name="shopping-cart-o"/>
              </span>
                                <span class="span-details" @click="detailsPageItem(item)"
                                >查看详情</span
                                >
                            </div>
                        </div>
                    </div>
                </div>
                <div class="home-all-floors">
                    <div class="home-floor1" v-if="images.floor1">
                        <div class="home-floor1-title">
                            <span class="span-floor">1F</span>
                            <span>{{ images.floorName.floor1 }}</span>
                        </div>
                        <div class="floor1--1">
                            <div class="home-floor1-img">
                                <img
                                        :src="images.floor1[0].image"
                                        class="floors-img"
                                        @click="imgclick(images.floor1[0].goodsId)"
                                />
                                <div>
                                    <img
                                            :src="images.floor1[1].image"
                                            class="floors-img"
                                            @click="imgclick(images.floor1[1].goodsId)"
                                    />
                                    <img
                                            :src="images.floor1[2].image"
                                            class="floors-img"
                                            @click="imgclick(images.floor1[2].goodsId)"
                                    />
                                </div>
                            </div>
                            <div class="home-floor1-img">
                                <img
                                        :src="images.floor1[3].image"
                                        class="floors-img"
                                        @click="imgclick(images.floor1[3].goodsId)"
                                />
                                <img
                                        :src="images.floor1[4].image"
                                        class="floors-img"
                                        @click="imgclick(images.floor1[4].goodsId)"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="home-floor2" v-if="images.floor2">
                        <div class="home-floor2-title">
                            <span class="span-floor">2F</span>
                            <span>{{ images.floorName.floor2 }}</span>
                        </div>
                        <div class="floor2--2">
                            <div class="home-floor2-img">
                                <img
                                        :src="images.floor2[0].image"
                                        class="floors-img"
                                        @click="imgclick(images.floor2[0].goodsId)"
                                />
                                <div>
                                    <img
                                            :src="images.floor2[1].image"
                                            class="floors-img"
                                            @click="imgclick(images.floor2[1].goodsId)"
                                    />
                                    <img
                                            :src="images.floor2[2].image"
                                            class="floors-img"
                                            @click="imgclick(images.floor2[2].goodsId)"
                                    />
                                </div>
                            </div>
                            <div class="home-floor2-img">
                                <img
                                        :src="images.floor2[3].image"
                                        class="floors-img"
                                        @click="imgclick(images.floor2[3].goodsId)"
                                />
                                <img
                                        :src="images.floor2[4].image"
                                        class="floors-img"
                                        @click="imgclick(images.floor2[4].goodsId)"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="home-floor3" v-if="images.floor3">
                        <div class="home-floor2-title">
                            <span class="span-floor">3F</span>
                            <span>{{ images.floorName.floor3 }}</span>
                        </div>
                        <div class="floor3--3">
                            <div class="home-floor3-img">
                                <img
                                        :src="images.floor3[0].image"
                                        class="floors-img"
                                        @click="imgclick(images.floor3[0].goodsId)"
                                />
                                <div>
                                    <img
                                            :src="images.floor3[1].image"
                                            class="floors-img"
                                            @click="imgclick(images.floor3[1].goodsId)"
                                    />
                                    <img
                                            :src="images.floor3[2].image"
                                            class="floors-img"
                                            @click="imgclick(images.floor3[2].goodsId)"
                                    />
                                </div>
                            </div>
                            <div class="home-floor3-img">
                                <img
                                        :src="images.floor3[3].image"
                                        class="floors-img"
                                        @click="imgclick(images.floor3[3].goodsId)"
                                />
                                <img
                                        :src="images.floor3[4].image"
                                        class="floors-img"
                                        @click="imgclick(images.floor3[4].goodsId)"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="home-sell-well" v-if="images.hotGoods">
                    <div class="sell-well-title">热销商品</div>
                    <div class="sell-well-box">
                        <div
                                v-for="(item, index) in images.hotGoods"
                                :key="index"
                                class="sell-well-div"
                                @click="commodities(item)"
                        >
                            <img :src="item.image" alt="" class="sell-well-img"/>
                            <div class="sell-well-name">{{ item.name }}</div>
                            <div class="sell-well-bottom">
                                <span class="sell-well-present">￥{{ item.price }}</span>
                                <span class="sell-well-price">￥{{ item.mallPrice }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </van-pull-refresh>
        </div>
        <div>
            <Bottom></Bottom>
        </div>
    </div>
</template>

<script>
    import Bottom from "../components/Bottom/Bottom";
    import BScroll from "better-scroll";
    import {Toast} from "vant";
    import Search from "../components/Search/Search"

    export default {
        name: "Home",
        components: {
            Bottom,
            Search,
        },
        props: {},
        data() {
            return {
                images: {},
                isLoading: false,
                aaa: false,
                value: "",
                //搜索组件的显示
                search: false,
                searchAll: [],
                SearchHistory1: []
            };
        },
        methods: {
            //请求数据
            getData() {
                this.$axios
                    .req("api/recommend")
                    .then(response => {
                        if (response) {
                            this.images = response.data;
                            this.$store.state.category = this.images.category;
                            console.log(this.images);
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },

            //下拉刷新
            onRefresh() {
                setTimeout(() => {
                    this.$toast("刷新成功");
                    this.isLoading = false;
                }, 500);
            },
            //加入购物车
            goShopping(item) {
                if (!this.$store.state.user) {
                    this.$router.push({name: "login"});
                } else {
                    this.$axios
                        .req(`api/addShop`, {id: item.goodsId})
                        .then(response => {
                            if (response.code === 200) {
                                Toast.success("加入购物车成功");
                                this.$store.state.goodsId.push(item.goodsId);
                            }
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
            },
            //分类点击进入分类页面
            classificationItem(item) {
                this.$router.push({
                    name: "classification",
                    query: {
                        category: this.images.category,
                        bxMallSubDto: item.bxMallSubDto,
                        mallCategoryId: item.mallCategoryId
                    }
                });
            },
            //商品推荐查看商品详情
            detailsPageItem(item) {
                this.$router.push({
                    name: "detailsPage",
                    query: {
                        goodsId: item.goodsId
                    }
                });
            },
            //1F\2f\3F查看商品详情
            imgclick(id) {
                this.$router.push({
                    name: "detailsPage",
                    query: {
                        goodsId1: id
                    }
                });
            },
            //热销商品查看商品详情
            commodities(item) {
                this.$router.push({
                    name: "detailsPage",
                    query: {
                        goodsId2: item.goodsId
                    }
                });
            },
            //获取焦点
            FocusObj() {
                this.search = true
            },
            //失去焦点
            BlurObj() {
                this.search = false;
                this.SearchHistory1.push(this.value);
                localStorage.setItem("SearchHistory", JSON.stringify(this.SearchHistory1));
            },
            //跳到城市
            city() {
                this.$router.push({name: "city"});
            }
        },
        mounted() {
            this.getData();
            //页面平滑滚动
            this.$nextTick(() => {
                this.scroll = new BScroll(this.$refs.personWrap, {
                    startX: 0,
                    click: true,
                    scrollX: true,
                    scrollY: false,
                    eventPassthrough: "vertical"
                });
            });
            if (this.$store.state.Location === false) {
                //定位功能
                //定位中this指向改变，先把this指向存储
                let _this = this
                AMap.plugin('AMap.Geolocation', function () {
                    var geolocation = new AMap.Geolocation({
                        // 是否使用高精度定位，默认：true
                        enableHighAccuracy: true,
                        // 设置定位超时时间，默认：无穷大
                        timeout: 10000,
                    });
                    geolocation.getCurrentPosition();
                    AMap.event.addListener(geolocation, 'complete', onComplete);
                    AMap.event.addListener(geolocation, 'error', onError);

                    function onComplete(data) {
                        console.log(data);
                        _this.$store.state.cityData = data.addressComponent.city;
                        _this.$store.state.Location = true
                        // data是具体的定位信息
                    }

                    function onError(data) {
                        // 定位出错
                    }
                })
            }
            ;
            this.SearchHistory1 = JSON.parse(localStorage.getItem("SearchHistory"))

        },
        created() {
        },
        filters: {},
        computed: {
            cityName() {
                return this.$store.state.cityData
            }
        },
        watch: {
            //搜索请求
            value(val) {
                this.$axios
                    .req("api/search", {value: val})
                    .then(response => {
                        if (response) {
                            this.searchAll = response.data.list
                            this.searchAll.map((item, index) => {
                                // console.log('item', item)
                                if (this.value && this.value.length > 0) {
                                    // 匹配关键字正则
                                    let replaceReg = new RegExp(this.value, 'g')
                                    // 高亮替换v-html值
                                    let replaceString =
                                        '<span class="search-text">' + this.value + '</span>'
                                    this.searchAll[index].name = item.name.replace(
                                        replaceReg,
                                        replaceString
                                    )
                                }
                            });
                            console.log(this.searchAll);
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    })
            }
        },
        directives: {}
    };
</script>

<style scoped lang="scss">
    .home-header {
        width: 100%;
        height: 80px;
        display: flex;
        background-color: #f2f2f2;
        line-height: 60px;
        position: fixed;
        left: 0px;
        top: 0px;
        z-index: 1000;
    }

    .home-city {
        width: 18%;
        font-size: 30px;
        padding: 10px;
    }

    .home-input {
        width: 80%;
        padding: 10px;
    }

    .home-wheel {
        margin-top: 60px;
    }

    .home-img {
        width: 100vw;
        height: 160px;
        display: flex;
        background-color: #f2f2f2;
    }

    .img-item {
        text-align: center;
        align-items: center;
        margin-left: -10px;
        flex: 1;
    }

    .img {
        height: 100px;
        width: 100px;
    }

    .home-image {
        width: 100%;
        height: 300px;
    }

    .home-image1 {
        width: 95%;
        height: 100px;
        margin: 10px;
    }

    .home-font {
        font-size: 30px;
        margin: 10px 40px;
    }

    .person-wrap {
        display: flex;
        width: 100%;
        overflow: hidden;
    }

    .home-shopping {
        display: flex;
        background-color: #f2f2f2;
    }

    .home-flex {
        margin: 10px;
    }

    .shopping-img {
        width: 230px;
        height: 240px;
    }

    .shopping-font {
        width: 230px;
        height: 32px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .span-line {
        text-decoration: line-through;
        margin-left: 40px;
    }

    .spam-join {
        display: inline-block;
        height: 60px;
        width: 60px;
        background-color: yellowgreen;
        color: white;
        line-height: 60px;
        horiz-align: center;
        text-align: center;
        font-size: 30px;
        margin: 10px 0;
        border-radius: 10px 0 0 10px;
    }

    .span-details {
        display: inline-block;
        height: 60px;
        width: 170px;
        background-color: red;
        color: white;
        text-align: center;
        line-height: 60px;
        font-size: 30px;
        margin: 10px 0;
        border-radius: 0 10px 10px 0;
    }

    .home-floor1-title,
    .home-floor2-title,
    .home-floor3-title {
        height: 60px;
        width: 100%;
        margin: 10px 0;
        background-color: lightgrey;
        color: red;
        text-align: center;
        line-height: 60px;
    }

    .span-floor {
        height: 60px;
        width: 60px;
        border-radius: 50%;
        background-color: red;
        color: white;
    }

    .home-floor1-img,
    .home-floor2-img,
    .home-floor3-img {
        display: flex;
    }

    .floors-img {
        width: 50vw;
        border: solid 1px lightgrey;
    }

    .sell-well-title {
        background-color: #f2f2f2;
        color: red;
        width: 100vw;
        height: 60px;
        text-align: center;
        line-height: 60px;
        font-size: 30px;
        margin: 10px 0;
    }

    .sell-well-box {
        display: flex;
        flex-wrap: wrap;
    }

    .sell-well-div {
        width: 49.5vw;
        border: solid 1px lightgrey;
        /*margin-left: 1.5px;*/
    }

    .sell-well-img {
        width: 49.5vw;
        /*height: 370px;*/
    }

    .sell-well-name {
        width: 50vw;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-left: 5px;
        color: red;
        font-size: 25px;
    }

    .sell-well-bottom {
        width: 50vw;
        text-align: center;
    }

    .sell-well-present {
        font-size: 30px;
        color: red;
    }

    .sell-well-price {
        font-size: 14px;
        text-decoration: line-through;
        color: #7d7e80;
    }

    .home-sell-well {
        margin-bottom: 110px;
    }
</style>
