<template>
  <v-navigation-drawer :value="timeDrawer" right clipped app>
    <v-container>
      <v-timeline dense clipped full-width>
        <v-timeline-item fill-dot class="white--text mb-5" color="orange" large>
          <v-btn
            :color="interval == null ? 'blue' : 'green'"
            @click="interval == null ? start() : stop()"
            :disabled="disabled"
            >{{ label }}</v-btn
          >
          <template v-slot:icon>
            <v-btn icon class="mx-0" @click="comment">Add</v-btn>
          </template>
          <v-text-field
            v-model="input"
            hide-details
            flat
            label="Deja tus notas..."
            solo
            @keydown.enter="comment"
          ></v-text-field>
        </v-timeline-item>
        <v-timeline-item class="mb-4" hide-dot>
          <span>
            Buenos días! Los eventos se mostrarán debajo de tus anotaciones. Los
            eventos guardados en morado ;)
          </span>
        </v-timeline-item>
        <v-slide-x-transition group>
          <v-timeline-item
            v-for="(event, i) in timeline"
            :key="i"
            class="mb-3"
            color="green"
            small
          >
            <v-layout justify-space-between>
              <v-flex xs7 v-text="event.text"></v-flex>
              <v-flex xs5 text-xs-right v-text="event.time"></v-flex>
            </v-layout>
          </v-timeline-item>
        </v-slide-x-transition>
        <v-slide-x-reverse-transition group hide-on-leave>
          <v-timeline-item
            v-for="(item, i) in items"
            :key="i"
            :color="item.color"
            small
            fill-dot
          >
            <v-alert :value="true" :color="item.color">
              {{ item.description }}
              <v-spacer></v-spacer>
              {{ item.estreno }}
            </v-alert>
          </v-timeline-item>
        </v-slide-x-reverse-transition>
      </v-timeline>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
//import axios from "axios";
const axios = require("../utils/axiosConfig.js");
export default {
  name: "TimeNav",
  props: ["username"],
  data: () => ({
    label: "Mostrar eventos",
    items: [
      {
        id: 1,
        color: "green",
        estreno: "",
        description: "Pulsa el botón para mostrar los eventos :D"
      }
    ],
    interval: null,
    events: [],
    eventsBBDD: [],
    input: null,
    nonce: 0,
    color: "blue",
    disabled: false,
    descripciones: [
      {
        desc: "Aladdín",
        estreno: "24 de Mayo"
      },
      {
        desc: "Rocketman",
        estreno: "31 de Mayo"
      },
      {
        desc: "Godzilla II: Rey de los Monstruos",
        estreno: "31 de Mayo"
      },
      {
        desc: "X-Men: Fénix oscura",
        estreno: "7 de Junio"
      },
      {
        desc: "Men in Black: International",
        estreno: "14 de Junio"
      },
      {
        desc: "Toy Story 4",
        estreno: "21 de Junio"
      }
    ]
  }),
  computed: {
    ...mapState(["timeDrawer"]),
    timeline() {
      return this.events.slice().reverse();
    }
  },
  methods: {
    addEvent() {
      this.items.unshift({
        id: this.nonce++,
        color: this.color,
        estreno: this.descripciones[this.nonce].estreno,
        description: this.descripciones[this.nonce].desc
      });

      if (this.nonce >= this.descripciones.length - 1) {
        for (let i = 0; i < this.eventsBBDD.length; i++) {
          this.items.unshift({
            id: this.nonce++,
            color: "purple",
            estreno: "",
            description: this.eventsBBDD[i].description
          });
        }

        this.stop();
      }
    },

    comment() {
      const time = new Date().toDateString();
      const desc = this.input;
      var self = this;
      this.events.push({
        id: this.nonce++,
        text: this.input,
        time: time
      });
      this.input = null;

      axios
        .post("/postEvento", {
          description: desc,
          username: self.username
        })
        .then(function(response) {
          if (response.data.success) {
            console.log("Evento añadido");
          } else {
            console.log("Evento NO añadido");
          }
        })
        .catch(function(error) {
          console.log("error reg " + error);
        });
    },
    start() {
      var self = this;
      axios
        .get("/getEventos", {
          params: {
            username: self.username
          }
        })
        .then(function(response) {
          console.log("Response:", response);

          if (response.data.existe) {
            console.log("existen eventos", response);
            self.eventsBBDD = response.data.eventos;
          }
        })
        .catch(function(error) {
          console.log("error find existencia: " + error);
        });
      this.label = "Mostrando...";
      this.interval = setInterval(this.addEvent, 1500);
    },

    stop() {
      this.disabled = true;
      this.label = "Mostrar eventos";
      clearInterval(this.interval);
      this.interval = null;
    }
  },

  beforeDestroy() {
    this.stop();
  }
};
</script>
