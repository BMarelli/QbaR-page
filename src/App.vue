<template>
  <component :is="this.$route.meta.layout"></component>
</template>

<script>
import {auth} from '@/fb.js'
export default {
  name: "App",
  data: () => ({
    //
  }),
  async created () {
    await auth.onAuthStateChanged(user => {
      this.$store.commit("SET_USER", user)
    }) 
  }
};
</script>
