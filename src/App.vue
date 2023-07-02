<script>
import { defineComponent } from "vue";
import Login from "./components/Login.vue";
import SignUp from "./components/SignUp.vue";
import Main from "./components/Main.vue";
import Menubar from "./components/Menubar.vue";
import Test4 from "./components/Test4.vue";


export default defineComponent({
  components: {
    SignUp,    
    Main,
    Login,    
    Menubar,    
    Test4,
    
    
    
  },
  // data() {
  //   return { dialog: false };
  // },
});
</script>
<template>
  <v-app app>
    <Menubar />
    <v-main>
      <SignUp/>
    </v-main>
    
  
  <!-- <Test4/> -->
  </v-app>
</template>
<style scoped>

</style>