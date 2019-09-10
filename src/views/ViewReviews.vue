<template>
    <div>
        <div>
            <div class="viewReviews-header">
                <div class="viewReviews-header-img" @click="viewReviewsItem">
                    <van-icon name="arrow-left" size="20px" />
                </div>
                <div>评价详情</div>
            </div>
            <div class="viewReviews-content-box">
                <div class="viewReviews-content-box2" ></div>
                <div class="viewReviews-content-star">
                    <van-rate
                            v-model="viewReviewsAll.rate"
                            readonly
                            :size="20"
                            color="red"
                            void-icon="star"
                            void-color="#eee"
                    />
                </div>
                <div class="viewReviews-content-time">{{viewReviewsAll.comment_time}}</div>
            </div>
            <div class="viewReviews-content-box1">
                <div>评价内容：</div>
                <div>{{viewReviewsAll.content}}</div>
            </div>
            <div class="viewReviews-content-box3">
                <img :src="this.images" alt="" class="viewReviews-content-box3-img">
                <div class="viewReviews-content-box3-name">{{this.name}}</div>
                <div class="viewReviews-content-box3-imgs"><van-icon name="cart" size="30px" color="red" class="viewReviews-img" @click="viewReviewsItems" /></div>
            </div>
        </div>

    </div>

</template>

<script>
    import { Toast } from "vant";
    export default {
        name: "viewReviews",
        components: {},
        props: {},
        data() {
            return {
                viewReviewsAll:{},
                images:"",
                name:"",
                goodsId:""
            }
        },
        methods: {
            viewReviewsItem () {
                this.$router.push({name:"comment"})
            },
            viewReviewsItems (){
                this.$axios
                    .req(`api/addShop`, { id:this.goodsId})
                    .then(response => {
                        if (response.code === 200) {
                            Toast.success("加入购物车成功");
                            this.$store.state.goodsId.push(this.goodsId);
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    });
    }
        },
        mounted() {
            //已评价传参
            if (this.$route.query.comment2) {
                this.viewReviewsAll = this.$route.query.comment2;
                this.images = this.$route.query.image,
                this.name = this.$route.query.name,
                this.goodsId = this.$route.query.id;
                console.log(this.$route.query.comment2);
            }
        },
        created() {

        },
        filters: {},
        computed: {},
        watch: {},
        directives: {}
    }
</script>

<style scoped lang="scss">
    .viewReviews-header {
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
    .viewReviews-header-img {
        position: absolute;
        left: 40px;
        top: 50%;
        transform: translateY(-20px);
    }
    .viewReviews-content-box {
        width: 100vw;
        height: 120px;
        line-height: 120px;
        font-size: 30px;
        display: flex;
    }
    //背景图片
    .viewReviews-content-box2 {
        width: 120px;
        height: 120px;
        margin: 20px;
        background-image: url("../imsge/name.jpg");
        background-size: 100%;
        border-radius: 50%;
        border: lightblue solid 2px;
    }
    //星星div
    .viewReviews-content-star {
        margin-top: 20px;
        margin-left: 20px;
    }
    //时间
    .viewReviews-content-time {
        margin-top: 20px;
        margin-left: 40px;
    }
    .viewReviews-content-box1 {
        font-size: 30px;
        margin-top: 40px;
        margin-left: 20px;
        display: flex;
    }
    //商品详情
    .viewReviews-content-box3 {
        width: 100vw;
        font-size: 30px;
        border-top: lightblue solid 2px;
        border-bottom:lightblue solid 2px;
        margin-top: 20px;
        display: flex;
    }
    //商品图片
    .viewReviews-content-box3-img {
        width: 160px;
        height: 160px;
        margin: 20px;
    }
    //商品名称
    .viewReviews-content-box3-name {
        margin-top: 30px;
    }
    //购物车
    .viewReviews-content-box3-imgs {
        width: 80px;
        height: 80px;
        text-align: center;
        line-height: 80px;
        background-color: lightblue;
        border-radius: 50px;
        margin-top: 80px;
        margin-left: 40px;
    }
    .viewReviews-img {
        margin-top: 10px;
    }
</style>
