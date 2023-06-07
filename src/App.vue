<script>
import { defineComponent } from "vue";
import Login from "./components/Login.vue";
import SignUp from "./components/SignUp.vue";
import Main from "./components/Main.vue";
import Menubar from "./components/Menubar.vue";
import Test1 from "./components/Test1.vue";


export default defineComponent({
  components: {
    SignUp,    
    Main,
    Login,    
    Menubar,
    Test1,
    
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
      <Main />
    </v-main>
    
  
  <!-- <Test1/> -->
  </v-app>
</template>
<style scoped>

</style>