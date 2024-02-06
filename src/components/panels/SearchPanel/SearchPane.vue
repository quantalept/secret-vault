<template>
  <v-card style="height:100%" color="primary">
    <v-row class="mt-4 ">
      <v-col cols="10">
        <v-text-field placeholder="Search Category..." bg-color="white" variant="solo" class="search-field"></v-text-field>
      </v-col>
      <v-col class="mt-2">
        <v-btn @click="openDialog" variant="text" icon size="large" density="compact" >
          <v-icon size="large" color="grey">mdi-plus-circle-outline</v-icon>
         </v-btn>
        <v-btn variant="text" icon class="ml-2" size="large" density="compact" >
          <v-icon size="large" color="grey" @click="toggleIconVisibility">{{ currentIcon }}</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-list bg-color="primary">
      <v-list-item v-for="item in catalogueStore.catalogueListed" 
        :key="item.id" 
         elevation="1" 
         class="listed-catalogue"
        :class="{ 'selected-item': isClicked(item) }" 
        @click="clickedcs(item),selectCred(item)">
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
    <v-dialog v-model="dialog" max-width="500">
      <add-catalogue-dialog />
      <v-card>
        <v-row justify="center" class="mb-3 mt-3">
          <v-btn variant="text" @click="closeDialog">Cancel</v-btn>
          <v-btn variant="text" @click="addNewItem">Add Item</v-btn>
        </v-row>
      </v-card>
      <v-dialog v-model="mdialog" max-width="500">
      <v-card>
        <v-card-title>{{ dialogMessage }}</v-card-title>
          <v-card-actions>
            <v-btn class="btn-align" @click="closemDialog">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-dialog>

    <v-dialog v-model="delete_dialog" max-width="400">
      <v-card>
        <v-card-title>Confirm Deletion</v-card-title>
        <v-card-text>
          Are you sure you want to delete this item?
        </v-card-text>
        <v-card-actions>
          <v-btn @click="deleteItem(selecteditem)">Confirm</v-btn>
          <v-btn @click="cancelDelete">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
   
<script>
import { defineComponent, ref, onMounted, watchEffect } from 'vue';
import { usecatalogueStore } from '../../../store/catalogueStore';
import AddCatalogueDialog from './Catalcreationdialog.vue';
import { getDBInstance } from '../../js/database';
import { insertCatalogueToDatabase,loadcatalogues,deleteFromDatabase } from '../../js/credentialStore'


export default defineComponent({
  props: {
    selectedCateId: Number,
    selectedCateTitle: String
  },

  components: {
    AddCatalogueDialog,

  },
  setup(props, { emit }) {
    const catalogueStore = usecatalogueStore();
    const dialog = ref(false);
    const selecteditem = ref("");
    const toggleIcon = ref(false);
    const delete_dialog = ref(false);
    const currentIcon = ref("mdi-delete-circle-outline");
    const delIcon = ref("mdi-delete-circle-outline");
    const checkIcon = ref("mdi-close-circle-outline");
    const dialogMessage = ref("");
    const mdialog = ref(false);

    const toggleIconVisibility = () => {
      toggleIcon.value = !toggleIcon.value;
      currentIcon.value =
      currentIcon.value === delIcon.value ? checkIcon.value : delIcon.value;
    };
    const showmDialog = (mtitle) => {
      dialogMessage.value = mtitle;         
      openmDialog();     
      };

    const openmDialog = () => {
      mdialog.value = true;
    };
    const closemDialog = () => {
      mdialog.value = false;       
    };

    const openDialog = () => {
      dialog.value = true;
    };

    const closeDialog = () => {
      dialog.value = false;      
    };
    const clickedcs = (clicked_cs) => {
      selecteditem.value = clicked_cs;
    };

    const isClicked = (clicked_cs) => {
      return clicked_cs === selecteditem.value;
    };

    const addNewItem = async () => {
      if (catalogueStore.newItem.title.trim() !== "") {
        const db = await getDBInstance();
        const result_ui = await db.select(
          `
         SELECT * FROM Credential_Store 
         WHERE cs_name = ?
         `,
          [catalogueStore.newItem.title]
        );
        if (result_ui.length === 0) {          
          await insertCatalogueToDatabase(selecteditem, selectCred, props.selectedCateId);
          catalogueStore.addCatalogueItem();
          closeDialog();
        } else {                    
          showmDialog("Catalogue Title is already exists!");
        }
        } else {        
          showmDialog("Empty data is not allowed");
        }
    };

    watchEffect(() => {
      loadcatalogues(props.selectedCateId);
    });

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
          console.log(`selected function called for item: ${cs_id},Name: ${selectedItem.title}`);
        } else {
          console.error('Invalid or missing data for selected item.');
        }
      } catch (error) {
        console.error('Error retrieving cs_id from the database:', error);
      }
    };
    const showDialog = (selectedItem) => {
      selecteditem.value = selectedItem;
      delete_dialog.value = true;
    };
    const cancelDelete = () => {
      delete_dialog.value = false;
    };
    const deleteItem = async (selectedItem) => {
      if (selectedItem) {
        await deleteFromDatabase(selectedItem);
        delete_dialog.value = false; 
    }
    }

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
      selecteditem,
      clickedcs,
      isClicked,
      selectCred,
      toggleIcon,
      delete_dialog,
      toggleIconVisibility,
      showDialog,
      deleteItem,
      cancelDelete,

      currentIcon,
      delIcon,
      checkIcon,
      showmDialog,
      mdialog,
      closemDialog,
      dialogMessage,

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