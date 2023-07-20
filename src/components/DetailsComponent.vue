<template>
    <div>
      <v-card v-if="selectedItem">
        <v-card-title>{{ selectedItem.name }}</v-card-title>
        <v-card-text>
          {{ selectedItem.description }}
        </v-card-text>
      </v-card>
      <v-alert v-else>No item selected</v-alert>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      selectedItem: Object
    }
  };
  </script>
  