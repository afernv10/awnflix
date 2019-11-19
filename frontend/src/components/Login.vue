<template>
  <div class="classDiv">
    <v-parallax
      class="classDiv"
      height="100%"
      :src="require('../assets/cookie-monster.jpg')"
    >
      <v-content>
        <v-alert
          v-model="alert"
          dismissible
          transition="scale-transition"
          type="error"
          >{{ message }}</v-alert
        >
        <v-container fluid fill-height>
          <v-card class="mx-auto" width="800">
            <v-card-title
              class="title font-weight-regular justify-space-between"
            >
              <span>Login</span>
            </v-card-title>

            <v-window>
              <v-window-item>
                <v-card-text>
                  <v-text-field
                    v-model="username"
                    prepend-icon="person"
                    type="text"
                    label="Username"
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    prepend-icon="lock"
                    label="Password"
                    type="password"
                  ></v-text-field>
                </v-card-text>
              </v-window-item>
            </v-window>

            <v-divider></v-divider>

            <v-card-actions>
              <v-btn color="primary" block @click="login">Log in</v-btn>
            </v-card-actions>
          </v-card>
        </v-container>
      </v-content>
    </v-parallax>
  </div>
</template>

<script>
import { mapState } from "vuex";
//import axios from "axios";
const axios = require("../utils/axiosConfig.js");

export default {
  data() {
    return {
      username: "",
      password: "",
      alert: false,
      message: ""
    };
  },
  computed: {
    ...mapState(["isLoggedIn"])
  },
  methods: {
    login() {
      var self = this;
      axios
        .get("/login", {
          params: {
            username: self.username,
            password: self.password
          }
        })
        .then(function(response) {
          if (response.data.success) {
            self.$store.commit("logear");
            self.$router.push("profile");
            self.$emit("sendUsername", response.data.username); // emito el nombre de usuario a un componente padre
          } else {
            self.showAlert(response.data.msg);
          }
        })
        .catch(function(error) {
          console.log("Error axios-get-login: " + error);
        });
    },
    showAlert(mssg) {
      this.alert = !this.alert;
      this.message = mssg;
    }
  }
};
</script>

<style>
.classDiv {
  position: fixed;
  width: 100%;
  height: 100%;
}
</style>
