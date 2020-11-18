<template>
    <v-container class="d-flex fill-height">
      <v-card min-width="auto" outlined class="mx-auto">
        <span v-if="code.text" class="title">{{code.text}}</span>
      </v-card>
      <qrcode-stream @decode="onDecode" id="sanner"></qrcode-stream>
      <v-row class="ma-auto">
        <v-col cols="6">
          <v-btn
            block
            color="green"
            class="white--text"
            depressed
            :disabled="!valid"
            @click="controlTable(true)"
            >Activar Mesa</v-btn
          >
        </v-col>
        <v-col cols="6">
          <v-btn
            block
            color="red"
            class="white--text"
            depressed
            :disabled="!valid"
            @click="controlTable(false)"
            >Descativar Mesa</v-btn
          >
        </v-col>
      </v-row>
      <v-alert type="error" block absolute v-if="error">
        El codigo escaneado no pertenece a una mesa valida
      </v-alert>
    </v-container>
</template>

<script>
import { db } from "@/fb.js";
export default {
  data() {
    return {
      valid: false,
      code: {
        text: null,
        valid: false,
      },
      active: false,
      error: false,
    };
  },
  methods: {
    onDecode(decodedString) {
      this.valid = false
      const parse = decodedString.split("/");
      if (!(parse[0] == decodedString)) {
        this.valid = true;
        this.code.text = parse[4];
        this.code.valid = true;
        console.log(decodedString)
      } else {
        this.code.valid = false,
        this.code.text = null
        this.error = true;
        setTimeout(() => {
          this.error = false;
        }, 4000);
      }
    },
    async controlTable(bool) {
      this.valid = false;
      if (this.code.valid) {
        await db.doc(`mesas/${this.code.text}`).update({
          estado: bool,
        });
      }
    },
    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        this.error.show = true;
        if (error.name === "NotAllowedError") {
          this.error.text = "ERROR: you need to grant camera access permisson";
        } else if (error.name === "NotFoundError") {
          this.error.text = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error.text = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error.text = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error.text = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error.text =
            "ERROR: Stream API is not supported in this browser";
        }
      }
    },
  },
};
</script>

<style scoped>
.qrcode-stream-wrapper {
  height: 600px !important;
}
.qrcode-stream-camera {
  height: 600px !important;
}
</style>
