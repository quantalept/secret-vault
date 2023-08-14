<template>
  <v-container class="main-container">
    <v-row style="height: 100%">
      <v-col md="2">
        <v-card style="height: 100%" color="primary">
          <VaultPane />
          <v-divider></v-divider>
          <Category @category-selected="showselectedCategory"/>
        </v-card>
      </v-col>
      <v-col md="4">
        <search-pane
          :selectedCategory="selectedCategory"
          @catelogue-selected="showselectedCred"
        />
      </v-col>
      <v-col md="6">
        <credential-pane :selectedCred="selectedCred"/>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import CredentialPane from "./panels/CredentialPanel/CredentialPane.vue";
import SearchPane from "./panels/SearchPanel/SearchPane.vue";
import VaultPane from "./panels/VaultPanel/VaultPane.vue";
import Category from "./panels/VaultPanel/Category.vue";

export default {
  components: {
    CredentialPane,
    VaultPane,
    Category,
    SearchPane,
  },
  data() {
    return { 
      selectedCategory: null, 
      selectedCred: null
    };
  },
  methods: {
    showselectedCategory(category) {
      this.selectedCategory = category;
    },
    showselectedCred(catalogueStore) {
      this.selectedCred = catalogueStore;
    },
  },
};
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
