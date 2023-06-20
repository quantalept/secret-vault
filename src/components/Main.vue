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
              :color="isSelected(category.title) ? 'rgb(15,15,125)' : ''" @click="clickedCategory(category.title)">
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
              
              elevation="2" 
              
              :color="isClicked(CategoryDesc) ? 'yellow' : ''" 
              @click="clickedCategory(CategoryDesc), groupOpened='true'">

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
              <br />


            </v-list-item>

          </v-list-item-group>
        </v-card>
      </v-col>

      <!-- column - 3 ---------------------------------------------------------------------------------------------->
      <v-col md="6" class='pa-0'>
        <v-card height="100%" class='card__credential'>
          <v-form class="px-3" v-if="groupOpened">
            <v-card-text>
              <v-row>
                <v-label class='card__credential_label mt-n6'>Title:</v-label>
                <v-col cols="12" sm="6">
                  <v-text-field class='title-field' bg-color="white" />
                </v-col>
                <v-spacer></v-spacer>
                
                  <v-btn class='mt-5 md-5' icon="mdi-plus" style="cursor:pointer;"
                  title="Add New Text Field"  @click="addTextField()"></v-btn>
                  
               
                <v-btn 
                  style="cursor:pointer;"
                  title="Add to Favorite List" 
                  class='mt-5 md-5 ml-2' icon @click="addtoFavorite()"
                  :color="isFavorite ? 'rgb(175,238,238)' : 'rgb(192,192,192)'">
                  <v-icon color="rgb(240,255,255)">mdi-heart</v-icon>
                </v-btn>
              </v-row>
              <v-divider />
              
              
                <v-row>
                  <v-label class='card__credential_label'>User Name:</v-label>
                  <v-col cols="12" sm="6">
                    <v-text-field class='user-field' v-model="UserName" type="text" bg-color="white"></v-text-field>
                  </v-col>                  
                </v-row>

                <v-row>
                  <v-label class='card__credential_label mt-n9'>Password:</v-label>
                  <v-col cols="12" sm="6">
                    <v-text-field bg-color="white" class='password-field' v-model="password"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'"
                      @click:append="show1 = !show1" />
                  </v-col>
                  <v-spacer></v-spacer>
                  
                </v-row>
                <div v-for="(textField, index) in textFields" :key="index">
                <v-row >
                  <v-col cols="2" class="ma-0 mt-3 pa-0" ><v-text-field bg-color="white" v-model="newTitle" width="10px"></v-text-field></v-col>
                  <v-col cols="6"><v-text-field bg-color="white" v-model="newField" width="200px"></v-text-field></v-col>  
                </v-row>
              </div>
              
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn 
                  text style="cursor:pointer;"
                  title="Hide User" 
                  @click="hideUser()"> Cancel </v-btn>
              <v-btn text 
                  style="cursor:pointer;"
                  title="Save User" 
                  @click="saveUser()" color="rgb(0, 102, 153)">
                Save
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
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

        console.log("Saved...");
        console.log(
          "user name: " + this.UserName + "  " + "password: " + this.password
        );
        console.log(
          "title name: " + this.newTitle + "  " + "new field: " + this.newField
        );

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
  
  height: 80px;
  margin-top: 3px;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;

}
.SelectedTile:hover {  
   
  color: rgb(128, 44, 11); 
  border-color: rgb(178, 233, 165);
  border-width: 5px;
  background-color: rgb(131, 223, 230);
  border-radius: 5px;
}
.SelectedTile-active {
  border-radius: 4px;
  background: rgba(232, 235, 231, 0.815);
}
</style>
