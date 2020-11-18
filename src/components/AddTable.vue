<template>
  <div>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-card
          min-height="116"
          flat
          color="grey"
          class="d-flex"
          v-bind="attrs"
          v-on="on"
        >
          <v-btn depressed color="grey" dark fab class="ma-auto"
            ><v-icon>mdi-plus</v-icon></v-btn
          >
        </v-card>
      </template>
      <v-card>
        <v-toolbar dark color="teal">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Agregar nueva Mesa</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false"> Guardar </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-container>
          <v-form v-model="valid">
            <v-autocomplete
              chips
              label="Encargado de la mesa"
              :items="empleados"
              item-text="nombre"
              item-value="id"
              v-model="nuevaMesa.empleado"
              :rules="rules.require"
              required
            ></v-autocomplete>
            <v-text-field
              label="Numero de la mesa"
              type="number"
              v-model="numero"
              :rules="rules.require"
              required
            ></v-text-field>
            <v-btn
              @click="createTable"
              :disabled="!valid"
              block
              color="teal darken-1"
              class="white--text"
              :loading="loading"
              >Crear Mesa</v-btn
            >
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "AddTable",
  props: ["empleados", "numero"],
  data() {
    return {
      dialog: false,
      valid: true,
      loading: false,
      nuevaMesa: {
        empleado: "",
      },
      rules: {
        require: [(value) => !!value || "Required."],
      },
    };
  },
  methods: {
    async createTable() {
      this.loading = true;
      const body = {
        empleado: this.nuevaMesa.empleado,
        numero: this.numero,
      };
      await fetch("https://qbar.herokuapp.com/api/admin/create", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) =>
          res.json().then((data) => {
            this.nuevaMesa.empleado = "";
            this.dialog = false;
            this.loading = false;
            if (data.type == "succes") {
              this.$emit("succesCreateTable");
            } else {
              this.$emit("errorCreateTable");
            }
          })
        )
        .catch(() => {
          this.nuevaMesa.empleado = "";
          this.dialog = false;
          this.loading = false;
          this.$emit("errorCreateTable");
        });
    },
  },
};
</script>

<style>
</style>
