import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'


/*import {CsvImport} from './views/CsvImport.vue'
import Vue from "vue";



Vue.config.productionTip = false;

new Vue({
  render: (h) => h(CsvImport)
}).$mount("#importCSV");*/
library.add(fas)
createApp(App).component('fa',FontAwesomeIcon).use(router).use(VueChartkick).mount('#app')