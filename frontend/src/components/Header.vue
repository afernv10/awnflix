<template>
  <div>
    <v-toolbar app clipped-left clipped-right color="transparent">
      <v-toolbar-side-icon
        v-if="isLoggedIn"
        @click="$store.commit('toggleDrawer')"
      ></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link :to="rutaLogo" tag="span" style="cursor: pointer">
          <span class="title ml-3 mr-5">
            AWn&nbsp;
            <span class="font-weight-light">Flix</span>
          </span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div id="nav">
        <template v-if="!isLoggedIn">
          <v-btn to="/login" large color="red">
            <span>Sign in</span>
            <!-- Iniciar sesion-->
          </v-btn>
          <v-btn to="/registro" large color="blue">
            <span>Sign up</span>
            <!-- Registro-->
          </v-btn>
        </template>

        <template v-else>
          <div class="text-xs-center">
            <v-layout justify-space-around>
              <!--<v-btn @click="expandir" :outline="outline" fab small color="yellow">
                <v-icon>search</v-icon>
              </v-btn>

              <v-flex shrink>
                <v-expand-x-transition>
                  <div v-show="expand" style="white-space: nowrap">
                    <v-text-field v-model="busqueda" placeholder="Search...">
                      <v-icon>star_border</v-icon>
                    </v-text-field>
                  </div>
                </v-expand-x-transition>
              </v-flex>-->

              <v-btn
                :outline="!timeDrawer"
                fab
                small
                color="blue"
                @click="$store.commit('toggleTimeDrawer')"
              >
                <v-icon>query_builder</v-icon>
              </v-btn>

              <div class="text-xs-center">
                <v-menu
                  v-model="menuCalendario"
                  :close-on-content-click="false"
                  :nudge-width="100"
                  offset-y
                >
                  <template v-slot:activator="{ on }">
                    <v-btn
                      color="green"
                      v-on="on"
                      fab
                      small
                      :outline="!menuCalendario"
                    >
                      <v-icon>calendar_today</v-icon>
                    </v-btn>
                  </template>

                  <v-card>
                    <div>
                      <calendario></calendario>
                    </div>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-btn
                        flat
                        block
                        color="blue"
                        @click="menuCalendario = false"
                        >Cerrar</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-menu>
              </div>

              <div class="text-xs-center">
                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-width="200"
                  offset-y
                >
                  <template v-slot:activator="{ on }">
                    <v-btn color="purple" v-on="on" fab small :outline="!menu">
                      <v-icon>more_vert</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-list>
                      <v-list-tile avatar>
                        <v-list-tile-avatar>
                          <img
                            src="https://i.pinimg.com/originals/ec/19/fd/ec19fdb95176223d9ae657c6eec9b2d1.jpg"
                            alt="Elmo"
                          />
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                          <v-list-tile-title class="capitalize"
                            >Hola {{ username }}!</v-list-tile-title
                          >
                          <v-list-tile-sub-title
                            >El mas epecial de todos</v-list-tile-sub-title
                          >
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list>

                    <v-divider></v-divider>

                    <v-list>
                      <v-list-tile
                        v-for="(item, i) in items"
                        :key="i"
                        router
                        :to="item.route"
                        @click="controlTile(i)"
                      >
                        <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                      </v-list-tile>
                    </v-list>

                    <v-card-actions>
                      <v-btn flat block color="blue" @click="menu = false"
                        >Cerrar</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-menu>
              </div>
            </v-layout>
          </div>
        </template>
      </div>
    </v-toolbar>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Calendario from "./CalendarTime.vue";

export default {
  name: "header-app",
  props: ["username"],

  components: {
    Calendario
  },
  data() {
    return {
      rutaLogo: "/",
      busqueda: "",
      outline: true,
      expand: false,
      menu: false,
      menuCalendario: false,
      menuTieLine: false,
      message: false,
      items: [
        { name: "Mi perfil", route: "/profile" },
        { name: "Cerrar sesión", route: "/" }
      ]
    };
  },

  methods: {
    expandir() {
      this.expand = !this.expand;
      if (this.expand == false) {
        this.outline = true;
      } else {
        this.outline = false;
      }
    },
    controlTile(i) {
      console.log("hola " + i);
      if (i == 1) {
        this.$store.commit("logout");
      }
    }
  },
  computed: {
    ...mapState(["isLoggedIn"]),
    ...mapState(["timeDrawer"])
  },
  watch: {
    isLoggedIn(val) {
      if (val) {
        this.rutaLogo = "/profile";
      } else {
        this.rutaLogo = "/";
      }
    }
  }
};
</script>
