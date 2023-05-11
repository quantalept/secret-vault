<template>
 <v-container >
  <v-row >
    <!-- column - 1 ----------------------------------------------------------------------------------------------->
    <v-col md="2" class="pa-0">
      <v-card height="100vh" class="column1" >
      <v-list>
        <v-list-subheader class="justify-center">ALL VAULTS</v-list-subheader>

        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :value="item"          
          active-color="rgb(0,0,0)"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>
          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item>

        <br />

        <v-list-subheader class="justify-center">Categories </v-list-subheader>

        <v-list-item
          v-for="(item2, j) in Categories"
          :key="j"
          :value="item2"
          :color="isSelected(item2.Categories) ? 'rgb(0,0,0)' : ''"
          @click="clickedCategory(item2.Categories)"
        >
          <v-list-item-content>
            <v-list-item-title v-text="item2.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      </v-card>
    </v-col>

    <!-- column - 2 ---------------------------------------------------------------------------------------------->
    <v-col md="4" class="pa-0" >
      <v-card class="column2" height="100vh" >
      <v-text-field
        class="textSize"
        label="Search items"
        append-icon="manage_search"
        outlined
      ></v-text-field>
     

      <v-list-item-group v-if="selectedCategory !== ''" fluid>
        <v-list-item
          class="bordercolor"
          v-for="(item3, index) in itemss"
          link
          :key="index"
          @click="groupOpened = true"
          :color="isSelected(item3.itemss) ? 'rgb(0,0,0)' : ''"
          :background-color="isSelected(item3.itemss) ? 'rgb(199,21,133)' : ''"
        >
          <!-- <v-list-item-icon>
              <v-icon :icon="item3.icon"></v-icon>
            </v-list-item-icon> -->
          <v-list-item-title class="d-flex justify light-blue">
            <v-list-item-icon>
              <v-icon :icon="item3.icon"></v-icon>
            </v-list-item-icon>
            {{ item3.titlee }}
          </v-list-item-title>
          <v-list-item-title class="d-flex justify" density="compact">
            {{ item3.Desc }}
          </v-list-item-title>
        </v-list-item>
      </v-list-item-group>

     
      </v-card>
    </v-col>

    <!-- column - 3 ---------------------------------------------------------------------------------------------->
    <v-col md="6" class="pa-0" >
      <v-card height="100vh" class="column3" >

      <v-form class="px-3" v-if="groupOpened">
        <v-card-text >
          <v-row>
            <v-label class="labeltext mt-n6">Title:</v-label>
            <v-col cols="12" sm="6">
              <v-text-field class="textfield1"  />
            </v-col>
            <v-spacer></v-spacer>
            
            <v-btn class="mt-5 md-5" icon="mdi-plus" ></v-btn>
           
          </v-row>
          <v-divider />
          <v-row>
            <v-label class="labeltext">User Name:</v-label>
            <v-col cols="12" sm="6">
              <v-text-field
                class="textfield2"
                v-model="UserName"                               
                required                
              />
            </v-col>
          </v-row>
          <v-row>
            <v-label class="labeltext mt-n9">Password:</v-label>
            <v-col cols="12" sm="6">
              <v-text-field                
                class="textfield3"
                v-model="password"                
                required
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"               
              />
            </v-col>
            <v-spacer></v-spacer>
            <v-btn icon="mdi-heart" :style="{ color: 'rgb(192,192,192)' }">
            </v-btn>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="hide()"> Cancel </v-btn>
          <v-btn text @click="save()" color="rgb(0, 102, 153)"> Save </v-btn>
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
      selectedItem3: "",
      groupOpened: false,
      show1: false,
      selectedRule: {
        UserName: "",
        password: "",
      },
      Title: "",

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
        {
          titlee: "Netflix",
          Desc: "website:https://netflix.com",
          icon: "mdi-star",
        },
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
      console.log(
        "adduser",
        this.selectedRule.UserName,
        this.selectedRule.password
      );
    },
    hide(){
      console.log("you clicked the hide function")
    },
     save(){
      console.log("you clicked the save function")
    }
  },
};
</script>
<style scoped>
.v-list-subheader {
  color: black;
  font-size: 18px;
  background: rgb(176,196,222);
  font-weight: bold;
}
.textsize {
  max-width: 100px;
}
.v-sheet {
  width: 450px;
}
.column1 {  
  border-left: 2px solid #848884;
  background-color: darkgrey;
}
.column2 { 
  margin-left: 0px;  
  border-left: 2px solid #848884;
  background-color: rgb(192, 192, 192);
}
.column3 {
   
  
  border-left: 2px solid#848884;
  border-right: 2px solid #848884;
  background-color: rgb(224, 224, 224);
}
.v-list {
  background-color: darkgrey;
  border: 2px;
}

.labeltext{  
  font-weight: bold;
  color: rgb(0, 0, 0); 
}
.textfield1{
  margin-top: 2px;
  margin-bottom: 2px;
  margin-left: 53px;
  margin-right: -37px;
  font-weight: bold;
  color: black;
}
.textfield2{
  margin-top: 18px;  
  margin-left: 1px;
  margin-right: 13px;
  font-weight: bold;
  color: black;
}
.textfield3{
  margin-top: -10px;
  margin-left: 10px;
  margin-right: -37px;
  font-weight: bold;
  color: black;
}
.v-container {

  max-width: 100%;


  padding: 13px;
}
</style>