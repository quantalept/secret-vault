<template>
  <v-container class='main-container'>
    <v-row style="height:100%">
      <v-col md='2'>
        <VaultPane />
      </v-col>
      <v-col md="4">
        <search-pane />
      </v-col>
      <v-col md="6">
        <credential-pane />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CredentialPane from './Pannels/CredentialPanel/CredentialPane.vue';
import SearchPane from './Pannels/SearchPanel/SearchPane.vue';
import VaultPane from "./Pannels/VaultPanel/VaultPane.vue";

export default {
  components: {
    CredentialPane,
    VaultPane,
    SearchPane,

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