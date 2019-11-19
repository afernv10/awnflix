<template>
  <v-navigation-drawer :value="drawer" fixed clipped app>
    <v-img
      :aspect-ratio="19 / 13"
      src="http://raiingkaeng.com/images/elmo-wallpaper/36014655-elmo-wallpaper.jpg"
    >
      <v-layout pa-2 column fill-height class="lightbox white--text">
        <v-spacer></v-spacer>
        <v-flex shrink>
          <div class="subheading">{{ username }}</div>
          <div class="body-1">El spoileador</div>
        </v-flex>
      </v-layout>
    </v-img>
    <v-list dense>
      <template v-for="(item, i) in items">
        <v-layout v-if="item.heading" :key="i" row align-center>
          <v-flex xs6>
            <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
          </v-flex>
        </v-layout>
        <v-divider
          v-else-if="item.divider"
          :key="i"
          dark
          class="my-3"
        ></v-divider>
        <!-- eslint-disable-->
        <v-list-tile v-else :key="i" router :to="item.route" @click="myRepo(i)">
          <!-- eslint-enable -->
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="grey--text">{{
              item.text
            }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
    <div>
      <v-layout row justify-center>
        <v-dialog v-model="showDialog" max-width="400">
          <v-card>
            <v-card-title class="headline"
              >Guía para el uso de AWnFlix</v-card-title
            >

            <v-card-text class="px2"
              >En el Navigation Drawer se pueden seleccionar Pelis o Series,
              añadiéndolas a favoritas, viendo o terminadas. No podrás añadir
              contenido a una lista de Viendo/Terminada si se encuentra en
              Terminada/Viendo, respectivamente. Las favoritas se suponen con 5
              estrellas y en Historial podrás ver lo que estás viendo o has
              terminado, pudiendo valorarlas.</v-card-text
            >
            <v-card-text class="px2"
              >Estas Pelis y Series se obtienen directamente de una API según la
              búsqueda realizada; las mostradas por defecto son las más vistas
              del momento según nuestra consideración.</v-card-text
            >
            <v-card-text class="px2"
              >En el Header, de izquierda a derecha: Timeline, para añadir tus
              notas, las cuales verás en la siguiente sesión, por defecto además
              se muestran eventos de estrenos de películas; Calendario, donde se
              puede añadir un evento el día, mes y año que quieras (no se
              refleja en BBDD); y por último, para ver 'Mi Perfil' o 'Cerrar
              sesión'.</v-card-text
            >

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                color="blue darken-1"
                flat="flat"
                @click="showDialog = false"
                >Que comience el juego :D</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "NavigationDrawer",
  props: ["username"],

  computed: {
    ...mapState(["drawer"])
  },
  data() {
    return {
      showDialog: false,
      items: [
        { heading: "Biblioteca" },
        { icon: "video_library", text: "Series", route: "/biblioteca/series" },
        { icon: "movie", text: "Películas", route: "/biblioteca/movie" },
        { divider: true },
        { heading: "Mis listas" },
        { icon: "favorite", text: "Favoritas", route: "/listas/favoritas" },
        { icon: "remove_red_eye", text: "Viendo", route: "/listas/viendo" },
        { icon: "done", text: "Terminadas", route: "/listas/terminadas" },
        { icon: "history", text: "Historial", route: "/listas/history" },
        { divider: true },
        { icon: "help", text: "Help", route: "" },
        { icon: "code", text: "GitHub repository", route: "" }
      ]
    };
  },
  methods: {
    myRepo(i) {
      if (i == 10) {
        this.showDialog = !this.showDialog;
      } else if (i == 11) {
        window.open(
          "https://github.com/ULE-Informatica/09-appweb-g2-12",
          "_blank"
        );
      }
    }
  }
};
</script>
