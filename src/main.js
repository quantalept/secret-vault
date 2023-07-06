//import "./styles.css";
import '@mdi/font/css/materialdesignicons.css'
import { createApp } from 'vue'
import App from './App.vue'


// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import lighttheme from './styles/light-theme'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi'
  },
  theme: {    
    themes: {        
      light:lighttheme.myCustomTheme,
    },
  },
})

createApp(App).use(vuetify).mount('#app')