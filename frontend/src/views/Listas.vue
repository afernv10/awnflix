<template>
  <div class="diveo">
    <v-card>
      <v-card-title class="ml-7 mt-5 font-weight-light grey--text capitalize">
        {{ $route.params.nombre }}
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="sources"
        :search="search"
        select-all
        v-model="selected"
        item-key="titulo"
      >
        <template v-slot:items="props">
          <td>
            <v-checkbox
              v-model="props.selected"
              color="red"
              hide-details
            ></v-checkbox>
          </td>
          <td>{{ props.item.titulo }}</td>
          <td>{{ props.item.tipo }}</td>
          <td>{{ props.item.year }}</td>
          <td>
            <v-rating
              @click.native="changeRating(props.item)"
              v-model="props.item.rating"
              background-color="yellow"
              color="yellow"
              dense
              half-increments
              hover
              size="20"
              v-if="props.item.rating != null"
            ></v-rating>
            <i v-else class="font-weight-light grey--text">No terminada</i>
          </td>
        </template>
        <template v-slot:no-results>
          <v-alert :value="true" color="error" icon="warning"
            >Your search for "{{ search }}" found no results.</v-alert
          >
        </template>
      </v-data-table>
      <v-btn flat color="red" @click="eliminarRegistros" :disabled="puedoBorrar"
        >Eliminar [{{ selected.length }}]</v-btn
      >
    </v-card>
  </div>
</template>

<script>
const axios = require("../utils/axiosConfig.js");

export default {
  props: ["username"],
  data() {
    return {
      search: "",
      selected: [],
      headers: [
        {
          text: "Titulo",
          align: "left",
          value: "titulo"
        },
        { text: "Tipo", value: "tipo" },
        { text: "Año", value: "year" },
        { text: "Rating", value: "rating" }
      ],
      sources: [],
      cambiado: false
    };
  },
  methods: {
    eliminarRegistros() {
      /*
       * Elimina las filas de la tabla seleccionadas y despues del bucle se procede a quitarlos de la base de datos
       */
      for (var i = 0; i < this.selected.length; i++) {
        const index = this.sources.indexOf(this.selected[i]);
        this.sources.splice(index, 1);
      }
      var self = this;

      axios
        .delete("/delete", {
          params: {
            data: self.selected,
            tipoLista: self.$route.params.nombre
          }
        })
        .then(function(response) {
          if (response.data.success) {
            console.log("Deleted!");
          } else {
            console.log("Not deleted!!");
          }
        })
        .catch(function(error) {
          console.log("Error deleting... " + error);
        });
    },
    updateListas(optional, history) {
      var self = this;
      var tipo = "";

      // si accedemos a historial
      tipo = optional;

      axios
        .get("/listas", {
          params: {
            username: self.username,
            tipoLista: tipo
          }
        })
        .then(function(response) {
          if (history == true) {
            var arr = response.data.media;
            var arrAll = self.sources.concat(arr);
            self.sources = arrAll;
          } else {
            self.sources = response.data.media;
          }
        })
        .catch(function(error) {
          console.log("Error en listas.", error);
        });
    },
    async showHistory() {
      await this.updateListas("viendo"); // Tenemos que esperar a que se haga la petición a tabla de viendo para seguir
      await this.updateListas("terminadas", true);
    },
    changeRating(item) {
      axios
        .post("/updateRating", {
          username: this.username,
          titulo: item.titulo,
          newRating: item.rating
        })
        .then(function(response) {
          console.log("Rating actualizado.", response);
        })
        .catch(function(error) {
          console.log("Error en rating.", error);
        });
    }
  },
  computed: {
    puedoBorrar() {
      if (this.selected.length == 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  created() {
    if (this.$route.params.nombre == "history") {
      this.showHistory();
    } else {
      this.updateListas(this.$route.params.nombre);
    }
  },
  watch: {
    $route(to, from) {
      console.log("watch from:" + from.path);
      console.log("watch to:" + to.path);
      if (to.path == "/listas/history") {
        this.showHistory();
      } else {
        this.updateListas(this.$route.params.nombre);
      }
    }
  }
};
</script>

<style>
.diveo {
  height: 100%;
}

.media.series {
  border-left: 4px solid greenyellow;
}

.media.movies {
  border-left: 4px solid purple;
}

.v-chip.movies {
  background: rgb(122, 13, 122);
}
.v-chip.series {
  background: rgb(86, 128, 25);
}

.capitalize {
  text-transform: capitalize;
}
</style>
