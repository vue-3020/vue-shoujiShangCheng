import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
      { //从定向
      path: '/',
      redirect: '/shoppingMall',
    },
    {
      path: '/shoppingMall',
      name: 'shoppingMall',
      component: resolve => require(["@/components/pages/ShoppingMall.vue"], resolve),
    }
  ]
})
