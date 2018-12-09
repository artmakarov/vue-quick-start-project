import Vue from 'vue';
import Vuex from 'vuex';
import createSignalRPlugin from './plugins/signalrPlugin';
// import users from './modules/users/users';


Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';


const store = new Vuex.Store({
  modules: {
    // users,
  },
  strict: debug,
  plugins: [createSignalRPlugin()],
});

export default store;
