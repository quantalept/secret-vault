<template>
  <div>
    <v-card>
      <v-card-text>
        <v-text-field v-model="catalogueStore.newItem.title" label="Title"></v-text-field>
        <v-text-field v-model="catalogueStore.newItem.Desc" label="Description" ></v-text-field>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { usecatalogueStore } from '../../../store/catalogueStore'; // Make sure the import path is correct

export default defineComponent({
  setup() {
    const catalogueStore = usecatalogueStore();

    return {
      catalogueStore,
    };
  },
});
</script>