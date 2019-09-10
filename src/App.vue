<template>
  <div id="app">
    <keep-alive include="classification"><router-view /></keep-alive>
    <Bottom :num.sync="num" v-if="this.$route.meta.showBottom"></Bottom>
  </div>
</template>

<script>
import Bottom from "./components/Bottom/Bottom";
export default {
  name: "App",
  components: {
    Bottom
  },
  props: {},
  data() {
    return {
      num: 0
    };
  },
  methods: {},
  mounted() {
    if (!localStorage.getItem("browseData")) {
      let arr = [];
      localStorage.setItem("browseData",JSON.stringify(arr))
    }
     if (!localStorage.getItem("SearchHistory")) {
       let arr1 = []
       localStorage.setItem("SearchHistory",JSON.stringify(arr1))
     }
  },
  created() {},
  filters: {},
  computed: {},
  watch: {
    $route(to) {
      if (to.path === "/") {
        this.num = 0;
      } else if (to.path === "/classification") {
        this.num = 1;
      } else if (to.path === "/shopping") {
        this.num = 2;
      } else if (to.path === "/my") {
        this.num = 3;
      }
    }
  },
  directives: {}
};
</script>
<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
@import "style/common";
.search-text{
  color: red;
}

</style>
