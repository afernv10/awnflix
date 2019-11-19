<template>
  <div class="classP">
    <v-parallax
      class="classP"
      height="100%"
      :src="require('../assets/cookie-monster.jpg')"
    >
      <v-snackbar
        v-model="showAlert"
        :color="colorSnack"
        top
        auto-height
        :timeout="timeout"
        >{{ msg }}</v-snackbar
      >
      <v-content>
        <v-container fluid fill-height>
          {{ step }}
          {{ registerFinished }}
          <v-card aling-center class="mx-auto" width="800">
            <v-card-title
              class="title font-weight-regular justify-space-between"
            >
              <span>{{ currentTitle }}</span>
              <v-avatar
                color="primary lighten-2"
                class="subheading white--text"
                size="24"
                v-text="step"
              ></v-avatar>
            </v-card-title>

            <v-window v-model="step">
              <v-window-item :value="1">
                <v-card-text>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                      v-model="username"
                      prepend-icon="person"
                      label="Username"
                      type="text"
                      :rules="nameRules"
                      required
                      class="required"
                    ></v-text-field>
                    <v-text-field
                      v-model="email"
                      prepend-icon="email"
                      label="Email"
                      type="text"
                      :rules="[rules.required, rules.email]"
                      class="required"
                    ></v-text-field>
                  </v-form>
                  <span class="caption grey--text text--darken-1">
                    This is the email you will use to login to your AWnFlix
                    account
                  </span>
                </v-card-text>
              </v-window-item>

              <v-window-item :value="2">
                <v-card-text>
                  <v-text-field
                    prepend-icon="lock"
                    v-model="password"
                    label="Password"
                    type="password"
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="lock"
                    label="Confirm Password"
                    type="password"
                    v-model="passwordConfirmation"
                  ></v-text-field>
                  <span class="caption grey--text text--darken-1"
                    >Please enter a password for your account</span
                  >
                </v-card-text>
              </v-window-item>

              <v-window-item :value="3">
                <div class="pa-3 text-xs-center">
                  <v-img
                    class="mb-3"
                    contain
                    height="128"
                    :src="require('../assets/logoMonster.png')"
                  ></v-img>
                  <h3 class="title font-weight-light mb-2">
                    Welcome to my awesome app
                  </h3>
                  <span class="caption grey--text">Thanks for signing up!</span>
                </div>
              </v-window-item>
            </v-window>

            <v-divider></v-divider>

            <v-card-actions>
              <v-btn :disabled="step === 1" flat @click="step--">Back</v-btn>
              <v-spacer></v-spacer>
              <v-btn
                :disabled="step === 3 || !valid"
                color="primary"
                depressed
                @click="step++"
                >Next</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-container>
      </v-content>
    </v-parallax>
  </div>
</template>

<style>
.classP {
  position: fixed;
  width: 100%;
  height: 100%;
}
.required label::after {
  content: "*";
}
</style>

<script>
//import axios from "axios";
const axios = require("../utils/axiosConfig.js");
//import router from"../router"
export default {
  data() {
    return {
      nameRules: [
        v => !!v || "Username is required",
        v => (v && v.length <= 12) || "Name must be less than 12 characters"
      ],
      msg: "Las contraseñas no coinciden, Revísalas!",
      valid: true,
      colorSnack: "error",
      timeout: 1200,
      fab: false,
      tabs: null,
      step: 1,
      username: null,
      password: "",
      coinciden: false,
      passwordConfirmation: "",
      email: "",
      showAlert: false,
      rules: {
        required: value => !!value || "Required.",

        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      }
    };
  },
  methods: {
    signup() {
      var self = this;

      axios
        .post("/signup", {
          username: this.username,
          password: this.password,
          email: this.email
        })
        .then(function(response) {
          console.log(response);
          if (response.data.success) {
            console.log("Usuario registrado! -> " + response.data.userData);
            /*
             * Emitimos el evento para guardar el username
             * cambiamos la variable de isLoggedIn a true a traves de la mutacion del store
             * Hacemos push de la ruta para que vaya al homeusuario.
             */
            self.$emit("sendUsername", self.username);
            self.$store.commit("logear");
            self.$router.push({ name: "profile" });
          } else {
            console.log(
              "No se ha realizado con éxito el registro. - > " +
                response.data.userData
            );
          }
        })
        .catch(function(error) {
          console.log("error reg " + error);
        });
    },
    todoBien() {
      this.showAlert = true;
      this.msg = "Las contraseñas coinciden";
      this.colorSnack = "success";
    },
    retroceder() {
      this.step = 2;
    },
    retroceder1() {
      this.step = 1;
    },
    mostrarError() {
      this.showAlert = true;
      this.msg = "Las contraseñas no coinciden. Revísalas";
      this.colorSnack = "error";
    },
    selectTitle(currentStep) {
      switch (currentStep) {
        case 1:
          return "Go on";
        case 2:
          return "Create a password";
        default:
          return "Almost...";
      }
    }
  },
  computed: {
    activeFab() {
      switch (this.tabs) {
        case "one":
          return { color: "indigo", icon: "share" };
        case "two":
          return { color: "red", icon: "edit" };
        case "three":
          return { color: "green", icon: "keyboard_arrow_up" };
        default:
          return {};
      }
    },
    currentTitle() {
      return this.selectTitle(this.step);
    },
    registerFinished() {
      if (this.step == 3 && this.passwordConfirmation == this.password) {
        this.signup();
        return null;
      } else if (this.step == 2 && this.passwordConfirmation != this.password) {
        this.mostrarError();
      } else if (this.step == 2 && this.passwordConfirmation == this.password) {
        this.todoBien();
      } else if (
        this.step == 3 &&
        (this.passwordConfirmation != this.password || this.password == "")
      ) {
        this.retroceder();
      }
      return null;
    }
  }
};
</script>
