<template>
  <v-container>
    <v-row>
      <!-- column - 1 ----------------------------------------------------------------------------------------------->
      <v-col md="2" class="pa-0">
        <v-card height="100vh" class="column1">
          <v-list>
            <v-list-subheader class="justify-center"
              >ALL VAULTS</v-list-subheader
            >

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

            <v-list-subheader class="justify-center"
              >Categories
            </v-list-subheader>

            <v-list-item
              v-for="(item2, j) in Categories"
              :key="j"
              :value="item2"
              :color="isSelected(item2.Categories) ? 'rgb(0,0,0)' : ''"
              @click="clickedCategory(item2)"
            >
              <v-list-item-content>
                <v-list-item-title v-text="item2.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <!-- column - 2 ---------------------------------------------------------------------------------------------->
      <v-col md="4" class="pa-0">
        <v-card class="column2" height="100vh">
          <v-row>
            <v-text-field
              class="textSize"
              placeholder="Search fruits..."
              outlined
              v-model="searchQuery"
            >
            </v-text-field>
            <v-btn
              color="grey"
              class="btn-size-small"
              append-icon="mdi-magnify"
              @click="search"
            ></v-btn>
          </v-row>
         
          <!-- search section starts ************************************** -->
         
          <div v-if="searchResults.length > 0">
            <v-list>
              <v-list-item v-for="result in searchResults" :key="result">
                <v-list-item-title>{{ result.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </div>
          <div v-else>
            <v-list-item-title>No search Result found</v-list-item-title>
          </div>

          

          <!-- search section ends ************************************** -->

          <v-list-item-group v-if="selectedCategory !== ''">
            <v-list-item
              class="bordercolor"
              v-for="(item3, index) in itemss"
              link
              :key="index"
              @click="groupOpened = true"
              :color="isSelected(item3.itemss) ? 'rgb(0,0,0)' : ''"
              :background-color="
                isSelected(item3.itemss) ? 'rgb(199,21,133)' : ''
              "
            >
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
      <v-col md="6" class="pa-0">
        <v-card height="100vh" class="column3">
          <v-form class="px-3" v-if="groupOpened">
            <v-card-text>
              <v-row>
                <v-label class="labeltext mt-n6">Title:</v-label>
                <v-col cols="12" sm="6">
                  <v-text-field class="textfield1" />
                </v-col>
                <v-spacer></v-spacer>

                <v-btn
                  class="mt-5 md-5"
                  icon="mdi-plus"
                  @click="adduser()"
                ></v-btn>
              </v-row>
              <v-divider />
              <div v-for="(user, index) in users" :key="index">
                <v-row>
                  <v-label class="labeltext">User Name:</v-label>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      class="textfield2"
                      v-model="UserName"
                      type="text"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-label class="labeltext mt-n9">Password:</v-label>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      class="textfield3"
                      v-model="password"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show1 ? 'text' : 'password'"
                      @click:append="show1 = !show1"
                    />
                  </v-col>
                  <v-spacer></v-spacer>
                  <!-- :style="{ color: 'rgb(192,192,192)' }" -->
                  <v-btn
                    icon
                    @click="AddtoFavorite(user)"
                    :color="isFavorite ? 'red' : 'rgb(192,192,192)'"
                  >
                    <v-icon color="rgb(240,255,255)">mdi-heart</v-icon>
                  </v-btn>
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
      
      
      
      selectedCategory: "",
      selectedItem3: "",
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

      items: [
        { text: "All Items", icon: "mdi-star" },
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
      itemss: [
        {
          titlee: "Netflix",
          Desc: "website:https://netflix.com",
          icon: "mdi-star",
        },
        { titlee: "Server DB", Desc: "Credential", icon: "mdi-star" },
        {
          titlee: "Google",
          Desc: "website:https://gmail.com",
          icon: "mdi-star",
        },
        { titlee: "API Token", Desc: "token", icon: "mdi-star" },
      ],
    };
  },
  methods: {
    clickedCategory(item2) {
      this.selectedCategory = item2;
      console.log(this.selectedCategory);
    },
    isSelected(item2) {
      return this.selectedCategory === item2;
    },
    clickedItem3(item33) {
      this.selectedItem3 = item33;
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
    },
    AddtoFavorite(user) {
      // this.isFavorite = true;
      // if (!this.FavoriteList.includes(user)) {
      //   this.FavoriteList.push(user);
      // }
      // console.log(this.FavoriteList);
      this.isFavorite = !this.isFavorite;
    },

    search() {
      const query = this.searchQuery.toLowerCase();
      this.searchResults = this.Categories.filter((item) =>
        item.title.toLowerCase().includes(query)
      );
    },

    
  },
  
};
</script>
<style scoped>
.v-list-subheader {
  color: black;
  font-size: 18px;
  background: rgb(176, 196, 222);
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

.labeltext {
  font-weight: bold;
  color: rgb(0, 0, 0);
}
.textfield1 {
  margin-top: 2px;
  margin-bottom: 2px;
  margin-left: 53px;
  margin-right: -37px;
  font-weight: bold;
  color: black;
}
.textfield2 {
  margin-top: 18px;
  margin-left: 1px;
  margin-right: 13px;
  font-weight: bold;
  color: black;
}
.textfield3 {
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
.btn-size-small {
  margin-right: 15px;
  margin-top: 15px;
  font-size: 12px;
  padding: 12px 10px;
}
</style>
