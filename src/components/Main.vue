<template>
  <v-container class='main-container' >
    <v-row style="height:100%">     
     
      <v-col md='2'>
       
        <VaultPane />        
        <v-divider></v-divider>
         <Category @item-selected="showSelectedItem"/>
        
      </v-col>
    

      <v-col md="4">
        <search-pane :selectedItem="selectedItem"/>          
      </v-col>
      <v-col md="6">
        <credential-pane />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CredentialPane from './panels/CredentialPanel/CredentialPane.vue';
import SearchPane from './panels/SearchPanel/SearchPane.vue';
import VaultPane from "./panels/VaultPanel/VaultPane.vue";
import Category from './panels/VaultPanel/Category.vue';



export default {
  components: {
    CredentialPane,
    VaultPane,
    Category,
    SearchPane,
    
  },
  data() {
    return { selectedItem: null };
  },
  methods: {
    showSelectedItem(item) {
      this.selectedItem = item;
    },
  },
};
</script>
<style scoped>
.v-main .main-container {
  margin-top: 0px;
  height: calc(100vh - 35px);
  padding: 1px;
  max-width: 100%;
  
}

.v-col {
  padding: 1px;
  background-color: #C0C0C0;
}
</style>
