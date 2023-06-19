//import "./styles.css";
import { createApp } from 'vue'
import App from './App.vue'


// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { VDataTable } from 'vuetify/labs/VDataTable'

const vuetify = createVuetify({
  components,
  directives,
  VDataTable
  

})

createApp(App).use(vuetify).mount('#app')