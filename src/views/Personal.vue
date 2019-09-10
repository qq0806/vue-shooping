<template>
    <div>
        <div class="personal-header">
            <div class="personal-header-img" @click="personal">
                <van-icon name="arrow-left" size="20px" />
            </div>
            <div>个人信息</div>
        </div>
        <div v-if="!this.$store.state.user" class="personal-Tips">
            亲，您还没登录噢～～
        </div>
        <div v-if="this.$store.state.user">
        <div class="personal-box">
            <span class="personal-content-font">Github</span>
        </div>
        <div class="personal-content-box">
            <div class="personal-content-font">头像</div>
            <div>
                <img :src="PersonalAll.avatar" alt="" class="personal-content-img">
            </div>
        </div>
        <div class="personal-content-box1">
            <div class="personal-content-font">用户名</div>
            <div class="personal-content-input">
                <van-field v-model="PersonalAll.username" disabled/>
            </div>
        </div>
        <div class="personal-content-box1">
            <div class="personal-content-font">昵称</div>
            <div class="personal-content-input">
                <van-field
                    v-model="nickname"
                    :placeholder="PersonalAll.nickname"
            />
            </div>
        </div>
        <div class="personal-content-box1">
            <div class="personal-content-font">性别</div>
            <div class="personal-content-input">
                <van-field
                        v-model="gender"
                        :placeholder="PersonalAll.gender"
                        @click="showPicker = true"
                />
            <van-popup v-model="showPicker" position="bottom">
                <van-picker
                        show-toolbar
                        title="性别"
                        :columns="columns"
                        @cancel="showPicker = false"
                        @confirm="onConfirm"
                />
            </van-popup>
            </div>
        </div>
        <div class="personal-content-box1">
            <div class="personal-content-font">邮箱</div>
            <div class="personal-content-input">
                <van-field
                        v-model="mailbox"
                        placeholder="请输入邮箱"
                />
            </div>
        </div>
        <div class="personal-content-box1">
            <div class="personal-content-font">出生年月</div>
            <div class="personal-content-input"  @click="showPicker1 = true">
                {{PersonalAll.year}}&nbsp;年&nbsp;{{PersonalAll.month}}&nbsp;月&nbsp;{{PersonalAll.day}}&nbsp;日
            </div>
            <van-popup v-model="showPicker1" position="bottom">
                <van-datetime-picker
                        v-model="currentDate"
                        @cancel="showPicker1 = false"
                        type="date"
                        @confirm="onConfirm1"
                />
            </van-popup>
        </div>
        <div class="personal-content-button" @click="preservation">保存</div>
        <div class="personal-content-button1" @click="cancel">取消</div>
        </div>
    </div>
</template>
<script>
    import axois from "axios";
    import { Toast } from "vant";
    export default {
        name: "personal",
        components: {},
        props: {},
        data() {
            return {
                PersonalAll:{},
                //昵称
                nickname:"",
                //性别
                gender:"",
                //邮箱
                mailbox:"",
                showPicker:false,
                showPicker1:false,
                columns:["男","女","保密"],
                currentDate: new Date()
            }
        },
        methods: {
            personal () {
               this.$router.push({name:"my"})
            },
            //获取用户信息
            PersonalData(){
                axois
                    .post(`api/queryUser`,{})
                    .then(response => {
                        if (response) {
                            this.PersonalAll = response.userInfo;
                            console.log(this.PersonalAll);
                        }
                    })
                    .catch(e =>{
                        console.log(e);
                    })
            },
            //性别
            onConfirm(value) {
                this.gender = value;
                this.showPicker = false;
                console.log(value);
            },
            //时间
            onConfirm1 (value) {
                console.log(value);
                // let year = value.getFullYear();
                // let month = value.getMonth()+1;
                // let day = value.getDay();
                this.PersonalAll.year = value.getFullYear();
                this.PersonalAll.month = value.getMonth()+1;
                this.PersonalAll.day = value.getDate();
                this.showPicker1 = false;
            },
            //保存
            preservation () {
                let personalData = {
                    nickname:this.nickname,
                    gender:this.gender,
                    year:this.PersonalAll.year,
                    month:this.PersonalAll.month,
                    day:this.PersonalAll.day,
                    id:this.PersonalAll._id
                }
                axois
                    .post(`api/saveUser`,personalData)
                    .then(response =>{
                        if (response){
                            console.log(response);
                            Toast.success("修改成功");
                            this.$router.push({name:"my"})
                        }
                    })
                    .catch(e =>{
                        console.log(e);
                    })
            },
            //取消
            cancel () {
                this.$router.push({name:"my"})
            }
        },
        mounted() {
        this.PersonalData()
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
    .personal-header {
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
    .personal-header-img {
        position: absolute;
        left: 40px;
        top: 50%;
        transform: translateY(-20px);
    }
    //Github
    .personal-box {
        width: 100vw;
        height: 100px;
        line-height: 100px;
        border-bottom: lightblue solid 1px;
    }
    //登录提示
    .personal-Tips {
        width: 100vw;
        height: 200px;
        font-size: 30px;
        color: skyblue;
        line-height: 200px;
        text-align: center;
    }
    //字体大小
    .personal-content-font {
        width: 20vw;
        font-size: 30px;
        margin-left: 40px;
    }
    //头像div
    .personal-content-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: lightblue solid 1px;
    }
    //头像图片
    .personal-content-img {
        height: 120px;
        width: 120px;
        border-radius: 50%;
        margin-right: 40px;
    }
    .personal-content-box1 {
        height: 100px;
        display: flex;
        align-items: center;
        border-bottom: lightblue solid 1px;
    }
    //输入框
    .personal-content-input {
        margin-left: 60px;
    }
    //
    .personal-content-button {
        width: 80vw;
        height: 80px;
        background-color: #1aad19;
        color: white;
        margin: 20px auto;
        text-align: center;
        line-height: 80px;
        border-radius: 10px;
    }
    .personal-content-button1 {
        width: 80vw;
        height: 80px;
        background-color: white;
        color: black;
        margin: 20px auto;
        text-align: center;
        line-height: 80px;
        border-radius: 10px;
        border: lightblue solid 2px;
    }
</style>
