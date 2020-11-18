import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import { firestorePlugin } from "vuefire"
import VueQrcodeReader from "vue-qrcode-reader";

Vue.config.productionTip = false
Vue.use(firestorePlugin)
Vue.use(VueQrcodeReader);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
