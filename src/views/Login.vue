<template>
  <v-app>
    <v-alert dense :type="error.type" outlined text v-if="error.show" class="mt-1">{{
      error.text
    }}</v-alert>
    <v-container class="d-flex fill-height">
      <v-card class="ma-auto" width="500px">
        <v-card-title class="mx-auto">Login</v-card-title>
        <v-card-text>
          <v-form v-model="valid">
            <v-text-field
              v-model="user.mail"
              label="Email"
              append-icon="mdi-email"
              :rules="rules.mail"
              required
            ></v-text-field>
            <v-text-field
              v-model="user.pass"
              :append-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
              :type="show ? 'password' : 'text'"
              @click:append="show = !show"
              :rules="rules.password"
              label="Password"
              required
            ></v-text-field>
            <v-btn right color="teal" class="white--text" :disabled="!valid" @click="Login"
              >Login</v-btn
            >
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import {auth} from '@/fb.js'
export default {
  data() {
    return {
      valid: false,
      show: true,
      user: {
        mail: "",
        pass: "",
      },
      error: {
        text: "",
        show: false,
        type: "error"
      },
      rules: {
        mail: [
          (v) => !!v || "E-mail is required",
          (v) => /.+@.+/.test(v) || "Email must be valid",
        ],
        password: [(value) => !!value || "Required."],
      },
    };
  },
  methods: {
    Login() {
      auth.signInWithEmailAndPassword(this.user.mail, this.user.pass).then((user) => {
        this.$store.commit("SET_USER", user),
        this.error.text = "Se ha ingresado correctamente"
        this.error.show = true
        this.error.type = "success"
      }).catch(err => {
        this.error.text = err
        this.error.show = true
      })      
    }
  }
};
</script>

<style>
</style>
