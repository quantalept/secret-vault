<template>
  <v-list bg-color="primary">
    <v-list-subheader>Categories
      <v-icon size="large" @click="toggleIconVisibility()">mdi-delete-circle-outline</v-icon>
      <!-- <v-badge color="black" inline icon="mdi-delete"> </v-badge> -->
    </v-list-subheader>
    <v-list-item class="pl-14" v-for="(category, j) in categoriesStore.categories" :key="j" :value="category"
      @click="sharedCate(category)">
      <template v-slot:append>
        <v-badge color="grey" :content="CountByTitle(category.title)" inline></v-badge>
        <v-icon @click="showDialog(category)" v-if="toggleIcon">mdi-minus-circle-outline</v-icon>
      </template>
      <v-list-item-title :class="{ categoryselected: isSelected(category) }" @click="clickedCategory(category)">
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
        <v-text-field class="add-category" v-model="categoriesStore.newItem.title" label="Enter new submenu name"
          density="compact" ref="newCategory"></v-text-field>
        <div class="icons">
          <v-btn icon  size="large" @click="closefield()" class="mr-5"  density="compact" variant="text">
            <v-icon   color="grey">mdi-close</v-icon>
          </v-btn>
          <v-btn icon size="large" @click="addNewCategory"  density="compact" variant="text">
            <v-icon    color="grey">mdi-check</v-icon>
          </v-btn>
        </div>
      </template>
    </div>
    <v-dialog v-model="delete_dialog" max-width="400">
      <v-card>
        <v-card-title>Confirm Deletion</v-card-title>
        <v-card-text>
          Are you sure you want to delete this item?
        </v-card-text>
        <v-card-actions>
          <v-btn @click="deleteItem(selectedCategory)">Confirm</v-btn>
          <v-btn @click="cancelDelete">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-list>
</template>

<script>
import { ref } from 'vue';
import { getDBInstance } from '../../js/database';
import { usecategoriesStore } from '../../../store/categoryStore'
import { insertCategoryToDatabase } from '../../js/category'
import { deleteFromDatabase } from '../../js/category'


export default {
  setup(props, { emit }) {
    const selectedCategory = ref("");
    const categoriesStore = usecategoriesStore();
    const isAddingNewSubCate = ref(false);
    const toggleIcon = ref(false);
    const delete_dialog = ref(false);


    const toggleIconVisibility = () => {
      toggleIcon.value = !toggleIcon.value;
    };
    

    const addNewSubCate = () => {
      isAddingNewSubCate.value = true;
    };
    const closefield = () => {
      isAddingNewSubCate.value = false;
    };
    const addNewCategory = async () => {
      await insertCategoryToDatabase();
      categoriesStore.addCategory();
      isAddingNewSubCate.value = false;
    };
    const CountByTitle = (title) => {
      const cateItem = categoriesStore.cate_count.find((item) => item.category_name === title);
      return cateItem ? cateItem.Credential_Store_count : 0;
    };
    const sharedCate = async (selectedItem) => {
      try {
        const db = await getDBInstance();
        const result = await db.select(`
        SELECT category_id FROM Category WHERE category_name = ? 
        `, [selectedItem.title]);
        if (result.length === 1) {
          const cate_id = result[0].category_id;
          emit("category-selected", cate_id, selectedItem.title);
        } else {
          console.error('Invalid or missing data for selected item.');
        }
      } catch (error) {
        console.error('Error retrieving cs_id from the database:', error);
      }
    };


    const clickedCategory = (category) => {
      selectedCategory.value = category;
    };

    const isSelected = (clickedcategory) => {
      return clickedcategory === selectedCategory.value;
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
    }



    return {
      categoriesStore,
      clickedCategory,
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
      selectedCategory


    };
  },
};
</script>

<style scoped>
.v-list-subheader {
  color: black;
  font-size: 18px;
  background: #e5e4e2;
  font-weight: bold;
  justify-content: center;
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
</style>
