<template>
    <v-app-bar app dark height="35" color="#E5E4E2" bottom>
      <v-menu offset-y>
            <template v-slot:activator="{ props }">
                <v-btn text v-bind="props">Vault</v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title>Preferences</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Exit</v-list-item-title>
              </v-list-item>
          </v-list>
        </v-menu>
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
  