<template>
  <v-container class="main-container">
    <v-row style="height: 100%">
      <v-col md="2">
        <v-card style="height: 100%" color="primary">
          <VaultPane />
          <v-divider></v-divider>
          <Category/>
        </v-card>
      </v-col>
      <v-col md="4">
        <search-pane @catelogue-selected="handleCatalogItemSelected"/>
      </v-col>
      <v-col md="6">
        <credential-pane :selectedCsId="selectedCsId" :selectedCatalogTitle="selectedCatalogTitle"/>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import CredentialPane from "./panels/CredentialPanel/CredentialPane.vue";
import SearchPane from "./panels/SearchPanel/SearchPane.vue";
import VaultPane from "./panels/VaultPanel/VaultPane.vue";
import Category from "./panels/VaultPanel/Category.vue";
import { defineComponent } from "vue";

export default  defineComponent ({
  components: {
    CredentialPane,
    VaultPane,
    Category,
    SearchPane,
  },
  data() {
    return { 
      selectedCsId: null,
      selectedCatalogTitle: ''
    };
  },
  methods: {
    handleCatalogItemSelected(csId, catalogTitle) {
      this.selectedCsId = csId; 
      this.selectedCatalogTitle = catalogTitle;
    },

  },
});
</script>
<style scoped>
.v-main .main-container {
  height: calc(100vh - 35px);
  padding: 1px;
  max-width: 100%;
}.v-col {
  padding: 1px;
  background-color: #c0c0c0;
}
.v-row {
  margin-top: 1px;
}
</style>
