<template>
    <v-list>
      <v-list-item v-for="item in items" :key="item.id" @click="selectIItem(item)">
        <v-list-item-title>{{ item.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </template>
  
  <script>
  export default {
    
    data() {
    return {
      items: [
        { id: 1, name: 'Item 1', description: 'Description of Item 1' },
        { id: 2, name: 'Item 2', description: 'Description of Item 2' },
        { id: 3, name: 'Item 3', description: 'Description of Item 3' }
      ],
      
    };
  },
  methods: {    
    selectIItem(item) {
      this.$emit('item-selected', item);
    },
    
  }
    
  };
  </script>
  