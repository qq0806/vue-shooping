<template>
  <div>
    <div class="login-box">
      <div class="login-body">
        <div class="login-span">
          <span>登录 / 注册</span>
        </div>
        <div class="login-input">
          <div>
            <input
              type="text"
              placeholder="USERNAME"
              v-model="username"
              class="login-name"
            />
            <hr style="color: #f2f2f2" />
          </div>
          <div>
            <input
              type="password"
              placeholder="PASSWORD"
              v-model="password"
              class="login-password"
            />
            <hr style="color: #f2f2f2" />
          </div>
        </div>
        <div class="city-phone">
          电话号码
          <input
            type="text"
            placeholder="仅注册需要"
            class="city-phone-input"
          />
        </div>
        <hr style="color: #f2f2f2" />
        <div class="city-sms">
          短信验证码
          <input type="text" placeholder="仅注册需要" class="city-sms-input" />
          <button class="city-button">发送验证码</button>
        </div>
        <hr style="color: #f2f2f2" />
        <div class="login-verification">
          验证码
          <input
            type="text"
            placeholder="请输入验证码"
            class="login-v-input"
            v-model="repass"
          />
          <hr class="hr1" />
          <span
            v-html="Verification"
            class="login-verification-span"
            @click="gtac"
          ></span>
        </div>
        <div class="login-register">
          <button class="city-button1" @click="login">登录</button>
          <button class="city-button2" @click="register">注册</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "login",
  components: {},
  props: {},
  data() {
    return {
      Verification: "",
      username: "",
      password: "",
      repass: "",
      single: ""
    };
  },
  methods: {
    //请求验证码
    getAverify() {
      this.$axios
        .req("api/verify")
        .then(response => {
          if (response) {
            this.Verification = response;
            // console.log(response);
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    //点击刷新验证码
    gtac() {
      this.getAverify();
    },
    login() {
      this.$axios
        .req("api/login", {
          nickname: this.username,
          password: this.password,
          verify: this.repass
        })
        .then(response => {
          if (response.code === -1) {
            Toast.fail("用户名或密码错误");
            // Toast("用户名或密码错误");
          } else if (response.code === -2) {
            Toast.fail("验证码错误");
            this.repass = "";
            this.getAverify();
          } else if (response.code === 200) {
            Toast.success("登录成功");
            localStorage.setItem("user", JSON.stringify(response.userInfo));
            this.$store.state.user = response.userInfo;
            // this.$router.push("/");
            this.$router.back(); //直接返回上次跳转的页面
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    register() {
      this.$axios
        .req("api/register", {
          nickname: this.username,
          password: this.password,
          verify: this.repass
        })
        .then(response => {
          if (response.code === -1) {
            Toast.fail("请输入完整信息或用户名已存在");
          } else if (response.code === -2) {
            Toast.fail("验证码错误");
            this.repass = "";
            this.getAverify();
          } else if (response.code === 200) {
            Toast.success("注册成功");
            localStorage.setItem("user", JSON.stringify(response.userInfo));
            this.$store.state.user = response.userInfo;
            this.$router.push({ name: "home" });
          }
          console.log(response.userInfo);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.getAverify();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.login-box {
  height: 100vh;
  width: 100vw;
  background-image: url("../imsge/login.jpeg");
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-body {
  width: 90vw;
  height: 80vh;
  background: rgba(0, 0, 0, 0);
}
.login-span {
  position: relative;
  margin: 40px;
  font-size: 40px;
  color: skyblue;
}
.login-name,
.login-password {
  width: 90vw;
  height: 100px;
  font-size: 40px;
  border: 0;
  color: #000;
  background: rgba(0, 0, 0, 0);
  margin-top: 30px;
  margin-bottom: 10px;
}
.van-cell {
  height: 100px;
  margin: 40px 0;
  font-size: 30px;
  color: black;
  background: rgba(0, 0, 0, 0);
}
.van-field__label {
  width: 120px;
}
.login-verification {
  margin-top: 60px;
  font-size: 40px;
  position: relative;
  position: relative;
}
.login-v-input {
  width: 35vw;
  border: 0;
  background: rgba(0, 0, 0, 0);
}
.hr1 {
  width: 35vw;
  color: #f2f2f2;
  position: absolute;
  margin-left: 130px;
}
.login-register {
  margin: 100px 0;
}
.city-phone {
  margin-top: 40px;
  margin-bottom: 20px;
  font-size: 30px;
}
.city-phone-input,
.city-sms-input {
  background: rgba(0, 0, 0, 0);
  border: 0;
}
.city-sms {
  margin-top: 40px;
  margin-bottom: 20px;
  font-size: 30px;
}
.city-button {
  width: 150px;
  height: 60px;
  font-size: 20px;
  background-color: green;
  border: 0;
  color: white;
}
.login-verification-span {
  position: absolute;
  bottom: -10px;
  right: 0px;
}
.city-button1 {
  width: 180px;
  height: 80px;
  font-size: 30px;
  text-align: center;
  line-height: 80px;
  border: 0px;
  border-radius: 10px;
  background-color: green;
  color: white;
  margin-top: 40px;
  /*margin-left: 20px;*/
}
.city-button2 {
  width: 180px;
  height: 80px;
  font-size: 30px;
  text-align: center;
  line-height: 80px;
  border: 0px;
  border-radius: 10px;
  background-color: brown;
  color: white;
  margin-top: 40px;
  margin-left: 20px;
}
</style>
