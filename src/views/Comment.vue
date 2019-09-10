<template>
    <div>
        <div class="comment-header">
            <div class="comment-header-img" @click="commentItem1">
                <van-icon name="arrow-left" size="20px" />
            </div>
            <div>评价中心</div>
        </div>
        <div class="comment-content-img">
        </div>
        <div class="comment-content-names">
            <div
            class="comment-content-name1"
            :class="{name2:num1 === 0}"
            @click="nameItem1"
            >待评价</div>
            <div
             class="comment-content-name1"
             :class="{name2:num1 === 1}"
             @click="nameItem2"
            >已评价</div>
        </div>
        <div v-if="!this.$store.state.user" class="comment-Tips">
            亲，您还没登录噢～～
        </div>
        <div v-if="this.$store.state.user">
            <div class="comment-content-loop-box" v-if="this.num1 === 0">
                <div v-for="(item,index) in listAll" :key="index" class="comment-content-loop" >
                    <img :src="item.image_path" class="comment-content-loop-img" >
                    <div class="comment-content-loop-name">
                        <div>{{item.name}}</div>
                        <div class="cots" @click="goComment(item)">评价晒单</div>
                    </div>
                </div>
            </div>
            <div class="comment-content-loop-box" v-else-if="this.num1 ===1">
                <div v-for="(item,index) in commentAll" :key="index" class="comment-content-loop"  >
                    <img :src="item.goods[0].image_path" alt="" class="comment-content-loop-img" >
                    <div class="comment-content-loop-name">
                        <div>{{item.goods[0].name}}</div>
                        <div class="cots" @click="goComment1(item)">查看评价</div>
                    </div>
                </div>
            </div>
            <div v-if="this.commentAll===[] && this.listAll ===[]" class="comment-Tips">
                亲，购买商品才能评论
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "comment",
        components: {},
        props: {},
        data() {
            return {
                //未评论
                listAll:[],
                //已评论
                commentAll:[],
                comment1:[],
                num1:0,
            }
        },
        methods: {
            //返回会员中心
            commentItem1() {
              this.$router.push({name:"my"})
            },
            //获取未评论数据
            getOrderNum () {
                this.$axios
                    .req("api/tobeEvaluated")
                    .then(response =>{
                        if (response){
                            this.listAll = response.data.list
                        }
                    })
                    .catch(e=>{
                        console.log(e);
                    })
            },
            //获取已评论数据
            alreadyEvaluated () {
                this.$axios
                    .req("api/alreadyEvaluated")
                    .then(response => {
                        if (response) {
                            this.commentAll = response.data.list;
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    })
            },
            nameItem1 () {
                this.num1 =0
            },
            nameItem2 () {
                this.num1 =1
            },
            //去评论
            goComment (item) {
                this.$router.push({
                    name:"goComment",
                    query:{
                     comment1:item
                    }
                })
            },
            //查看评价
            goComment1 (item){
                this.$router.push({
                    name:"viewReviews",
                    query:{
                        comment2:item,
                        image:item.goods[0].image_path,
                        name:item.goods[0].name,
                        id:item.goods[0].id
                    }
                })
            }
        },
        mounted() {
            if (this.$store.state.user) {
                //获取未评论数据
                this. getOrderNum (),
                    //获取已评论数据
                    this.alreadyEvaluated ()
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
    .comment-header {
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
    .comment-header-img {
        position: absolute;
        left: 40px;
        top: 50%;
        transform: translateY(-20px);
    }
    //背景图片
    .comment-content-img{
        width: 100vw;
        height: 420px;
        background-image: url("../imsge/evaluate.jpg");
        background-size: 100%;
    }
    //评论框
    .comment-content-names {
        width: 80vw;
        height: 100px;
        margin:-40px auto;
        background-color: white;
        display: flex;
        border-radius: 20px;
    }
    //评论字体
    .comment-content-name1 {
        width: 50vw;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: lightblue;
        font-size: 30px;
    }
    //动态绑定
    .name2 {
        color: black;
        border-bottom: lightblue solid 4px;
    }
    //登录提示
    .comment-Tips {
        margin-top: 100px;
        width: 100vw;
        height: 200px;
        font-size: 30px;
        color: skyblue;
        line-height: 200px;
        text-align: center;
    }
    //循环框
    .comment-content-loop-box {
       margin-top: 50px;
    }
    //
    .comment-content-loop {
        display: flex;
        margin-top: 20px;
    }
    //循环图片
    .comment-content-loop-img {
        width: 160px;
        height: 160px;
        margin-left: 40px;
    }
    //名字
    .comment-content-loop-name {
        width: 70vw;
        font-size: 30px;
        margin-left: 40px;
        position: relative;
    }
    //评论晒单
.cots{
   width: 200px;
    height: 60px;
    border: orange solid 2px;
    border-radius: 30px ;
    text-align: center;
    line-height: 60px;
    color: orange;
    position: absolute;
    right: 20px;
    bottom: 10px;
}
</style>
