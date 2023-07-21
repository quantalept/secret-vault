<template>
  <v-card style="height: 79%" color="primary">
    <v-list bg-color="primary">
      <v-list-subheader>Categories</v-list-subheader>
      <v-list-item
        class="pl-14"
        v-for="(category, j) in Categories"
        :key="j"
        :value="category"
        @click="selectItem(category)"
      >
        <v-list-item-title
          :class="{ categoryselected: isSelected(category.title) }"
          @click="clickedCategory(category.title)"
        >
          {{ category.title }}</v-list-item-title
        >
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      selectedCategory: "",
      Categories: [
        { title: "Site Credentials" },
        { title: "Documents" },
        { title: "Form Data" },
        { title: "Token API" },
        { title: "Token Key" },
      ],
    };
  },
  methods: {
    clickedCategory(category) {
      this.selectedCategory = category;
    },
    isSelected(clickedcategory) {
      return clickedcategory === this.selectedCategory;
    },
    selectItem(category) {
      this.$emit("item-selected", category);
    },
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
