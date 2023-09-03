<template>
  <v-list bg-color="primary">
    <v-list-subheader>Categories</v-list-subheader>
    <v-list-item class="pl-14" v-for="(category, j) in categoriesStore.categories" :key="j" :value="category"
      @click="selectedCategory(category)">
      <v-list-item-title 
      :class="{ categoryselected: isSelected(category) }" 
       @click="clickedCategory(category)">
        {{ category.title }}
      </v-list-item-title>
    </v-list-item>
    <div class="add-category">
      <v-text-field v-model="newCategory.title" density="compact"></v-text-field>
      <v-btn @click="addNewCategory" density="comfortable" icon="mdi-plus"></v-btn>
    </div>
  </v-list>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getDBInstance } from '../../js/database';
import { usecategoriesStore } from '../../../store/categoryStore'

export default {
  setup() {
    const selectedCategory = ref("");
    const categoriesStore = usecategoriesStore();
    const newCategory = ref({
      title: "",
      icon: "default-icon.png"
    });

    const insertCategoryToDatabase = async (category) => {
      try {
        const db = await getDBInstance();

        // Insert the category into the database
        await db.execute(`
          INSERT INTO Category (category_name, category_icon)
          VALUES (?, ?)
        `, [category.title, category.icon]);
        console.log('Category inserted into the database successfully!');
      } catch (error) {
        console.error('Error inserting category into the database:', error);
      }
    };

    const loadCategoriesFromDatabase = async () => {
      try {
        const db = await getDBInstance();
        const rows = await db.select(`
            SELECT * FROM Category
        `);
        const loadedCategoryTitles = new Set();
        for (let row of rows) {
          const category = { title: row.category_name, icon: row.category_icon };
          categoriesStore.addCategory(category);
          loadedCategoryTitles.add(category.title);
        }
        const defaultCategories = categoriesStore.defaultcateg;

        for (let defaultCategory of defaultCategories) {
          if (!loadedCategoryTitles.has(defaultCategory.title)) {
            categoriesStore.addCategory(defaultCategory);
            await insertCategoryToDatabase(defaultCategory);
          }
        }
        console.log('Categories loaded from the database and default categories added.');
      } catch (error) {
        console.error('Error loading categories from the database:', error);
      }
    };

    const clickedCategory = (category) => {
      selectedCategory.value = category;
    };

    const isSelected = (clickedcategory) => {
      return clickedcategory === selectedCategory.value;
    };

    const addNewCategory = async () => {
      if (newCategory.value.title.trim() !== "") {
        const addedCategory = { ...newCategory.value };
        categoriesStore.addCategory(addedCategory);
        await insertCategoryToDatabase(addedCategory);
        newCategory.value.title = "";
      }
    };
    onMounted(() => {
     loadCategoriesFromDatabase();
    })

    return {
      selectedCategory,
      categoriesStore,
      newCategory,
      clickedCategory,
      isSelected,
      addNewCategory,
     

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

.add-category {
  display: flex;
}

.add-category v-text-field {
  margin-right: 10px;
}
</style>
