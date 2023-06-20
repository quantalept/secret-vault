<script>
import { defineComponent } from "vue";
import Login from "./components/Login.vue";
import SignUp from "./components/SignUp.vue";
import Main from "./components/Main.vue";
import Menubar from "./components/Menubar.vue";
import Click1 from "./components/Click1.vue";


export default defineComponent({
  components: {
    SignUp,    
    Main,
    Login,    
    Menubar, 
    Click1,   
    
  },
  // data() {
  //   return { dialog: false };
  // },
});
</script>
<template>
  <v-app app>
    <!-- <Menubar/>    
    <v-main>
      <Main />
    </v-main> -->
    
  <Click1/>
 
  </v-app>
</template>
<style scoped>

</style>