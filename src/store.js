import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    balance: 0,
  },
  getters: {
    getBalance(state) {
      return state.balance;
    },
  },
  mutations: {
    setBalance(state, newBalance) {
      state.balance = newBalance;
    }, 
  },
});

export default store;
