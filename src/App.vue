<script>
import { defineComponent } from "vue";
import Login from "./components/Login.vue";
import SignUp from "./components/SignUp.vue";
import Main from "./components/Main.vue";
import Menubar from "./components/Menubar.vue";
import CredentialPane from './components/Pannels/CredentialPanel/CredentialPane.vue'


export default defineComponent({
  components: {
    SignUp,    
    Main,
    Login,    
    Menubar,
    CredentialPane,        
    
  },
  
});
</script>
<template>
  <v-app app>
    <Menubar/>    
    <v-main>
      <Main />
    </v-main>  

  </v-app>
</template>
<style scoped>

</style>