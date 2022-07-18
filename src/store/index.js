import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default new Vuex.Store({
  state: {
    iuser: 0,
  },
  mutations: {
    setState: (state, iuser) => {
      state.iuser = iuser;
    },
  },
  plugins: [createPersistedState()],
});

/*import { createStore } from 'vuex'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
*/
