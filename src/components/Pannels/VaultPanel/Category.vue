<template>
    <v-list bg-color="primary">
        <v-list-subheader>Categories</v-list-subheader>
        <v-list-item class="pl-14" v-for="(category, j) in categoryData.Categories" :key="j" :value="category">
            <v-list-item-title :class="{ 'categoryselected': isSelected(category.title) }"
                @click="clickedCategory(category.title)"> {{ category.title }}</v-list-item-title>
        </v-list-item>
    </v-list>
</template>

<script>
export default {
    setup() {
        let selectedCategory;
        const categoryData = {
            Categories: [
                { title: "All Categories" },
                { title: "Site Credentials" },
                { title: "Documents" },
                { title: "Form Data" },
                { title: "Token API" },

            ],
        }
        const isSelected = (clickedcategory) => {
            return clickedcategory === selectedCategory;
        }

        const clickedCategory = (category) => {
            selectedCategory = category;
        }
        return {
            categoryData,
            isSelected,
            clickedCategory,
        }
    }
}
</script>
<style scoped>
.v-list-subheader {
    color: black;
    font-size: 18px;
    background: #E5E4E2;
    font-weight: bold;
    justify-content: center;
}

.categoryselected {
    font-weight: bold;
    color: rgb(49, 49, 204);

}
</style>