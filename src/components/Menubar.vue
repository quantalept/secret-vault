<template>
    <v-app-bar app dark height="35" color="#E5E4E2" elevation="0">
      <v-row no-gutters>
        <v-col cols="auto">
          <v-toolbar-title> <v-icon>mdi-shield-half-full</v-icon> Secret Manager</v-toolbar-title>
        </v-col>
        <v-col>
          <v-row no-gutters class="ml-16">
            
            <v-btn color="black">Vault</v-btn>
            <v-btn color="black">Edit</v-btn>
            <v-btn color="black">View</v-btn>
            <v-btn color="black">Help</v-btn>
            
          </v-row>
        </v-col>
      </v-row>
    </v-app-bar>
  </template>
  
  <script>
  export default {
    name: 'AppBar',
  }
  </script>
  
  <style scoped>
  .v-app-bar {
    border-bottom: 1px solid lightgray;
  }
  </style>
  