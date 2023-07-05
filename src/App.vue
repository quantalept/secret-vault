<script>
import { defineComponent } from "vue";
import Login from "./components/Login.vue";
import SignUp from "./components/SignUp.vue";
import Main from "./components/Main.vue";
import Menubar from "./components/Menubar.vue";
import Database from "./components/Database.vue";
import Encryption from "./components/Encryption.vue";


export default defineComponent({
  components: {
    SignUp,    
    Main,
    Login,    
    Menubar,
    Database,
    Encryption
    
  },
  // data() {
  //   return { dialog: false };
  // },
});
</script>
<template>
  <v-app app>
   

 <encryption></encryption>
    
  
  <!-- <Main/> -->
  </v-app>
</template>
<style scoped>

</style>
