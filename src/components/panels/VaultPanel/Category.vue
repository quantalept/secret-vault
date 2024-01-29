<template>
  <v-list bg-color="primary">
    <v-list-subheader>Categories
      <v-icon size="large" @click="toggleIconVisibility">mdi-delete-circle-outline</v-icon>
      <!-- <v-badge color="black" inline icon="mdi-delete"> </v-badge> -->
    </v-list-subheader>
    <v-list-item class="pl-14" v-for="(category, j) in categoriesStore.categories" :key="j" :value="category"
      @click="sharedCate(category)">
      <template v-slot:append>
        <v-badge color="grey" :content="CountByTitle(category.title)" inline></v-badge>
        <v-icon @click="delete_cate(category)" v-if="toggleIcon">mdi-minus-circle-outline</v-icon>
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
          <v-btn icon @click="addNewCategory" size="small">
            <v-icon md="2">mdi-check</v-icon>
          </v-btn>
        </div>
      </template>
    </div>
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


    const toggleIconVisibility = () => {
      toggleIcon.value = !toggleIcon.value;
    };
    const delete_cate = (selectedItem) => {
      deleteFromDatabase(selectedItem)
    };

    const addNewSubCate = () => {
      isAddingNewSubCate.value = true;
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



    return {
      categoriesStore,
      clickedCategory,
      isSelected,
      addNewCategory,
      sharedCate,
      addNewSubCate,
      isAddingNewSubCate,
      CountByTitle,
      deleteFromDatabase,
      toggleIconVisibility,
      toggleIcon,
      delete_cate
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
