<template>
  <v-card height="100%">
    <v-row>
      <!-- column - 1 ------->
      <v-col md="2">
        <!-- <v-card class="mx-auto" > -->
        <v-list density="compact">
          <v-list-subheader class="d-flex justify-center dark"
            >ALL VAULTS</v-list-subheader
          >

          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :value="item"
            active-color="primary"
          >
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item>

          <br />

          <v-list-subheader class="d-flex justify-center"
            >Categories
            <!-- <v-btn density="compact" icon="mdi-plus"></v-btn> -->
          </v-list-subheader>

          <v-list-item
            v-for="(item2, j) in Categories"
            :key="j"
            :value="item2"
            :color="isSelected(item2.Categories) ? 'primary' : ''"
            @click="clickedCategory(item2.Categories)"
          >
            <v-list-item-content>
              <v-list-item-title v-text="item2.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <!-- </v-card> -->
      </v-col>

      <!-- column - 2 ------>
      <v-col md="4">
        <!-- <v-card > -->
        <v-text-field
          class="textSize"
          label="Search items"
          append-icon="manage_search"
          outlined
        ></v-text-field>
        <!---------------------------------------------->

        <v-list-item-group v-if="selectedCategory !== ''">
          <v-list-item
            active-color="red"
            class="bordercolor"
            v-for="(item3, index) in itemss"
            link
            :key="index"
            @click="groupOpened = true"
          >
            <v-list-item-icon>
              <v-icon :icon="item3.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-title class="d-flex justify">
              {{ item3.titlee }}
            </v-list-item-title>
            <v-list-item-title class="d-flex justify" density="compact">
              {{ item3.Desc }}
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>

        <!---------------------------------------------->
        <!-- </v-card> -->
      </v-col>

      <!-- column - 3 ------>
      <v-col md="5">
        <!-- <v-card > -->
        <v-form v-if="groupOpened">
          <v-layout align-center>
            <v-flex row>
              <v-list-subheader class="cred">Title: </v-list-subheader>
            </v-flex>
            <div class="first">
              <v-text-field v-model="Title" >
                
              </v-text-field>
            </div>
          </v-layout>
          <v-divider />
          <br />

          <v-layout align-center>
            <v-flex row>
              <v-list-subheader class="cred">User Name:</v-list-subheader>
            </v-flex>
            <v-text-field              
              v-model="selectedRule.UserName"                                      
            ></v-text-field>
            <v-spacer />
            <v-btn icon @click="adduser()">
              <v-icon icon="mdi-plus-circle"> </v-icon>
            </v-btn>
          </v-layout>

          <v-layout align-center>
            <v-flex row>
              <v-list-subheader class="cred">Password:</v-list-subheader>
            </v-flex>
            <div class="first">
              <v-text-field
                
                v-model="selectedRule.password"                               
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
              >
              </v-text-field>
            </div>
            <v-spacer />
            <v-btn icon>
              <v-icon color="primary">mdi-heart</v-icon>
            </v-btn>
          </v-layout>
         
        </v-form>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      selectedCategory: "",
      selectedItem3: "",
      groupOpened: false,
      show1: false,
      selectedRule: {
        UserName:"",
        password:"", 
      }, 
      Title:"",
          
      
      items: [
        { text: "All Items", icon: "mdi-star" },
        { text: "Favorites", icon: "mdi-star" },
        { text: "Frequently Used", icon: "mdi-heart" },
      ],
      Categories: [
        { title: "Site Credentials" },
        { title: "Documents" },
        { title: "Form Data" },
        { title: "Tokens" },
      ],
      itemss: [
        { titlee: "Netflix", Desc: "website:https://netflix.com" },
        { titlee: "Server DB", Desc: "Credential" },
        { titlee: "Google", Desc: "website:https://gmail.com" },
        { titlee: "API Token", Desc: "token" },
      ],
    };
  },
  methods: {
    clickedCategory(category) {
      this.selectedCategory =
        this.selectedCategory === category ? "" : category;
    },
    isSelected(category) {
      return this.selectedCategory === category;
    },
    clickedItem3(item33) {
      this.selectedItem3 = this.selectedItem3 === item33 ? "" : item33;
    },
    adduser() {
      console.log("adduser",this.selectedRule.UserName,this.selectedRule.password);
    },
    
  },
};
</script>
<style scoped>
.v-list-subheader {
  color: black;
  font-size: 18px;
  background: rgb(159, 221, 216);
  font-weight: bold;
}
/* .v-card{
 height: 100%;
} */
.cred {
  color: black;
  font-size: 12px;
  background: rgb(255, 255, 255);
}
.first {
  width: 500px !important;
}
.textsize {
  max-width: 100px;
}
</style>