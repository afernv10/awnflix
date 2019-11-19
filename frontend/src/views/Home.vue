<template>
  <div>
    <section>
      <v-parallax height="600" :src="require('../assets/cookie-monster.jpg')">
        <v-layout align-center column justify-center>
          <h1 class="display-3 font-weight-thin mb-3">AWn&nbsp;Flix</h1>
          <h4 class="subheading">
            Track your movies and series the best way possible!
          </h4>
        </v-layout>
      </v-parallax>
    </section>

    <section>
      <v-layout column wrap class="my-5" align-center>
        <v-flex xs12 sm4 class="my-3">
          <div class="text-xs-center">
            <h2 class="headline">Discover new things to see</h2>
            <span class="subheading"
              >Series? Movies? ...BOTH?! Organize all of them as you want
              :)</span
            >
          </div>
        </v-flex>
        <v-flex xs12>
          <v-container grid-list-xl>
            <v-layout row wrap align-center>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="blue--text text--lighten-2"
                      >ondemand_video</v-icon
                    >
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">
                      Series and TV Shows
                    </div>
                  </v-card-title>
                  <v-card-text class="text-xs-center">
                    Find TV Show that your friend has told you about and keep it
                    to not forget the title!
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="blue--text text--lighten-2"
                      >movie_creation</v-icon
                    >
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline">Movies</div>
                  </v-card-title>
                  <v-card-text class="text-xs-center"
                    >Discover the newest films and shorts.</v-card-text
                  >
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="blue--text text--lighten-2"
                      >format_list_bulleted</v-icon
                    >
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">Custom lists</div>
                  </v-card-title>
                  <v-card-text class="text-xs-center">
                    Organise in Stored, Favorites, Seeing, Pending, Finished...
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </section>

    <section>
      <v-parallax :src="require('../assets/cookie-monster.jpg')" height="380">
        <v-layout column align-center justify-center>
          <div class="headline white--text mb-3 text-xs-center">
            Keep up-to-date has never been easier
          </div>
          <em>Sign up today, and don't waste your time</em>
          <v-btn class="blue lighten-2 mt-5" dark large to="/registro"
            >Get Started</v-btn
          >
        </v-layout>
      </v-parallax>
    </section>

    <v-footer class="blue darken-2">
      <v-layout row wrap align-center>
        <v-flex xs12>
          <div class="white--text ml-3">
            Made with
            <v-icon class="red--text">favorite</v-icon>by
            <a class="white--text" href="https://vuetifyjs.com" target="_blank"
              >Vuetify</a
            >
            and
            <a class="white--text" href="https://github.com/vwxyzjn"
              >Costa Huang</a
            >
            ,
            <a class="white--text" href="https://github.com/afernv10">Ander</a>
            y
            <a class="white--text" href="https://github.com/dmarcs00">David</a>

            <v-icon class="white--text">sentiment_satisfied_alt</v-icon>
          </div>
        </v-flex>
      </v-layout>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>
