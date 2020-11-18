<template>
  <v-app>
    <v-app-bar color="teal" dark app>
      <v-app-bar-nav-icon
        @click.stop="drawer.state = !drawer.state"
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer
      dark
      color="teal darken-2"
      :temporary="drawer.mobile"
      :absolute="drawer.mobile"
      :stateless="!drawer.mobile"
      :app="!drawer.mobile"
      v-model="drawer.state"
    >
      <v-list shaped class="">
        <v-list-item
          v-for="link in links"
          :key="link.text"
          router
          :to="link.path"
          :disabled="link.disable"
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
// import { db } from "@/fb.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      isAdmin: false,
      drawer: {
        mobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ),
        state: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
          ? false
          : true,
      },
      links: [
        {
          text: "Mesas",
          icon: "mdi-table-chair",
          path: "/admin/mesas",
          disable: false,
          admin: true,
        },
        {
          text: "Empleados",
          icon: "mdi-account",
          path: "/admin/empleados",
          disable: true,
          admin: true,
        },
        {
          text: "Control Mesas",
          icon: "mdi-barcode-scan",
          path: "/admin/control",
          disable: false,
          admin: false,
        },
      ],
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.table.user,
    }),
  },
};
</script>

<style>
</style>
