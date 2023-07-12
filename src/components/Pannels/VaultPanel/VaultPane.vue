<template>
  <v-card style="height: 100%"  color="primary">
  <v-list>
    <v-list-subheader >ALL VAULTS</v-list-subheader>
    <v-list-item v-for="(vault, i) in AllVaults" :key="i" :value="vault" color="rgb(49, 49, 204)" bg-color="primary">
      <template #prepend>
        <v-icon :icon="vault.icon"></v-icon>
      </template>
      <v-list-item-title>{{ vault.text }}</v-list-item-title>
    </v-list-item>
  </v-list>
  <v-divider ></v-divider>
  <Category />
</v-card>
</template>
<script>
import Category from './Category.vue';
export default {
  components: {
   Category,
  },
  data() {
    return {

      AllVaults: [
        { text: "All Items", icon: "mdi-format-list-bulleted-type" },
        { text: "Favorites", icon: "mdi-star" },
        { text: "Frequently Used", icon: "mdi-heart" },
      ],

    };
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
  background-color: rgb(164, 166, 170);
  font-weight: bold;
  justify-content: center;
}
</style>