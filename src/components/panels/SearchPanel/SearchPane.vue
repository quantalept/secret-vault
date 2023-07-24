<template>
  <v-card style="height: 100%" color="primary">
    <v-col>
      <v-text-field
        placeholder="Search Category..."
        bg-color="white"
        variant="solo"
        class="search-field"
      ></v-text-field>
    </v-col>
    <v-list bg-color="primary" v-if="selectedCategory">
      <v-list-item
        v-for="(Catelogues, index) in ListedCatalogue"
        :key="index"
        elevation="1"
        class="listed-catalogue"
        :class="{ 'selected-catalogue': isClicked(Catelogues) }"
        @click="clickedDesc(Catelogues), selectCred(Catelogues)"
      >
        <v-row>
          <v-list-item-title>
            <v-col>
              <v-list-item-icon>
                <v-icon :icon="Catelogues.icon"></v-icon>
              </v-list-item-icon>
            </v-col>
          </v-list-item-title>
          <v-col>
            <v-list-item-title style="font-weight: bold; color: black">
              {{ Catelogues.title }}</v-list-item-title
            >
            <v-list-item-title> {{ Catelogues.Desc }} </v-list-item-title>
          </v-col>
        </v-row>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script>
export default {
  props: {
    selectedCategory: Object,
  },
  data() {
    return {
      selectedDesc: "",
      ListedCatalogue: [
        {
          title: "Netflix",
          Desc: "Website: https://netflix.com",
          icon: "mdi-alpha-n",
        },
        {
          title: "Server DB",
          Desc: "Credential",
          icon: "mdi-alpha-s",
        },
        {
          title: "Google",
          Desc: "Website: https://gmail.com",
          icon: "mdi-alpha-g",
        },
        {
          title: "API Token",
          Desc: "token",
          icon: "mdi-alpha-a",
        },
      ],
    };
  },
  methods: {
    clickedDesc(clicked_desc) {
      this.selectedDesc = clicked_desc;
    },
    isClicked(clickeddesc) {
      return clickeddesc === this.selectedDesc;
    },
    selectCred(Catelogues) {
      this.$emit("catelogue-selected", Catelogues);
    },
  },
};
</script>
<style scoped>
.listed-catalogue {
  margin-left: 8vh;
  margin-right: 8vh;
  margin-bottom: 14px;
  height: 8vh;
}
.selected-catalogue {
  border: 2px solid #6082b6;
}
.search-field{
  margin-left: 4vh;
  margin-right: 4vh;
}
</style>