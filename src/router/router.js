import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        title: "首页",
        showBottom: true
      }
    },
    {
      path: "/classification",
      name: "classification",
      component: () => import("../views/Classification.vue"),
      meta: {
        title: "商品分类",
        showBottom: true
      }
    },
    {
      path: "/shopping",
      name: "shopping",
      component: () => import("../views/Shopping.vue"),
      meta: {
        title: "购物车",
        showBottom: true
      }
    },
    {
      path: "/my",
      name: "my",
      component: () => import("../views/My.vue"),
      meta: {
        title: "会员中心",
        showBottom: true
      }
    },
    {
      path: "/personal",
      name: "personal",
      component: () => import("../views/Personal.vue"),
      meta: {
        title: "个人信息",
        showBottom: false
      }
    },
    {
      path: "/detailsPage",
      name: "detailsPage",
      component: () => import("../views/DetailsPage.vue"),
      meta: {
        title: "商品详情",
        showBottom: false
      }
    },
    {
      path: "/settlement",
      name: "settlement",
      component: () => import("../views/Settlement.vue"),
      meta: {
        title: "订单结算",
        showBottom: false
      }
    },
    {
      path: "/addressList",
      name: "addressList",
      component: () => import("../views/AddressList.vue"),
      meta: {
        title: "地址列表",
        showBottom: false
      }
    },
    {
      path: "/editAddress",
      name: "editAddress",
      component: () => import("../views/EditAddress.vue"),
      meta: {
        title: "编辑地址",
        showBottom: false
      }
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue"),
      meta: {
        title: "登录/注册",
        showBottom: false
      }
    },
    {
      path: "/city",
      name: "city",
      component: () => import("../views/City.vue"),
      meta: {
        title: "城市",
        showBottom: false
      }
    },
    {
      path: "/comment",
      name: "comment",
      component: () => import("../views/Comment.vue"),
      meta: {
        title: "评价中心",
        showBottom: false
      }
    },
    {
      path: "/goComment",
      name: "goComment",
      component: () => import("../views/GoComment.vue"),
      meta: {
        title: "评价单品",
        showBottom: false
      }
    },
    {
      path: "/viewReviews",
      name: "viewReviews",
      component: () => import("../views/ViewReviews.vue"),
      meta: {
        title: "评价详情",
        showBottom: false
      }
    },
    {
      path: "/fullOrder",
      name: "fullOrder",
      component: () => import("../views/FullOrder.vue"),
      meta: {
        title: "全部订单",
        showBottom: false
      }
    },
    {
      path: "/myCollection",
      name: "myCollection",
      component: () => import("../views/MyCollection.vue"),
      meta: {
        title: "我的收藏",
        showBottom: false
      }
    },
    {
      path: "/browseHistory",
      name: "browseHistory",
      component: () => import("../views/BrowseHistory.vue"),
      meta: {
        title: "浏览历史",
        showBottom: false
      }
    },

    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/About.vue")
    }
  ]
});
router.beforeEach((to, from, next) => {
  next();
  if (to.meta.title) {
    document.title = to.meta.title;
  }
});
export default router;
