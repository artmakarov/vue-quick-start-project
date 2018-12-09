import VueLocalStorage from 'vue-ls';
import Vue from 'vue';

const vueLsOptions = {
  namespace: 'vuejs__',
};

Vue.use(VueLocalStorage, vueLsOptions);
