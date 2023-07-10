//import "./styles.css";
import '@mdi/font/css/materialdesignicons.css'
import { createApp } from 'vue'
import App from './App.vue'
import theme from './styles/theme.js'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi'
  },
  theme: {
    themes: {
      light: theme.lightTheme
    }
  }
})

createApp(App).use(vuetify).mount('#app')