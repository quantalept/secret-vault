<script>
import { defineComponent } from "vue";
import Login from "./components/Login.vue";
import SignUp from "./components/SignUp.vue";
import Main from "./components/Main.vue";
import Menubar from "./components/Menubar.vue";
import Test3 from "./components/Test3.vue";


export default defineComponent({
  components: {
    SignUp,    
    Main,
    Login,    
    Menubar,
    Test3,
    
    
  },
  // data() {
  //   return { dialog: false };
  // },
});
</script>
<template>
  <v-app app>
    <!-- <Menubar />
    <v-main>
      <Main />
    </v-main> -->
    
  
  <Test3/>
  </v-app>
</template>
<style scoped>

</style>