<template>
  <div>
    <v-card>
      <v-container>
        <h1 class="px-2 mt-2 font-weight-light grey--text capitalize">
          {{ $route.params.tipo }}
        </h1>
        <v-text-field
          class="px-1"
          prepend-inner-icon="search"
          :placeholder="'Search your ' + [[$route.params.tipo]]"
          v-model="search"
          @keyup.enter="searchFromOMDB"
        ></v-text-field>
        <h2 class="px-2 font-italic font-weight-light grey--text">
          Top {{ $route.params.tipo }} del momento
        </h2>
        <v-container grid-list-xl>
          <v-layout wrap>
            <v-flex xs4 v-for="(card, i) in cards" :key="i">
              <v-card>
                <v-img
                  v-if="card.Poster == 'N/A'"
                  :src="require('../assets/what.gif')"
                  aspect-ratio="1"
                ></v-img>
                <v-img v-else :src="card.Poster" aspect-ratio="1"></v-img>
                <v-card-title>
                  <div>
                    <h3>{{ card.Title }}</h3>
                    <div class="font-weight-light grey--text">
                      Year: {{ card.Year }}
                    </div>
                    <div class="font-weight-light grey--text">
                      IMDB-id: {{ card.imdbID }}
                    </div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn
                    fab
                    flat
                    small
                    color="red"
                    @click="addToLista(card, 'favoritas')"
                  >
                    <v-icon>favorite</v-icon>
                  </v-btn>
                  <v-btn
                    fab
                    flat
                    small
                    color="black"
                    @click="addToLista(card, 'viendo')"
                  >
                    <v-icon>remove_red_eye</v-icon>
                  </v-btn>
                  <v-btn
                    fab
                    flat
                    small
                    color="blue"
                    @click="addToLista(card, 'terminadas')"
                  >
                    <v-icon>done</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-container>

      <v-snackbar color="success" v-model="mostrarSnack" :timeout="timeout" top
        >{{ texto1 }} {{ nombreLista }}</v-snackbar
      >

      <v-snackbar color="error" v-model="mostrarSnack2" :timeout="timeout" top
        >{{ texto2 }} {{ nombreLista }}</v-snackbar
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
      texto1: "Añadida a la lista de",
      texto2: "No se puede añadir a",
      nombreLista: "",
      search: "",
      responseSearch: "",
      mostrarSnack: false,
      mostrarSnack2: false,
      timeout: 1500,
      tipo: "",
      imdbLink: "https://www.imdb.com/",
      cards: [],
      addPosible: true,
      listaCheck: ""
    };
  },
  methods: {
    loadSeries() {
      this.cards = [
        {
          Title: "Game of Thrones",
          Year: "2011–",
          imdbID: "tt0944947",
          Type: "series",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BMjA5NzA5NjMwNl5BMl5BanBnXkFtZTgwNjg2OTk2NzM@._V1_SX300.jpg"
        },
        {
          Title: "Money Heist",
          Year: "2017–",
          imdbID: "tt6468322",
          Type: "series",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BMzBlY2QzNzYtMWU1NS00NjFkLWJiMzItYmM3YTc4MDFjNDQwXkEyXkFqcGdeQXVyMTA0MjU0Ng@@._V1_SX300.jpg"
        },
        {
          Title: "Black Mirror",
          Year: "2011–",
          imdbID: "tt2085059",
          Type: "series",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BNTEwYzNiMGUtNzRlYS00MTMzLTliNzgtOGUxZGZiNThlNWYwXkEyXkFqcGdeQXVyMjYwNDA2MDE@._V1_SX300.jpg"
        },
        {
          Title: "The Haunting of Hill House",
          Year: "2018–",
          imdbID: "tt6763664",
          Type: "series",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BMTU4NzA4MDEwNF5BMl5BanBnXkFtZTgwMTQxODYzNjM@._V1_SX300.jpg"
        },
        {
          Title: "Chernobyl",
          Year: "2019",
          imdbID: "tt7366338",
          Type: "series",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BZWRjNDA0NWQtOGQyNy00Nzg4LWIwYWMtMTk0ZDRlOTg1OGQxXkEyXkFqcGdeQXVyMzY0MTE3NzU@._V1_SX300.jpg"
        },
        {
          Title: "The Umbrella Academy",
          Year: "2019–",
          imdbID: "tt1312171",
          Type: "series",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BNTFhOTk1NTgtYWM1ZS00NWI1LTgzYzAtYmE5MjZiMDE0NzlhXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg"
        }
      ];
    },

    loadMovies() {
      this.cards = [
        {
          Title: "Avengers: Endgame",
          Year: "2019",
          imdbID: "tt4154796",
          Type: "movie",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg"
        },
        {
          Title: "Aladdin",
          Year: "2019",
          imdbID: "tt6139732",
          Type: "movie",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BMjQ2ODIyMjY4MF5BMl5BanBnXkFtZTgwNzY4ODI2NzM@._V1_SX300.jpg"
        },
        {
          Title: "Pokémon Detective Pikachu",
          Year: "2019",
          imdbID: "tt5884052",
          Type: "movie",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BNDU4Mzc3NzE5NV5BMl5BanBnXkFtZTgwMzE1NzI1NzM@._V1_SX300.jpg"
        },
        {
          Title: "Hellboy",
          Year: "2019",
          imdbID: "tt2274648",
          Type: "movie",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BODdkMDQzMzItZDc4YS00OGM4LTkxNTQtNjUzNzU0ZmJkMWY2XkEyXkFqcGdeQXVyMjMxOTE0ODA@._V1_SX300.jpg"
        },
        {
          Title: "The Curse of La Llorona",
          Year: "2019",
          imdbID: "tt4913966",
          Type: "movie",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BNjU4NjU4ZDktOTg2Ny00MWI2LThiMTAtMGFkZGE1MWI5MzhjXkEyXkFqcGdeQXVyODQxMTI4MjM@._V1_SX300.jpg"
        },
        {
          Title: "Dumbo",
          Year: "2019",
          imdbID: "tt3861390",
          Type: "movie",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BNjMxMDE0MDI1Ml5BMl5BanBnXkFtZTgwMzExNTU3NjM@._V1_SX300.jpg"
        }
      ];
    },
    searchFromOMDB() {
      var self = this;

      axios
        .get(
          "http://www.omdbapi.com/?s=" +
            this.search +
            "&type=" +
            self.tipo +
            "&apikey=bcf1862b"
        )
        .then(function(response) {
          console.log(response);
          self.responseSearch = response;
          self.cards = response.data.Search;
        })
        .catch(function(error) {
          console.log("No se ha encontrado" + error);
        });
    },
    async addToLista(card, tipoLista) {
      this.nombreLista = tipoLista; // Variable para el snackbar
      var self = this;

      // Hay que hacer comprobaciones antes de insertar
      self.addPosible = await axios
        .get("/existeEntrada", {
          params: {
            titulo: card.Title,
            tipoLista: tipoLista,
            username: self.username
          }
        })
        .then(function(response) {
          if (response.data.existe) {
            console.log("if");
            return false;
          } else if (tipoLista == "favoritas") {
            console.log("else favorita");
            return true;
          } else {
            console.log("else viendo/terminadas");
            // No existe, seguimos comprobando si está en viendo/terminadas (segun caso)
            return axios
              .get("/existeEntrada", {
                params: {
                  titulo: card.Title,
                  tipoLista: response.data.listaCheck,
                  username: self.username
                }
              })
              .then(function(response) {
                if (response.data.existe) {
                  console.log("last if");
                  return false;
                } else {
                  console.log("last else");
                  return true;
                }
              })
              .catch(function(error) {
                console.log("error find: " + error);
              });
          }
        })
        .catch(function(error) {
          console.log("error find: " + error);
        });

      console.log("addPosible", self.addPosible);
      if (self.addPosible) {
        axios
          .post("/listas", {
            titulo: card.Title,
            tipo: card.Type,
            year: card.Year,
            poster: card.Poster,
            username: self.username,
            tipoLista: tipoLista
          })
          .then(function() {
            console.log("ADDED!");
            self.mostrarSnack = true;
          })
          .catch(function(error) {
            console.log("Error al añadir: " + error);
          });
      } else {
        self.mostrarSnack2 = true;
      }
    }
  },
  watch: {
    $route(to, from) {
      console.log("watch from:" + from.path);
      console.log("watch to:" + to.path);
      if (to.path == "/biblioteca/series") {
        this.tipo = "series";
        this.loadSeries();
      } else {
        this.tipo = "movie";
        this.loadMovies();
      }
    }
  },
  created() {
    // pelis/series de entrada
    var self = this;

    if (self.$route.params.tipo == "series") {
      self.tipo = "series";
      self.loadSeries();
    } else {
      self.tipo = "movie";
      self.loadMovies();
    }
  }
};
</script>

<style>
.capitalize {
  text-transform: capitalize;
}
.img {
  /*position: relative;*/
  /*float: left;*/
  width: 100px;
  height: 100px;
  /*background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;*/
}
</style>
