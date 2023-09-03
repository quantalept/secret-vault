<script>
import { defineComponent } from "vue";
import Login from "./components/Login.vue";
import SignUp from "./components/SignUp.vue";
import Main from "./components/Main.vue";
import Menubar from "./components/Menubar.vue";
import { createAndLoadDatabase } from './components/js/database';


export default defineComponent({
  created() {
    this.loadDatabase();
  },
  methods: {
    async loadDatabase() {
      try {
        await createAndLoadDatabase();
        console.log('Database loaded successfully!');
      } catch (error) {
        console.error('Error loading the database:', error);
      }
    },
  },
  components: {
    SignUp,    
    Main,
    Login,    
    Menubar,        
    
  },
  
});
</script>
<template>
  <v-app app>
    <Menubar/>    
    <v-main>
      <Main/>
    </v-main>  

  </v-app>
</template>
<style scoped>

</style>