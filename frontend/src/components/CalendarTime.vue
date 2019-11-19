<template>
  <v-layout column align-items-center>
    <v-flex xs12 sm6 class="my-3">
      <v-toolbar card color="green" dark>
        <v-toolbar-side-icon>
          <v-icon>event</v-icon>
        </v-toolbar-side-icon>
        <v-toolbar-title class="subheading">
          Calendar &middot; No te pierdas ninguna fecha! Revísalas todas aqui
          abajo.
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-side-icon>
          <v-icon @click="showDialog = !showDialog">add</v-icon>
        </v-toolbar-side-icon>
      </v-toolbar>
      <v-flex>
        <v-date-picker
          color="green"
          landscape
          full-width
          reactive
          v-model="selectedDate"
          ref="picker"
        />
        <v-list dense>
          <template v-for="(note, i) in notes">
            <li v-if="note.fecha == selectedDate" :key="i" row align-center>
              {{ note.evento }}
            </li>
          </template>
        </v-list>
      </v-flex>

      <v-layout justify-center>
        <v-dialog v-model="showDialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Nuevo evento</span>
            </v-card-title>
            <v-container>
              <v-text-field
                label="Nombre del evento"
                v-model="nombreEvento"
                prepend-icon="sentiment_very_satisfied"
              ></v-text-field>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="showDialog = false"
                >Close</v-btn
              >
              <v-btn color="blue darken-1" flat @click="cogerEvento"
                >Save</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    nombreEvento: null,
    showDialog: false,
    active: false,
    selectedDate: null,
    notes: []
  }),
  methods: {
    cogerEvento() {
      this.showDialog = false;

      var json = {
        fecha: this.selectedDate,
        evento: this.nombreEvento
      };
      this.notes.push(json);

      /*for (let index = 0; index < this.notes.length; index++) {
        const element = this.notes[index];
        console.log(element.dia+" "+element.evento)
      }*/
    }
  },

  computed: {
    today() {
      const date = new Date(this.selectedDate);
      const offset = date.getTimezoneOffset();
      return new Date(date.getTime() + offset * 60000);
    }
  },
  mounted() {
    const now = new Date();
    this.selectedDate = now.toISOString().slice(0, 10);
  }
};
</script>
