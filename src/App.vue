<script>
import { defineComponent } from "vue";
import Login from "./components/Login.vue";
import SignUp from "./components/SignUp.vue";
import Main from "./components/Main.vue";
import Menubar from "./components/Menubar.vue";
import Database from "./components/Database.vue";



export default defineComponent({
  components: {
    SignUp,    
    Main,
    Login,    
    Menubar,
    Database,
    
  },
  // data() {
  //   return { dialog: false };
  // },
});
</script>
<template>
  <v-app app>
   
 <database></database>
    
  
  <!-- <Main/> -->
  </v-app>
</template>
<style scoped>

</style>
