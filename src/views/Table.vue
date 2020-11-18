<template>
  <div>
    <div class="d-flex">
      <h1 class="ma-auto">Mesa: {{ numero }}</h1>
    </div>
    <div>
      <v-form>
        <v-text-field
          v-model="search"
          label="Buscar"
          append-icon="mdi-magnify"
        ></v-text-field>
      </v-form>
    </div>
    <v-divider></v-divider>
    <v-row>
      <v-col v-for="producto in searchProd" :key="producto.id" cols="6">
        <v-card>
          <v-img
            :src="producto.img"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <v-card-title v-text="producto.nombre"></v-card-title>
          </v-img>

          <v-card-actions>
            <span>$ {{producto.precio}}</span>
            <v-spacer></v-spacer>

            <v-btn icon>
              <v-icon>mdi-information</v-icon>
            </v-btn>

            <v-btn icon color="purple">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { db } from "../fb.js";
export default {
  data() {
    return {
      search: "",
      numero: "",
      productos: [],
    };
  },
  async created() {
    this.$store.commit("SET_IDTABLE", this.id);
    await db
      .doc(`mesas/${this.id}`)
      .get()
      .then((snap) => {
        this.numero = snap.data().numero;
        this.$store.commit("SET_IDHELP", snap.data().idEmpleado)
      });
    await this.$bind("productos", db.collection(`productos/`));
  },
  props: ["id"],
  computed: {
    searchProd() {
      return this.productos.filter((producto) => {
        return producto.nombre.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
};
</script>

<style>
</style>
