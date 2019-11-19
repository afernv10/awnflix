import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    drawer: false,
    timeDrawer: false
  },
  mutations: {
    logear(state) {
      state.isLoggedIn = true;
      state.drawer = true;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.drawer = false;
      state.timeDrawer = false;
    },
    toggleDrawer(state) {
      state.drawer = !state.drawer;
    },
    toggleTimeDrawer(state) {
      state.timeDrawer = !state.timeDrawer;
    }
  }
});
