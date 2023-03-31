<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

//import Login from "./components/Login.vue";
//import SignUp from "./components/SignUp.vue";
import Main from "./components/Main.vue";

</script>
<template>
  <v-app>
    <v-app-bar app top>
      <v-img
        class="mx-2"
        src="..//assets/logo.png"
        max-height="70"
        max-width="240"
        contain
        left
      ></v-img>
    
      <v-toolbar-title>Menu Section</v-toolbar-title>
      <v-btn @click="loginDialog = true"
      
      color="primary"
      >Login</v-btn>
    </v-app-bar>

    
    <br /><br /><br />
   <Main />
  </v-app>
   
</template>


<style>
</style>
