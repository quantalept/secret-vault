<template>
    <v-list bg-color="#f5f5f5">
        <v-list-subheader>Categories</v-list-subheader>
        <v-list-item class="pl-14" v-for="(category, j) in Categories" :key="j" :value="category" color="rgb(49, 49, 204)">
            <v-list-item-title
            
            >{{ category.title }}</v-list-item-title>
        </v-list-item>
    </v-list>
</template>
<script>
export default {

    data() {
        return {
            Categories: [
                { title: "All Categories" },
                { title: "Site Credentials" },
                { title: "Documents" },
                { title: "Form Data" },
                { title: "Token API" },

            ],
        };
    }
}
</script>
<style scoped>


.v-list-subheader {
    color: black;
    font-size: 18px;
    background: rgb(164, 166, 170);
    font-weight: bold;
    justify-content: center;
}
.categoryselected {
  color: rgb(49, 49, 204);
  font-weight: bold;
  font-size: 18px;
}
</style>