/* eslint-disable no-param-reassign,no-shadow,no-underscore-dangle,no-undef */
import {
  getters as g,
  actions as a,
  mutations as m,
} from './users-const';
import Api from '../../../api/Api';


const state = {
  all: [],
};


const getters = {
  [g.getUser]: state => id => state.all.find(user => user.id === id),
};


const actions = {
  async [a.fetchUserById]({ commit }, id) {
    commit(m.addUser, { id, loading: null });

    const { isSuccess, data: user } = await Api.get(`/user/${id}`);

    if (isSuccess && user) {
      commit(m.addUser, user);
    }
  },

  async [a.fetchUsers]({ commit }) {
    const { isSuccess, data: users } = await Api.get('/users');

    if (isSuccess) {
      commit(m.addUsers, users);
    }
  },
};


const mutations = {
  [m.addUsers](state, users) {
    state.all = [...state.all, ...users];
  },

  [m.addUser](state, user) {
    const index = state.all.findIndex(item => item.id === user.id);

    if (index > -1) {
      state.all.splice(index, 1, user);
    } else {
      state.all.push(user);
    }
  },
};


export default {
  getters,
  state,
  actions,
  mutations,
  namespaced: true,
};
