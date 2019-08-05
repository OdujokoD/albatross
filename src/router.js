import Vue from 'vue';
import Router from 'vue-router';
import Supplier from './views/Supplier.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'supplier',
      component: Supplier,
    },
    {
      path: '/transaction',
      name: 'transaction',
      component: () => import(/* webpackChunkName: "about" */ './views/Transaction.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import(/* webpackChunkName: "about" */ './views/Profile.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
    },
  ],
});
