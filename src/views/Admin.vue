<template>
  <v-container>
    <v-alert v-model="success" dismissible type="success"
      >Se ha creado la nueva mesa: {{ cantidadMesas - 1 }}</v-alert
    >
    <v-alert v-model="update.bool" dismissible :type="update.type">{{
      update.text
    }}</v-alert>
    <v-alert v-model="error" dismissible type="error"
      >Se produjo un error al crear la nueva mesa: {{ cantidadMesas }}</v-alert
    >
    <v-row>
      <v-col md="4" sm="12" cols="12">
        <AddTable
          v-bind:empleados="empleados"
          v-bind:numero="cantidadMesas"
          @succesCreateTable="success = true"
          @errorCreateTable="error = true"
        />
      </v-col>
      <v-col v-for="mesa in mesas" :key="mesa.id" md="4" sm="12">
        <v-card min-height="100">
          <div class="d-flex">
            <v-card-title class="ma-auto">{{ mesa.numero }}</v-card-title>
          </div>
          <v-divider class="mx-2"></v-divider>
          <v-card-actions>
            <v-btn icon><v-icon>mdi-cart</v-icon></v-btn>
            <v-btn icon :href="mesa.code" :download="`mesa${mesa.numero}.png`"
              ><v-icon>mdi-qrcode</v-icon></v-btn
            >
            <v-btn icon><v-icon>mdi-information</v-icon></v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click="editTable(mesa)"
              ><v-icon>mdi-pencil</v-icon></v-btn
            >
            <v-chip
              :color="mesa.estado ? 'red' : 'green'"
              class="white--text"
              @click="editEstado(mesa.id, mesa.estado)"
              >{{ mesa.estado ? "Ocupada" : "Libre" }}</v-chip
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title>Editar mesa: {{ mesaeditar.numero }}</v-card-title>
        <v-container>
          <v-autocomplete
            chips
            label="Encargado de la mesa"
            :items="empleados"
            item-text="nombre"
            item-value="id"
            v-model="mesaeditar.idEmpleado"
          ></v-autocomplete>
          <v-btn
            block
            color="teal lighten-1"
            class="white--text"
            :loading="loading"
            @click="updateTable"
            >Confirmar</v-btn
          >
        </v-container>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { db } from "@/fb.js";
import AddTable from "@/components/AddTable.vue";
export default {
  data() {
    return {
      mesas: [],
      empleados: [],
      success: false,
      error: false,
      dialog: false,
      mesaeditar: {},
      update: {
        bool: false,
        text: null,
        type: "success",
      },
      loading: false,
    };
  },
  components: {
    AddTable,
  },
  async created() {
    await this.$bind("mesas", db.collection(`mesas/`).orderBy("numero"));
    await this.$bind("empleados", db.collection(`empleados/`));
  },
  methods: {
    async editEstado(id, estado) {
      db.doc(`mesas/${id}`).update({
        estado: !estado,
      });
    },
    editTable(mesa) {
      this.dialog = true;
      this.mesaeditar = mesa;
    },
    async updateTable() {
      this.loading = true;
      const body = {
        id: this.mesaeditar.id,
        empleado: this.mesaeditar.idEmpleado,
      };
      await fetch("https://qbar.herokuapp.com/api/admin/update", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) =>
          res.json().then((data) => {
            if (data.type == "success") {
              console.log(data)
              this.update.text = `Se ha actualizado la informacion de la mesa: ${this.mesaeditar.numero}`;
              this.update.type = "success";
              this.update.bool = true;
              this.loading = false;
              this.dialog = false;
            } else {
              this.update.text = `No se ha actualizado la informacion de la mesa: ${this.mesaeditar.numero}`;
              this.update.type = "error";
              this.update.bool = true;
              this.loading = false;
              this.dialog = false;
            }
          })
        )
        .catch(() => {
          this.update.text = `No se ha actualizado la informacion de la mesa: ${this.mesaeditar.numero}`;
          this.update.type = "error";
          this.update.bool = true;
          this.loading = false;
          this.dialog = false;
        });
    },
  },
  computed: {
    cantidadMesas() {
      return this.mesas.length + 1;
    },
  },
};
</script>

<style scoped>
.dn_ {
  display: none;
}
</style>
