<template>
  <v-list bg-color="primary">
    <v-list-subheader>Categories</v-list-subheader>
    <v-list-item
      class="pl-14"
      v-for="(category, j) in Categories"
      :key="j"
      :value="category"
      @click="selectCategory(category)"
    >
      <v-list-item-title
        :class="{ categoryselected: isSelected(category.title) }"
        @click="clickedCategory(category.title)"
      >
        {{ category.title }}
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script>
import { getDBInstance } from '../../js/database';

export default {
  data() {
    return {
      selectedCategory: "",
      Categories: [
        { title: "Site Credentials", icon: "icon-credentials.png" },
        { title: "Documents", icon: "icon-documents.png" },
        { title: "Form Data", icon: "icon-formdata.png" },
        { title: "Token API", icon: "icon-tokenapi.png" },
        { title: "Token Key", icon: "icon-tokenkey.png" },
      ],
    };
  },
  methods: {
    async insertCategoriesToDatabase() {
      try {
        const db = await getDBInstance();
        
        // Insert categories into the database
        for (const category of this.Categories) {
          await db.execute(`
            INSERT INTO Category (category_name, category_icon)
            VALUES (?, ?)
          `, [category.title, category.icon]);
        }
        console.log('Categories inserted into the database successfully!');
      } catch (error) {
        console.error('Error inserting categories into the database:', error);
      }
    },
    clickedCategory(category) {
      this.selectedCategory = category;
    },
    isSelected(clickedcategory) {
      return clickedcategory === this.selectedCategory;
    },
    selectCategory(category) {
      this.$emit("category-selected", category);
    },
  },
  created() {
    // Insert categories into the database
    this.insertCategoriesToDatabase();
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
</style>
