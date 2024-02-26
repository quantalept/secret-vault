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
    <AddCatalogueDialog v-model="dialog" @add-item="addNewItem" @cancel="closeDialog"/>
    <Dialog v-model="mdialog" :dialogTitle="dialogMessage" @msg-dialog="closemDialog" />   
    <deleteDialog v-model="delete_dialog" @delete-confirm="deleteItem(selecteditem)" @cancel-delete="cancelDelete"/>    
  </v-card>
</template>
   
<script>
import { defineComponent, ref, onMounted, watchEffect } from 'vue';
import { usecatalogueStore } from '../../../store/catalogueStore';
import AddCatalogueDialog from './Catalcreationdialog.vue';
import { getDBInstance } from '../../js/database';
import { insertCatalogueToDatabase,loadcatalogues,deleteFromDatabase } from '../../js/credentialStore'
import  Dialog from '../Dialog.vue';
import deleteDialog from '../deleteDialog.vue';

export default defineComponent({
  props: {
    selectedCateId: Number,
    selectedCateTitle: String
  },

  components: {
    AddCatalogueDialog,
    Dialog,
    deleteDialog,

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
      catalogueStore.clearCatalogueItem();
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