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
      <v-list-item v-for="item in catalogueStore.catalogueListed" :key="item.id" elevation="1" class="listed-catalogue"
        :class="{ 'selected-catalogue': isClicked(item) }" @click="clickedDesc(item), selectCred(item)">
        <v-row>
          <v-list-item-title>
            <v-col>
              <v-icon :style="{ color: 'green' }">{{ item.icon }}</v-icon>
            </v-col>
          </v-list-item-title>
          <v-col>
            <v-list-item-title style="font-weight: bold; color: black">
              {{ item.title }}</v-list-item-title>
            <v-list-item-title> {{ item.desc }} </v-list-item-title>
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
import { defineComponent, ref, onMounted } from 'vue';
import { usecatalogueStore } from '../../../store/catalogueStore';
import AddCatalogueDialog from './Catalcreationdialog.vue';
import { getDBInstance } from '../../js/database';

export default defineComponent({

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

    const addNewItem = async () => {
      await insertCatalogueToDatabase();
      closeDialog();
      catalogueStore.addCatalogueItem();
    };
    // Insert Catalogue into the database////
    const insertCatalogueToDatabase = async () => {
      try {
        const db = await getDBInstance();
        const row = await db.execute(`
            INSERT INTO Credential_Store (cs_name, secondary_info)
            VALUES (?, ?)
          `, [catalogueStore.newItem.title, catalogueStore.newItem.desc]);
        catalogueStore.newItem.id = row.lastInsertId;
        console.log('Catalogue inserted into the database successfully!');
      } catch (error) {
        console.error('Error inserting Catalogue into the database:', error);
      }
    };
    ////Load Catalogues items..///
    const loadcatalogues = async () => {
      try {
        const db = await getDBInstance();
        const rows = await db.select(`
        SELECT * FROM Credential_Store
        `);
        for (let row of rows) {
          catalogueStore.catalogueListed.push({ id: row.id, title: row.cs_name, desc: row.secondary_info })
        }
      } catch (error) {
        console.error('Error loading Catalogue into the database:', error);
      }
    };
    ////Passing csid ..///
    const selectCred = async (selectedItem) => {
      try {
        const db = await getDBInstance();
        const result = await db.select(`
          SELECT cs_id FROM Credential_Store WHERE cs_name = ?
        `, [selectedItem.title]);

        if (result.length === 1) {
          const cs_id = result[0].cs_id;
          emit("catelogue-selected", cs_id, selectedItem.title);
        } else {
          console.error('Invalid or missing data for selected item.');
        }
      } catch (error) {
        console.error('Error retrieving cs_id from the database:', error);
      }
    };

    onMounted(() => {
      loadcatalogues();
    })
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