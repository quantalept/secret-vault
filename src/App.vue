<script>
import { defineComponent } from "vue";
import Login from "./components/Login.vue";
import SignUp from "./components/SignUp.vue";
import Main from "./components/Main.vue";
import Menubar from "./components/Menubar.vue";
import Table from "./components/Table.vue";



export default defineComponent({
  components: {
    SignUp,    
    Main,
    Login,    
    Menubar,
    Table
    
  },
  // data() {
  //   return { dialog: false };
  // },
});
</script>
<template>
  <v-app app>
   
 <Table></Table>
    
  
  <!-- <Main/> -->
  </v-app>
</template>
<style scoped>

</style>
