<script>
import { defineComponent } from "vue";
import Login from "./components/Login.vue";
import SignUp from "./components/SignUp.vue";
import Main from "./components/Main.vue";
import Menubar from "./components/Menubar.vue";
import ExtVault from "./components/ExtVault.vue";

export default defineComponent({
  components: {
    SignUp,    
    Main,
    Login,    
    Menubar, 
    ExtVault, 
    
  },
  // data() {
  //   return { dialog: false };
  // },
});
</script>
<template>
  <v-app app>
    <Menubar/>    
    <v-main>
      <ExtVault />
    </v-main>
    
  
 
  </v-app>
</template>
<style scoped>

</style>