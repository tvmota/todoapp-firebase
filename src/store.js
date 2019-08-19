import Vue from 'vue';
import Vuex from 'vuex';

import db from './persistence/firebasePersistence';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    stsLoader: false,
    toDoList: [],
  },
  mutations: {
    SET_STS_LOADER(state, payload) {
      state.stsLoader = payload;
    },
    SET_TODO_LIST(state, payload) {
      state.toDoList = payload;
    },
  },
  getters: {
    getStsLoader: state => state.stsLoader,
    getToDoList: state => state.toDoList,
  },
  actions: {
    updateTodoList({ commit, state }) {
      commit('SET_STS_LOADER', true);

      db.getAllItens(state.userId).then((resp) => {
        commit('SET_STS_LOADER', false);
        commit('SET_TODO_LIST', resp);
      }).catch((err) => {
        console.log(err);
        commit('SET_STS_LOADER', false);
      });
    },
    updateStsLoader({ commit }, sts) {
      commit('SET_STS_LOADER', sts);
    },
  },
});
