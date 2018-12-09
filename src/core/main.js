// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
// import 'roboto-fontface/css/roboto/roboto-fontface.css';
import App from '../components/App';

import router from './router';
// import store from './store';

import './plugins/vuetify';
import './plugins/axios';
import './plugins/noty';
import './plugins/vueCookie';
// import './plugins/vueLocalStorage';

import '../assets/stylus/common.styl';


Vue.config.productionTip = false;

window.vm = new Vue({
  el: '#app',
  router,
  // store,
  components: { App },
  template: '<App/>',
});
