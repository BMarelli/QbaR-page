<template>
  <v-app>
    <v-bottom-navigation dark fixed grow color="purple">
      <v-btn>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-dialog v-model="dialog">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" @click="callHelp">
            <v-icon>mdi-phone-outline</v-icon>
          </v-btn>
        </template>
        <v-card color="green" dark class="text-center">
          <v-card-title>Llamando</v-card-title>
          <v-card-text>
            <v-card-subtitle class="body-1"
              >Porfavor espere y sera atendido</v-card-subtitle
            >
          </v-card-text>
          <v-card-actions class="">
            <v-spacer></v-spacer>
            <v-btn depressed color="green lighten-2" @click="dialog = false"
              >Cancelar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn>
        <v-icon>mdi-cart-outline</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <v-main>
      <v-container class="mb-14">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    callHelp() {},
  },
  computed: {
    ...mapState({
      table: (state) => state.table.idTable,
      help: (state) => state.table.idHelp,
    }),
  },
};
</script>

<style>
</style>
