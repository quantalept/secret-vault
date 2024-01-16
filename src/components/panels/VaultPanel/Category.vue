<template>
  <v-list bg-color="primary">
    <v-list-subheader>Categories</v-list-subheader>
    <v-list-item class="pl-14" v-for="(category, j) in categoriesStore.categories" :key="j" :value="category"
      @click="sharedCate(category)">
      <v-list-item-title :class="{ categoryselected: isSelected(category) }" @click="clickedCategory(category)">
        {{ category.title }}
      </v-list-item-title>
    </v-list-item>
    <div>
    <div v-if="!isAddingNewSubCate" class="icons">
      <v-btn icon @click="addNewSubCate" >
        <v-icon >mdi-plus</v-icon>
      </v-btn>
    </div>
    <template v-if="isAddingNewSubCate">
      <v-text-field class="add-category" v-model="categoriesStore.newItem.title" label="Enter new submenu name" density="compact"
        ref="newCategory"></v-text-field>
        <div class="icons">
      <v-btn icon @click="addNewCategory" >
        <v-icon md="2">mdi-check</v-icon>
      </v-btn></div>
    </template>
    </div>
    <!-- <div class="add-category">
      <v-text-field v-model="newCategory.title" density="compact"></v-text-field>
      <v-btn @click="addNewCategory" density="comfortable" class="mt-5  ml-2" icon="mdi-plus"></v-btn>      
    </div> -->
  </v-list>
</template>

<script>
import { ref, onMounted, nextTick,reactive } from 'vue';
import { getDBInstance } from '../../js/database';
import { usecategoriesStore } from '../../../store/categoryStore'

export default {
  setup(props, { emit }) {
    const selectedCategory = ref("");
    const categoriesStore = usecategoriesStore();
    const isAddingNewSubCate = ref(false);
    const addNewSubCate = () => {
      isAddingNewSubCate.value = true;
    };
    const addNewCategory = async () => {
      await insertCategoryToDatabase();
      categoriesStore.addCategory();
      isAddingNewSubCate.value = false;
    };

    const insertCategoryToDatabase = async (category) => {
      try {
        const db = await getDBInstance();

        // Insert the category into the database
        await db.execute(`
          INSERT INTO Category (category_name, category_icon)
          VALUES (?, ?)
        `, [categoriesStore.newItem.title, categoriesStore.newItem.icon]);
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
        for (let row of rows) {
          categoriesStore.categories.push({ id: row.id, title:row.category_name, icon:row.category_icon})
        }
        // const loadedCategoryTitles = new Set();
        // for (let row of rows) {
        //   const cate = { id: row.id, title: row.category_name, icon: row.category_icon };
        //   categoriesStore.addCategory();
        //   loadedCategoryTitles.add(cate.title);
        // }
        // const defaultCategories = categoriesStore.defaultcateg;

        // for (let defaultCategory of defaultCategories) {
        //   if (!loadedCategoryTitles.has(defaultCategory.title)) {
        //     categoriesStore.addCategory(defaultCategory);
        //     await insertCategoryToDatabase(defaultCategory);
        //   }
        // }
        console.log('Categories loaded from the database and default categories added.');
      } catch (error) {
        console.error('Error loading categories from the database:', error);
      }
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
          console.log(`clicked category: ${cate_id},Name: ${selectedItem.title}`);
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


    // onMounted(async () => {
    //   await loadCategoriesFromDatabase();
    //   $nextTick(() => {
    //     if (newCategory.value) {
    //       newCategory.value.title = "";
    //       newCategory.value.focus();
    //     }
    //   });

    // })
    onMounted(async () => {
      await loadCategoriesFromDatabase()
      //.then(() => {
      //   nextTick(() => {
      //     if(newCategory.value) {
      //       newCategory.value.title = "";
      //       newCategory.value.focus();
      //     }
      //   });
      // });
    });

    return {
      categoriesStore,
      clickedCategory,
      isSelected,
      addNewCategory,
      sharedCate,
      addNewSubCate,
      isAddingNewSubCate
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
