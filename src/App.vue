<script>
import { defineComponent } from "vue";
import Login from "./components/Login.vue";
import SignUp from "./components/SignUp.vue";
import Main from "./components/Main.vue";



export default defineComponent({
  components: {
    SignUp,    
    Main,
    Login,    
    
   
  },
  // data() {
  //   return { dialog: false };
  // },
});
</script>
<template>
  <v-app>
    
    <Main />
  </v-app>
</template>