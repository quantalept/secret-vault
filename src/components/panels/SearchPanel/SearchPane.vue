<template>
  <v-card style="height:100%" color="primary">
    <v-row class="mt-4 ">
      <v-col cols="10">
        <v-text-field placeholder="Search Category..." bg-color="white" variant="solo"
          class="search-field"></v-text-field>
      </v-col>
      <v-col class="mt-2">
        <v-btn @click="dialog = true" variant="text" icon size="large" density="compact">
          <v-icon size="large" color="grey">mdi-plus-circle-outline</v-icon>
        </v-btn>
        <v-btn variant="text" icon class="ml-2" size="large" density="compact">
          <v-icon size="large" color="grey" @click="toggleIconVisibility">{{ currentIcon }}</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-list bg-color="primary">
      <v-list-item v-for="item in catalogueStore.catalogueListed" :key="item.id" elevation="1" class="listed-catalogue"
        :class="{ 'selected-item': isClicked(item.title) }" @click="selectCred(item)">
        <v-row>
          <v-list-item-title>
            <v-col>
              <v-icon :style="{ color: 'green' }">{{ item.icon }}</v-icon>
            </v-col>
          </v-list-item-title>
          <v-col>
            <v-list-item-title class="title"> {{ item.title }}</v-list-item-title>
            <v-list-item-title> {{ item.desc }} </v-list-item-title></v-col>
          <v-icon class="mr-5 mt-6" v-if="toggleIcon" @click="showDialog(item)">mdi-minus-circle-outline</v-icon>
        </v-row>
      </v-list-item>
    </v-list>
    <AddCatalogueDialog v-model="dialog" @add-item="addNewItem()" @cancel="closeDialog()" :validateExistence="validateExistence" />    
    <deleteDialog v-model="delete_Popup" @delete-confirm="deleteItem(selecteditem)" @cancel-delete="delete_Popup = false" />
  </v-card>
</template>
   
<script>
import { defineComponent, ref, onMounted, watchEffect, computed } from 'vue';
import { usecatalogueStore } from '../../../store/catalogueStore';
import AddCatalogueDialog from './Catalcreationdialog.vue';
import { getDBInstance } from '../../js/database';
import { insertCatalogueToDatabase, loadcatalogues, deleteFromDatabase } from '../../js/credentialStore'
import deleteDialog from '../Dialog/deleteDialog.vue';

export default defineComponent({
  props: {
    selectedCateId: Number,
    selectedCateTitle: String
  },

  components: {
    AddCatalogueDialog,    
    deleteDialog,

  },
  setup(props, { emit }) {
    const catalogueStore = usecatalogueStore();
    const dialog = ref(false);
    const selecteditem = ref("");
    const toggleIcon = ref(false);
    const delete_Popup = ref(false);    
    const icons = ref(["mdi-delete-circle-outline", "mdi-close-circle-outline"]);
    const currentIndex = ref(0);
      
    const currentIcon = computed(() => {
      return icons.value[currentIndex.value];
    });

    const toggleIconVisibility = () => {
      toggleIcon.value = !toggleIcon.value;
      currentIndex.value = (currentIndex.value + 1) % icons.value.length;
    };   
    

    const closeDialog = () => {
      dialog.value = false;      
      catalogueStore.clearCatalogueItem();      
    };

    const isClicked = (clicked_cs) => {
      return clicked_cs === selecteditem.value;
    };

    const showDialog = (selectedItem) => {
      selecteditem.value = selectedItem;
      delete_Popup.value = true;
    };  

    const deleteItem = async (selectedItem) => {
      if (selectedItem) {
        await deleteFromDatabase(selectedItem);
        delete_Popup.value = false;
      }
    }    

    const validateExistence = computed((value) => [      
      (value) =>
      !catalogueStore.catalogueListed.some(
          (item) => item.title === value) ||
        "Catalogue Already Exists!",
    ]); 
    const addNewItem = async (value) => {      
      if (catalogueStore.newItem.title.trim() && !catalogueStore.catalogueListed.some(item => item.title === catalogueStore.newItem.title.trim()))
      {
        await insertCatalogueToDatabase(selecteditem, selectCred, props.selectedCateId);
        catalogueStore.addCatalogueItem();
        closeDialog();
      }
    };
    
    const selectCred = async (selectedItem) => {
   
      try {
        const db = await getDBInstance();
        const result = await db.select(`
          SELECT cs_id FROM Credential_Store WHERE cs_name = ?
        `, [selectedItem.title]);
        if (result.length === 1) {
          const cs_id = result[0].cs_id;
          selecteditem.value = selectedItem.title;
          emit("catelogue-selected", cs_id, selectedItem.title);
          console.log(`selected function called for item: ${cs_id},Name: ${selectedItem.title}`);
        } else {
          console.error('Invalid or missing data for selected item.');
        }
      } catch (error) {
        console.error('Error retrieving cs_id from the database:', error);
      }
    };

    watchEffect(() => {
      loadcatalogues(props.selectedCateId);
    });

    onMounted(() => {
      loadcatalogues();
    })
    return {
      props,
      catalogueStore,
      addNewItem,
      dialog,
      closeDialog,
      selecteditem,
      isClicked,
      selectCred,
      toggleIcon,
      delete_Popup,
      toggleIconVisibility,
      showDialog,
      deleteItem,
      currentIcon,
      icons,           
      validateExistence,
      
    };
  },
});
</script>
<style scoped>
.search-field {
  margin-left: 2vh;
}

.listed-catalogue {
  margin-left: 2vh;
  margin-right: 17px;
  margin-bottom: 14px;
  height: 9vh;
}

.title {
  font-weight: bold;
  color: black;
}

.selected-item {
  border: 2px solid #6082b6;

}
</style>