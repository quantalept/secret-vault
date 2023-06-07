<template>
  <v-container class="main-container">
      <v-row style="height:100%">
      <!-- column - 1 ----------------------------------------------------------------------------------------------->
      <v-col md="2" class="pa-0">
        <v-card style="height: 100%" class="AllVaults-section">
          <v-list>
            <v-list-subheader class="justify-center"
              >ALL VAULTS</v-list-subheader
            >

            <v-list-item
              v-for="(vault, i) in AllVaults"
              :key="i"
              :value="vault"
              active-color="rgb(0,0,0)"
            >
              <template v-slot:prepend>
                <v-icon :icon="vault.icon"></v-icon>
              </template>
              <v-list-item-title >{{ vault.text }}</v-list-item-title>
            </v-list-item>

            <br />

            <v-list-subheader class="justify-center">Categories</v-list-subheader>              
              <v-list-item
                class="pl-16"                
                v-for="(category, j) in Categories"
                :key="j"
                :value="category"
                :color="isSelected(category.title) ? 'rgb(0,0,0)' : ''"
                @click="clickedCategory(category.title)"
              >
                <v-list-item-content >
                  <v-list-item-title >{{ category.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              
          </v-list>
        </v-card>
      </v-col>

      <!-- column - 2 ---------------------------------------------------------------------------------------------->
      <v-col md="4" class="pa-0">
        <v-card class="Categories-section" height="100%">
          <v-row class="pa-5">
            <v-text-field              
              placeholder="Search Items..."
              v-model="searchQuery"
              bg-color="white" 
                          
            >
            </v-text-field>
          </v-row>
          <!-- search section starts ************************************** -->

          <div v-if="searchResults.length > 0">
            <v-list>
              <v-list-item v-for="search_item in search" :key="search_item">
                <v-list-item-title>{{ search_item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </div>

          <!-- search section ends ************************************** -->

          <v-list-item-group v-if="selectedCategory !== ''" >
            <v-list-item 
              class="backcolor"             
              v-for="(CategoryDesc, index) in Category_Description"
              link
              :key="index"
              @click="groupOpened='true'"
              :color="textColor('green')"
              
              elevation="2"
            >
              <v-row class="Categories-Description" >
                <v-list-item-title>
                  <v-col md="2">
                    <v-list-item-icon class="material-icons">
                      
                      <v-icon  :icon="CategoryDesc.icon"></v-icon>
                      
                    </v-list-item-icon>
                  </v-col>
                </v-list-item-title>

                <v-col md="6" >
                  <v-list-item-title>
                    {{ CategoryDesc.title }}
                  </v-list-item-title>
                  <v-list-item-title>
                    {{ CategoryDesc.Desc }}
                  </v-list-item-title>
                </v-col>
              </v-row>
              <br/>
              
              
            </v-list-item>
           
          </v-list-item-group>
        </v-card>
      </v-col>

      <!-- column - 3 ---------------------------------------------------------------------------------------------->
      <v-col md="6" class="pa-0">
        <v-card height="100%" class="Credential-section">
          <v-form class="px-3" v-if="groupOpened">
            <v-card-text>
              <v-row>
                <v-label class="Label-setting mt-n6">Title:</v-label>
                <v-col cols="12" sm="6">
                  <v-text-field class="Title-field" bg-color="white" />
                </v-col>
                <v-spacer></v-spacer>

                <v-btn class="mt-5 md-5" icon="mdi-plus" @click="adduser()" ></v-btn>
                <v-btn class="mt-5 md-5 ml-2" icon @click="AddtoFavorite(user)"
                  :color="isFavorite ? 'red' : 'rgb(192,192,192)'">
                  <v-icon color="rgb(240,255,255)">mdi-heart</v-icon>
                </v-btn>
              </v-row>
              <v-divider />
              <div v-for="(user, index) in users" :key="index">
                <v-row>
                  <v-label class="Label-setting">User Name:</v-label>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      class="User-field"
                      v-model="UserName"
                      type="text"
                      bg-color="white"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-label class="Label-setting mt-n9">Password:</v-label>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      bg-color="white"
                      class="Password-field"
                      v-model="password"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show1 ? 'text' : 'password'"
                      @click:append="show1 = !show1"
                    />
                  </v-col>
                  <v-spacer></v-spacer>

                  
                </v-row>
              </div>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="hide()"> Cancel </v-btn>
              <v-btn text @click="save()" color="rgb(0, 102, 153)">
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
      selectedCategory:"",
      groupOpened: false,
      show1: false,
      isFavorite: false,
      searchQuery: "",
      searchResults: [],
      NewUsers: [],
      FavoriteList: [],
      UserName: null,
      password: null,
      users: [{ UserName: null, password: null }],
      Title: "",
      currentcolor: 100,
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
        { title: "Token One" },
      ],
      Category_Description: [
        {
          title: "Netflix",
          Desc: "website:https://netflix.com",
          icon: "mdi-alpha-n",
        },
        { title: "Server DB", Desc: "Credential", icon: "mdi-alpha-s" },
        {
          title: "Google",
          Desc: "website:https://gmail.com",
          icon: "mdi-alpha-g",
        },
        { title: "API Token", Desc: "token", icon: "mdi-alpha-a" },
      ],
    };
  },
  methods: {
    clickedCategory(clicked_category) {
      this.selectedCategory = clicked_category;
      console.log("selected category is+++ "+this.selectedCategory);
    },
    isSelected(clickedcategory) {
      // console.log("clicked category is "+clickedcategory);
      return clickedcategory === this.selectedCategory;
      
    },
    
    textColor(fontcolor) {
        return fontcolor == this.currentcolor ? "white" : "black";
      },

    adduser() {
      if (!this.UserName && !this.password) {
        this.users.push({
          UserName: null,
          password: null,
        });
        console.log("after adding  ", this.users);
      } else {
        console.log("user name and password is not empty");
      }
    },
    save() {
      if (this.UserName && this.password) {
        this.NewUsers.push({
          UserName: this.UserName,
          password: this.password,
        });

        console.log("Saved...");
        console.log(
          "user name: " + this.UserName + "password: " + this.password
        );

        (this.UserName = null),
          (this.password = null),
          console.log(
            "user name: " + this.UserName + "password: " + this.password
          );
        console.log(this.NewUsers);
      } else console.log("user name and password is empty");
    },
    hide() {
      console.log("you clicked the hide function");
      this.groupOpened = false;
    },
    AddtoFavorite(user) {
      this.isFavorite = !this.isFavorite;
    },
  },
  computed: {
    search() {
      return this.Categories.filter((item) =>
        item.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
};
</script>
<style scoped>
.v-main .main-container{
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
/* .textsize {
  max-width: 100px;
  border-radius: 100px;
}
.v-sheet {
  width: 450px;
} */
.AllVaults-section {
  border-left: 2px solid #848884;
  background-color: darkgrey;

}
.Categories-section {
  margin-left: 0px;
  border-left: 2px solid #848884;
  background-color: rgb(192, 192, 192);
}
.Credential-section {
  border-left: 2px solid#848884;
  border-right: 2px solid #848884;
  background-color: rgb(224, 224, 224);
}
.v-list {
  background-color: darkgrey;
  border: 2px;
}

.Label-setting {
  font-weight: bold;
  color: rgb(0, 0, 0);
}
.Title-field {
  margin-top: 2px;
  margin-bottom: 2px;
  margin-left: 53px;
  margin-right: -37px;
  font-weight: bold;
  color: black;
}
.User-field {
  margin-top: 18px;
  margin-left: 1px;
  margin-right: 13px;
  font-weight: bold;
  color: black;
}
.Password-field {
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

.Categories-Description{
  border-color: rgb(214, 12, 45);   
  border-radius: 0px;
  border-width: 15px;
  height: 80px;
  margin-top: 3px;
  align-items: center;
  margin-left:10px;
  margin-right: 10px;
  
}
/* .bordercolor{    
  padding: 1px;
  margin-left: 7px;  
  margin-right: 8px;
  
  
} */
.material-icons {
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>
