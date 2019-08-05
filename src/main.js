import Vue from 'vue';
import ElementUI from 'element-ui';
import lang from 'element-ui/lib/umd/locale/en';
import locale from 'element-ui/lib/locale';
import VueDataTables from 'vue-data-tables';
import axios from 'axios';

import App from './App.vue';
import router from './router';
import store from './store';


import 'element-ui/lib/theme-chalk/index.css';
import '../node_modules/bulma/css/bulma.css';


Vue.prototype.$ELEMENT = { size: 'small' };
locale.use(lang);
Vue.use(ElementUI);
Vue.use(VueDataTables);
Vue.use(Vue.prototype.$http = axios.create({ baseURL: 'https://api.paystack.co/' }));

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
