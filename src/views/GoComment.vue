<template>
    <div>
        <div class="goComment-header">
            <div class="goComment-header-img" @click="goCommentItem">
                <van-icon name="arrow-left" size="20px" />
            </div>
            <div>评价单品</div>
        </div>
      <div class="goComment-content-box">
          <div><img :src="goCommentAll.image_path" alt="" class="goComment-content-img"></div>
          <div>
              <div class="goComment-content-name">商品评分</div>
              <div class="goComment-content-img1">
                  <van-rate v-model="value" size="20px" color="red" />
              </div>
          </div>
      </div>
        <div>
            <textarea v-model="strings" class="text-box" />
        </div>
        <div class="goComment-content-election">
            <input type="checkbox" v-model="election" class="goComment-input"> 匿名评价
        </div>
       <div class="goComment-bottom" @click="Submission">
           提交
       </div>
    </div>
</template>

<script>
    import axios from "axios"
    import { Toast } from "vant";
    export default {
        name: "goComment",
        components: {},
        props: {},
        data() {
            return {
                goCommentAll:{},
                value:0,
                strings:"",
                election:false,
                imgArr:[]
            }
        },
        methods: {
            goCommentItem (){
                this.$router.go(-1)
            },
            //提交评价
            Submission () {
                axios
                    .post(`api/goodsOne/comment`,{
                        anonymous:this.election,
                        content:this.strings,
                        id:this.goCommentAll.cid,
                        image:this.imgArr,
                        order_id:this.goCommentAll.order_id,
                        rate:this.value,
                        _id:this.goCommentAll._id
                        })
                    .then(response =>{
                        if (response) {
                            console.log(response);
                            Toast.success("评价成功");
                            this.$router.go(-1)
                        }
                    })
                    .catch(e =>{
                        console.log(e);
                    })
            }
        },
        mounted() {
            if (this.$route.query.comment1) {
                this.goCommentAll = this.$route.query.comment1
                console.log(this.goCommentAll);
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
    .goComment-header {
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
    .goComment-header-img {
        position: absolute;
        left: 40px;
        top: 50%;
        transform: translateY(-20px);
    }
    .goComment-content-box {
        display: flex;
        width: 100vw;
    }
    //商品图片
    .goComment-content-img {
        width: 160px;
        height: 160px;
        margin: 20px;
    }//商品名字
    .goComment-content-name {
        margin-top: 40px;
        font-size: 30px;
    }
    //评价星星
    .goComment-content-img1 {
        margin-top: 40px;
    }
    //输入框
    .text-box {
        width: 99vw;
        height: 600px;
    }
    //匿名评价
    .goComment-content-election {
        font-size: 30px;
        margin-left: 40px;
    }
    //提交框
    .goComment-bottom {
        width: 90vw;
        height: 120px;
        margin: 40px auto;
        text-align: center;
        line-height: 120px;
        font-size: 30px;
        background-color: #1aad19;
        color: white;
    }
    //匿名input
    .goComment-input {
        zoom: 100%;
    }
</style>
