<template>
  <v-app>
    <v-alert dense type="error" outlined text v-if="error.show" class="mt-1">{{error.text}}</v-alert>
    <v-container class="d-flex fill-height">
      <v-card class="ma-auto" width="500px">
        <v-card-title class="mx-auto">Buscar Mesa</v-card-title>
        <v-card-text>
          <v-form v-model="valid">
            <v-text-field
              v-model="table"
              label="Buscar"
              append-icon="mdi-magnify"
              :rules="rules"
              required
            ></v-text-field>
            <v-btn
              right
              color="purple"
              class="white--text"
              :disabled="!valid"
              @click="searchTable"
              >Buscar</v-btn
            >
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      table: "",
      error: {
        show: false,
        text: "",
      },
      valid: true,
      rules: [(v) => !!v || "Ingrese codigo de la mesa"],
    };
  },
  methods: {
    searchTable() {
      this.$router.push(`/mesa/${this.$data.table}`)
        .catch((err) => {
          this.error.show = true;
          this.error.text = "La mesa ingresada esta desactivada o no existe. Porfavor comunicarse";
          console.log(err);
        });
    },
  },
};
</script>

<style>
</style>
