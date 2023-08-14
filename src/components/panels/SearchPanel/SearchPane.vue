<template>
  <v-card style="height:100%" color="primary">
    <v-row class="mt-4 ">
      <v-col md="10">
        <v-text-field placeholder="Search Category..." bg-color="white" variant="solo" class="search-field">
        </v-text-field></v-col>
        <v-col md="2">
        <v-btn @click="openDialog" icon="mdi-plus-circle-outline"> </v-btn>
      </v-col>
    </v-row>
    <v-list bg-color="primary">
      <v-list-item v-for="item in catalogueStore.Cataloguelisted" :key="item.id" elevation="1" class="listed-catalogue"
        :class="{ 'selected-catalogue': isClicked(catalogueStore) }"
        @click="clickedDesc(catalogueStore), selectCred(catalogueStore)">
        <v-row>
          <v-list-item-title>
            <v-col>
              <v-icon :style="{ color: 'green' }">{{ item.icon }}</v-icon>
            </v-col>
          </v-list-item-title>
          <v-col>
            <v-list-item-title style="font-weight: bold; color: black">
              {{ item.title }}</v-list-item-title>
            <v-list-item-title> {{ item.Desc }} </v-list-item-title>
          </v-col>
        </v-row>
      </v-list-item>
    </v-list>
    <v-dialog v-model="dialog" max-width="500">
      <add-catalogue-dialog />
      <v-btn @click="addNewItem">Add Item</v-btn>
    </v-dialog>
  </v-card>
</template>
   
<script>
import { defineComponent, ref } from 'vue';
import { usecatalogueStore } from '../../../store/catalogueStore';
import AddCatalogueDialog from './Catal creation.vue';
import { getDBInstance } from '../../js/database';

export default defineComponent({
  props: {
    selectedCategory: Object,
  },
  components: {
    AddCatalogueDialog,
  },
  setup(props, { emit }) {
    const catalogueStore = usecatalogueStore();
    const dialog = ref(false);
    const selectedDesc = ref("");

    const openDialog = () => {
      dialog.value = true;
    };

    const closeDialog = () => {
      dialog.value = false;

    };
    const clickedDesc = (clicked_desc) => {
      selectedDesc.value = clicked_desc;
    };

    const isClicked = (clickeddesc) => {
      return clickeddesc === selectedDesc.value;
    };

    const selectCred = (catalogueStore) => {
      emit("catelogue-selected", catalogueStore);
    };
    const addNewItem = () => {
      catalogueStore.addCatalogueItem(catalogueStore.newItem);
      catalogueStore.newItem.title = '';
      catalogueStore.newItem.Desc = '';
      closeDialog();
      insertCataloguesToDatabase();
    };
    const insertCataloguesToDatabase = async () => {
      try {
        const db = await getDBInstance();

        // Insert Catalogue into the database
        for (const catalogue of catalogueStore.Cataloguelisted) {
          await db.execute(`
            INSERT INTO Credential_Store (cs_name, secondary_info)
            VALUES (?, ?)
          `, [catalogue.title, catalogue.Desc]);
        }
        console.log('Catalogue inserted into the database successfully!');
      } catch (error) {
        console.error('Error inserting Catalogue into the database:', error);
      }
    };
    return {
      props,
      catalogueStore,
      addNewItem,
      dialog,
      openDialog,
      closeDialog,
      selectedDesc,
      clickedDesc,
      isClicked,
      selectCred,
    };
  },
});
</script>
<style scoped>
.search-field {
  margin-left: 4vh;
}

.listed-catalogue {
  margin-left: 8vh;
  margin-right: 8vh;
  margin-bottom: 14px;
  height: 8vh;
}
.selected-catalogue {
  border: 2px solid #6082b6;
}
</style>