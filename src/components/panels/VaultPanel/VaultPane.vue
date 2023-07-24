<template>
  <v-list bg-color="primary">
    <v-list-subheader>ALL VAULTS</v-list-subheader>
    <v-list-item
      v-for="(vault, i) in allVaults"
      :key="i"
      :value="vault"
      color="listeditem"
      bg-color="primary"
    >
      <template #prepend>
        <v-icon :icon="vault.icon"></v-icon>
      </template>
      <v-list-item-title
        :class="{ vaultselected: isSelected(vault.text) }"
        @click="clickedVault(vault.text)"
      >
        {{ vault.text }}</v-list-item-title
      >
    </v-list-item>
  </v-list>
</template>
<script>
export default {
  data() {
    return {
      vaultSelected: "",
      allVaults: [
        { text: "All Items", icon: "mdi-format-list-bulleted-type" },
        { text: "Favorites", icon: "mdi-star" },
        { text: "Frequently Used", icon: "mdi-heart" },
      ],
    };
  },
  methods: {
    clickedVault(vault) {
      this.vaultSelected = vault;
    },
    isSelected(clickedvault) {
      return clickedvault === this.vaultSelected;
    },
  },
};
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
  background-color: #e5e4e2;
  font-weight: bold;
  justify-content: center;
}
.vaultselected {
  font-weight: bold;
  color: rgb(49, 49, 204);
}
</style>
