<template>
  <v-list bg-color="primary">
    <v-list-subheader>
      <v-row>
        <v-col class="category-class"> Categories </v-col>
        <v-col class="icon-align">
          <v-icon size="x-large" @click="toggleIconVisibility"
            >mdi-pencil-circle-outline</v-icon
          >
        </v-col>
      </v-row>
    </v-list-subheader>
    <div class="scroll-bar">      
      <v-list-item
        class="pl-14"
        v-for="(category, j) in categoriesStore.categories"
        :key="j"
        :value="category"
        @click="sharedCate(category)">
        <template v-slot:append>
          <v-badge
            color="grey"
            :content="CountByTitle(category.title)"
            inline>
          </v-badge>
          <v-icon @click="showDialog(category)" v-if="toggleIcon">mdi-minus-circle-outline</v-icon>
        </template>        
        <v-list-item-title
          :class="{ categoryselected: isSelected(category.title) }" >
          {{ category.title }}
        </v-list-item-title>        
      </v-list-item>
      <div>
        <div v-if="!isAddingNewSubCate" class="icons">
          <v-btn icon @click="addNewSubCate" size="small">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
        <template v-if="isAddingNewSubCate">
          <v-text-field
            class="add-category"
            v-model="categoriesStore.newItem.title"
            label="Enter new submenu name"
            density="compact"
            ref="newCategory"
          ></v-text-field>
          <div class="icons">
            <v-btn
              icon
              size="large"
              @click="closefield()"
              class="mr-5"
              density="compact"
              variant="text"
            >
              <v-icon color="grey">mdi-close</v-icon>
            </v-btn>
            <v-btn
              icon
              size="large"
              @click="addNewCategory"
              density="compact"
              variant="text"
            >
              <v-icon color="grey">mdi-check</v-icon>
            </v-btn>
          </div>          
          <Dialog v-model="mdialog" :dialogTitle="dialogMessage" @click="closemDialog" />
        </template>
      </div>
    </div>    
    <deleteDialog v-model="delete_dialog" @delete-confirm="deleteItem(selectedCategory)" @cancelDelete="cancelDelete" />
  </v-list>
</template>

<script>
import { ref } from "vue";
import { getDBInstance } from "../../js/database";
import { usecategoriesStore } from "../../../store/categoryStore";
import { insertCategoryToDatabase, loadCategoriesFromDatabase } from "../../js/category";
import { deleteFromDatabase } from "../../js/category";
import Dialog from "../Dialog.vue";
import deleteDialog from '../deleteDialog.vue';

export default {
  components: {
    Dialog,
    deleteDialog,
  },

  setup(props, { emit }) {
    const selectedCategory = ref("");
    const categoriesStore = usecategoriesStore();
    const isAddingNewSubCate = ref(false);
    const toggleIcon = ref(false);
    const delete_dialog = ref(false);
    const dialogMessage = ref("");
    const mdialog = ref(false);
    
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
    const toggleIconVisibility = () => {
      toggleIcon.value = !toggleIcon.value;
    };

    const addNewSubCate = () => {
      isAddingNewSubCate.value = true;
    };
    const closefield = () => {
      isAddingNewSubCate.value = false;
      categoriesStore.clearCategory();
    };

    const addNewCategory = async () => {
      if (categoriesStore.newItem.title.trim() !== "") {
        const db = await getDBInstance();
        const result_ui = await db.select(
          `
      SELECT * FROM Category 
      WHERE category_name = ? 
      `,
          [categoriesStore.newItem.title]
        );
        if (result_ui.length === 0) {
          await insertCategoryToDatabase();
          isAddingNewSubCate.value = false;
          loadCategoriesFromDatabase();
          categoriesStore.clearCategory();
        } else {
          showmDialog("Category is already exists!");
        }
      } else {
        showmDialog("Empty data is not allowed");
      }
    }; 

    const CountByTitle = (title) => {
      const cateItem = categoriesStore.cate_count.find(
        (item) => item.category_name === title
      );
      return cateItem ? cateItem.Credential_Store_count : 0;
    };
     
    const sharedCate = async (selectedItem) => {
      try {
        const db = await getDBInstance();
        const result = await db.select(
          `
        SELECT category_id FROM Category WHERE category_name = ? 
        `,
          [selectedItem.title]
        );
        if (result.length === 1) {
          const cate_id = result[0].category_id;
          selectedCategory.value=selectedItem.title;
          emit("category-selected", cate_id, selectedItem.title);
        } else {
          console.error("Invalid or missing data for selected item.");
        }
      } catch (error) {
        console.error("Error retrieving cs_id from the database:", error);
      }
    };
    
    // const clickedCategory = (category) => {
    //   selectedCategory.value = category;
    // };

    const isSelected = (clicked_category) => {
      return clicked_category === selectedCategory.value;
    };
   

    const showDialog = (selectedItem) => {
      selectedCategory.value = selectedItem;
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
    };

    return {
      categoriesStore,
      //clickedCategory,
      isSelected,
      addNewCategory,
      sharedCate,
      addNewSubCate,
      isAddingNewSubCate,
      CountByTitle,
      toggleIconVisibility,
      toggleIcon,
      delete_dialog,
      closefield,
      showDialog,
      cancelDelete,
      deleteItem,
      selectedCategory,

      showmDialog,
      mdialog,
      closemDialog,
      dialogMessage,
    };
  },
};
</script>

<style scoped>
.category-class {
  color: black;
  font-size: 18px;
  font-weight: bold;
  margin-left: 80px;
}
.icon-align {
  margin-left: 56px;
}
.v-list-subheader {
  background: #e5e4e2;
}

.categoryselected {
  font-weight: bold;
  color: rgb(49, 49, 204);
}

.add-category v-text-field {
  margin-right: px;
}

.icons {
  text-align: center;
}

.scroll-bar {
  height: calc(60vh - 20px);
  overflow-y: scroll;
}
</style>
