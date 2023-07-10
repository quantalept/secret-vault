<template>
  <v-container class='main-container'>
    <v-row style="height:100%">
      <!-- column - 1 ----------------------------------------------------------------------------------------------->
      <v-col md='2' class='pa-0'>
        <v-card style="height: 100%" class='card__all-vaults'>
          <v-list>
            <div>
              <v-list-subheader class='justify-center'>ALL VAULTS</v-list-subheader>
            </div>
            <v-list-item v-for="(vault, i) in AllVaults" :key="i" :value="vault" active-color="rgb(0,0,0)">
              <template v-slot:prepend>
                <v-icon :icon="vault.icon"></v-icon>
              </template>
              <v-list-item-title>{{ vault.text }}</v-list-item-title>
            </v-list-item>

            <br />

            <v-list-subheader class='justify-center'>Categories</v-list-subheader>
            <v-list-item class='pl-16' v-for="(category, j) in Categories" :key="j" :value="category"
              :color="isSelected(category.title) ? 'rgb(255,255,255)' : ''" @click="clickedCategory(category.title)">
              <v-list-item-content>
                <v-list-item-title>{{ category.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

          </v-list>
        </v-card>
      </v-col>

      <!-- column - 2 ---------------------------------------------------------------------------------------------->
      <v-col md="4" class='pa-0'>
        <v-card class='card__categories' height="100%">
          <v-row class="pa-5">
            <v-text-field placeholder="Search Items..." v-model="searchQuery" bg-color="white">
            </v-text-field>
          </v-row>
          <!-- search section starts ************************************** -->

          <div v-if="searchResults.length > 0">
            <v-list>
              <v-list-item v-for="search_item in searchItem" :key="search_item">
                <v-list-item-title>{{ search_item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </div>

          <!-- search section ends ************************************** -->

          <v-list-item-group v-if="selectedCategory !== ''">
            <v-list-item 
              
              v-for="(CategoryDesc, index) in Category_Description" :key="index"
              
              elevation="1" 
              class="SelectedTile" 
              active-class="SelectedTile-active"
              :class="{'selected': isClicked(CategoryDesc)}" 
              @click="clickedDesc(CategoryDesc), groupOpened='true'">

              <v-row class='card__categories_description'>
                <v-list-item-title>
                  <v-col md="2">
                    <v-list-item-icon>

                      <v-icon :icon="CategoryDesc.icon"></v-icon>

                    </v-list-item-icon>
                  </v-col>
                </v-list-item-title>

                <v-col md="6">
                  <v-list-item-title>
                    {{ CategoryDesc.title }}
                  </v-list-item-title>
                  <v-list-item-title>
                    {{ CategoryDesc.Desc }}
                  </v-list-item-title>
                </v-col>
              </v-row>
              <divider> </divider>


            </v-list-item>

          </v-list-item-group>
        </v-card>
      </v-col>

      <!-- column - 3 ---------------------------------------------------------------------------------------------->
      <v-col md="6" class='pa-0'>
        <credential-pane />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";
import CredentialPane from './CredentialPane.vue';
export default {
  components:{
    CredentialPane
  },
  data() {
    return {
      selectedCategory: "",
      groupOpened: false,
      show1: false,
      isFavorite: false,
      searchQuery: "",
      searchResults: [],
      NewUsers: [],
      FavoriteList: [],
      textFields: [],
      newField:null,
      newTitle:null,
      UserName: null,
      password: null,      
      Title: "",
      currentcolor: '',
      selectedDesc: "",
      AllVaults: [
        { text: "All Items", icon: "mdi-format-list-bulleted-type" },
        { text: "Favorites", icon: "mdi-star" },
        { text: "Frequently Used", icon: "mdi-heart" },
      ],
      Categories: [
        { title: "All Categories" },
        { title: "Site Credentials" },
        { title: "Documents" },
        { title: "Form Data" },
        { title: "Token API" },
        { title: "Token Key" },
        
      ],
      Category_Description: [
        {
          title: "Netflix",
          Desc: "website:https://netflix.com",
          icon: "mdi-alpha-n",
        },
        { title: "Server DB", 
          Desc: "Credential", 
          icon: "mdi-alpha-s" },
        {
          title: "Google",
          Desc: "website:https://gmail.com",
          icon: "mdi-alpha-g",
        },
        { title: "API Token", 
          Desc: "token", 
          icon: "mdi-alpha-a" },
      ],
    };
  },
  methods: {
    clickedCategory(clicked_category) {
      this.selectedCategory = clicked_category;
      console.log("selected category is+++ " + this.selectedCategory);
    },
    isSelected(clickedcategory) {      
      return clickedcategory === this.selectedCategory;
    },

    textColor(fontcolor) {
      return fontcolor == this.currentcolor ? "green" : "";
    },    
    addTextField() {
      this.textFields.push({ newTitle:'',newField: '' });
      console.log(this.textFields);
    },
    saveUser() {
      if (this.UserName && this.password) {
        this.NewUsers.push({
          UserName: this.UserName,
          password: this.password,
          newField: this.newField,
          newTitle: this.newTitle,

        });

        this.UserName = null
        this.password = null  
        this.newField=null
        this.newTitle=null      
        console.log(this.NewUsers);
      }
      else console.log("user name and password is empty");
    },
    hideUser() {
      console.log("you clicked the hide function");
      this.groupOpened = false;
    },
    addtoFavorite(user) {
      this.isFavorite = !this.isFavorite;
    },
  clickedDesc(clicked_desc) {
      //this.groupOpened='true';
    this.selectedDesc = clicked_desc;
    console.log("selected description is+++ " + this.selectedDesc);
    },
  isClicked(clickeddesc) {    
    //this.groupOpened='true';  
    return clickeddesc === this.selectedDesc;
  },
  },
  computed: {
    searchItem() {
      return this.Categories.filter((item) =>
        item.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
};
</script>
<style scoped>
.v-main .main-container {
  margin-top: 0px;
  height: calc(100vh - 35px);
  padding: 0px;
}

.v-list-subheader {
  color: black;
  font-size: 18px;
  background: rgb(176, 196, 222);
  font-weight: bold;
}

.card__all-vaults {
  border-left: 2px solid #848884;
  background-color: darkgrey;

}

.card__categories {
  margin-left: 0px;
  border-left: 2px solid #848884;
  background-color: rgb(192, 192, 192);
}

.card__credential {
  border-left: 2px solid#848884;
  border-right: 2px solid #848884;
  background-color: rgb(224, 224, 224);
}

.v-list {
  background-color: darkgrey;
  border: 2px;
}

.card__credential_label {
  font-weight: bold;
  color: rgb(0, 0, 0);
}

.title-field {
  margin-top: 2px;
  margin-bottom: 2px;
  margin-left: 53px;
  margin-right: -37px;
  font-weight: bold;
  color: black;
}

.user-field {
  margin-top: 18px;
  margin-left: 1px;
  margin-right: 13px;
  font-weight: bold;
  color: black;
}

.password-field {
  margin-top: -10px;
  margin-left: 10px;
  margin-right: -37px;
  font-weight: bold;
  color: black;
}

.v-container {
  max-width: 100%;
  padding: 13px;
  margin-top: 30px;
}

.card__categories_description {
  
  height: 70px;
  margin-top: 5px;
  margin-bottom: 5px;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;

}
.SelectedTile:hover {  
   
  color: rgb(235, 231, 229); 
  border-color: rgb(113, 117, 112);
  border-width: 3px;
  background-color: rgb(151, 186, 189);
  border-radius: 5px;
}
.SelectedTile-active {
  border-radius: 4px;
  background: rgba(205, 238, 194, 0.815);
}

.selected {
background-color: rgb(201, 205, 206);
border-block-style: solid;

border-inline-width: 5px;
border-block: 5px solid rgb(124, 118, 118);
border-left-color: rgb(124, 118, 118);
border-right-color: rgb(124, 118, 118);

}
</style>
