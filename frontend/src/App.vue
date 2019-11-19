<template>
  <div id="app">
    <v-app dark>
      <Header :username="username"></Header>
      <NavigationDrawer
        v-show="isLoggedIn"
        :username="username"
      ></NavigationDrawer>
      <time-line-drawer
        v-show="isLoggedIn"
        :username="username"
      ></time-line-drawer>
      <v-content>
        <!-- Se captura y tambien se emite para el componente renderizado que lo encesite -->
        <router-view
          @sendUsername="username = $event"
          :username="username"
        ></router-view>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Header from "./components/Header.vue";
import NavigationDrawer from "./components/NavigationDrawer.vue";
import TimeLineDrawer from "./components/TimeLine.vue";
export default {
  name: "App",
  data() {
    return {
      username: "NONE"
    };
  },
  components: {
    Header,
    NavigationDrawer,
    TimeLineDrawer
  },
  computed: {
    ...mapState(["isLoggedIn"])
  }
};
</script>

<style>
img {
  max-width: 80px;
}
</style>
