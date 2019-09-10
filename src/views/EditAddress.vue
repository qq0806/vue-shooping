<template>
  <div>
    <div class="editAddress-header">
      <div class="editAddress-header-img" @click="return5">
        <van-icon name="arrow-left" size="20px" />
      </div>
      <div>编辑地址</div>
    </div>
    <div
      class="editAddress-box editAddress-font-van"
      v-if="this.$route.query.areaList1"
    >
      <van-address-edit
        :area-list="areaList"
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        @save="onSave1"
        @delete="onDelete"
        :address-info="areaList1"
      />
    </div>
    <div class="editAddress-box editAddress-font-van" v-else>
      <van-address-edit
        :area-list="areaList"
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        @save="onSave"
        @delete="onDelete"
      />
    </div>
  </div>
</template>

<script>
import area from "../js/area";
import axios from "axios";
import { Toast } from "vant";
export default {
  name: "editAddress",
  components: {},
  props: {},
  data() {
    return {
      areaList: {},
      searchResult: [],
      defaultAddress: {},
      areaList1:{}
    };
  },
  methods: {
      //返回地址列表
    return5() {
      this.$router.push({ name: "addressList" });
    },
    //添加地址
    onSave(name) {
      console.log(name);
      let str = name.province + name.city + name.county + name.addressDetail;
      axios
        .post(`api/address`, {
          name: name.name,
          tel: name.tel,
          isDefault: name.isDefault,
          province: name.province,
          city: name.city,
          county: name.county,
          addressDetail: name.addressDetail,
          areaCode: name.areaCode,
          address: str
        })
        .then(response => {
          if (response.code === 200) {
            Toast.success("添加地址成功");
            this.$router.push({ name: "addressList" });
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    //删除地址
    onDelete() {
      this.$axios
        .req("api/deleteAddress", { id: this.areaList1._id })
        .then(response => {
              if (response) {
            Toast.fail("删除地址成功");
            this.$router.push({ name: "addressList" });
            console.log(response);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //编辑地址
    onSave1(name) {
      axios
        .post("api/address", {
          name: name.name,
          tel: name.tel,
          isDefault: name.isDefault,
          province: name.province,
          city: name.city,
          county: name.county,
          addressDetail: name.addressDetail,
          areaCode: name.areaCode,
          address: name.address,
          id: name._id
        })
        .then(response => {
          if (response.code === 200) {
            Toast.success("修改地址成功");
            this.$router.push({ name: "addressList" });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.areaList = area;
    if (this.$route.query.areaList1) {
      this.areaList1 = this.$route.query.areaList1;
    }
    console.log(this.areaList1);
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
//头部
.editAddress-header {
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
.editAddress-header-img {
  position: absolute;
  left: 40px;
  top: 50%;
  transform: translateY(-20px);
}
//编辑地址框
.editAddress-box {
  width: 90vw;
  margin: 40px auto;
}
</style>
