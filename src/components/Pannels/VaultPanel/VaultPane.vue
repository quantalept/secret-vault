<template>
  <v-card style="height: 100%" color="primary">
    <v-list>
      <v-list-subheader>ALL VAULTS</v-list-subheader>
      <v-list-item v-for="(vault, i) in allvaultsData.allVaults" :key="i" :value="vault" color="listeditem"
        bg-color="primary">
        <template #prepend>
          <v-icon :icon="vault.icon"></v-icon>
        </template>
        <v-list-item-title :class="{ 'vaultselected': isSelected(vault.text) }" @click="clickedVault(vault.text)">
          {{ vault.text }}</v-list-item-title>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <Category />
  </v-card>
</template>
<script>
import Category from './Category.vue'
export default {
  components: {
    Category,
  },
  setup() {
    let vaultSelected;
    const allvaultsData = {

      allVaults: [
        { text: "All Items", icon: "mdi-format-list-bulleted-type" },
        { text: "Favorites", icon: "mdi-star" },
        { text: "Frequently Used", icon: "mdi-heart" },
      ],
    }
    const isSelected = (clickedvault) => {
      return clickedvault === vaultSelected;
    }

    const clickedVault = (vault) => {
      vaultSelected = vault;
    }
    return {
      allvaultsData,
      isSelected,
      clickedVault,
    }
  }
}
</script>
<style scoped>
.v-list {
  background-color: #f5f5f5;
  border: 2px;
  margin-top: 0px;
}

.v-list-subheader {
  color: black;
  font-size: 18px;
  background-color: #E5E4E2;
  font-weight: bold;
  justify-content: center;
}

.vaultselected {
  font-weight: bold;
  color: rgb(49, 49, 204);

}
</style>
