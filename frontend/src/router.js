import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: function() {
        return import("./components/Login.vue");
      }
    },
    {
      path: "/registro",
      name: "registro",
      component: function() {
        return import("./components/Registro.vue");
      }
    },
    {
      path: "/profile",
      name: "profile",
      component: function() {
        return import("./views/HomeUsuario.vue");
      }
    },
    {
      // Padre
      path: "/listas/:nombre",
      name: "listas",
      component: function() {
        return import("./views/Listas.vue");
      }
    },
    {
      path: "/biblioteca/:tipo",
      name: "biblioteca",
      component: function() {
        return import("./views/Tarjetas.vue");
      }
    }
  ]
});
