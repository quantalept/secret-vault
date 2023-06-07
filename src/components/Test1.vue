<template>
    <div>
      <v-btn text :color="tabColor(1)" @click="selectTab(1)">Tab 1</v-btn>
      <v-btn text :color="tabColor(2)" @click="selectTab(2)">Tab 2</v-btn>
    </div>
  </template>
  
  <script>
  
  export default {
    data() {
      return {
        currentTab: 1
      };
    },
    methods: {
      selectTab(tab) {
        this.currentTab = tab;
        console.log("tab value "+tab);
      },
      tabColor(tab) {
        return tab == this.currentTab ? "primary" : "normal";
      },
    },
  };
  
  </script>