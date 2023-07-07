<template>
  <v-row>
    <v-col md="2" class="pannel-backcolor">
      <v-card>
        <v-list>
          <v-list-subheader>All VAULTS</v-list-subheader>
          <v-list-item v-for="(vault, i) in AllVaults" :key="i" :value="vault">
            <template v-slot:prepend>
              <v-icon :icon="vault.icon"></v-icon>
            </template>
            <v-list-item-title>{{ vault.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
        <v-divider />
        <v-list>
          <v-list-subheader>Categories</v-list-subheader>
          <v-list-item class="pl-14" v-for="(category, j) in Categories" :key="j" :value="category"
            :color="isSelected(category.title) ? 'black' : ''" @click="clickedCategory(category.title)">
            <v-list-item-content>
              <v-list-item-title :class="{ 'categoryselected': isSelected(category.title) }"
                @click="clickedCategory(category.title)"> {{ category.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>

    <v-col md="4" class="pannel-backcolor">
      <v-card>
        <v-list v-if="selectedCategory !== ''">
          <v-text-field placeholder="Search Items..." bg-color="white"></v-text-field>
          <v-list-item v-for="(Catelogues, index) in ListedCatalogue" :key="index" elevation="1"
            :class="{ 'listed-catalogue': true, 'selected-catalogue': isClicked(Catelogues) }"
            @click="clickedDesc(Catelogues)">
            <v-row>
              <v-list-item-title>
                <v-col>
                  <v-list-item-icon>
                    <v-icon :icon="Catelogues.icon"></v-icon>
                  </v-list-item-icon>
                </v-col>
              </v-list-item-title>
              <v-col>
                <v-list-item-title style="font-weight:bold;color:black;"> {{ Catelogues.title }}</v-list-item-title>
                <v-list-item-title> {{ Catelogues.Desc }} </v-list-item-title>
              </v-col>
            </v-row>
          </v-list-item>
        </v-list>
      </v-card></v-col>

    <v-col md="6" class="pannel-backcolor">
      <v-card>
        <v-list>
          <v-form class="px-3" v-if="groupOpened">
            <v-card-text>
              <v-row>
                <v-label class='input-label'>Title :</v-label>
                <v-col sm="6">
                  <v-text-field class='index-title' bg-color="white" />
                </v-col>
                <v-spacer></v-spacer>
                <v-btn class='mt-5 md-5' icon="mdi-plus" @click="addTextField()"></v-btn>
                <v-btn class='mt-5 md-5 ml-2' icon>
                  <v-icon>mdi-heart</v-icon></v-btn>
              </v-row>
              <v-divider />
              <v-row>
                <v-label class='input-label'>User Name :</v-label>
                <v-col cols="12" sm="6">
                  <v-text-field class='user-name' v-model="UserName" type="text" bg-color="white"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-label class='input-label'>Password :</v-label>
                <v-col cols="12" sm="6">
                  <v-text-field bg-color="white" class='password-field' v-model="password"
                    :append-icon="passwordvisible ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="passwordvisible ? 'text' : 'password'" @click:append="passwordvisible = !passwordvisible" />
                </v-col>
                <v-spacer></v-spacer>
              </v-row>
              <div v-for="(textField, index) in textFields" :key="index">
                <v-row>
                  <v-col cols="2" class="ma-0 mt-3 pa-0"><v-text-field bg-color="white" v-model="newTitle"
                      width="10px"></v-text-field></v-col>
                  <v-col cols="5"><v-text-field bg-color="white"></v-text-field></v-col>
                </v-row>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn> Cancel </v-btn>
              <v-btn color="rgb(49, 49, 204)" variant="tonal">Save </v-btn>
            </v-card-actions>
          </v-form>
        </v-list>
      </v-card></v-col>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      selectedCategory: "",
      groupOpened: true,
      searchResults: [],
      textFields: [],
      selectedDesc: "",
      passwordvisible: false,

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
      ListedCatalogue: [
        {
          title: "Netflix",
          Desc: "Website: https://netflix.com",
          icon: "mdi-alpha-n",
        },
        {
          title: "Server DB",
          Desc: "Credential",
          icon: "mdi-alpha-s"
        },
        {
          title: "Google",
          Desc: "Website: https://gmail.com",
          icon: "mdi-alpha-g",
        },
        {
          title: "API Token",
          Desc: "token",
          icon: "mdi-alpha-a"
        },
      ],
    };
  },
  methods: {
    clickedCategory(clicked_category) {
      this.selectedCategory = clicked_category;
    },
    isSelected(clickedcategory) {
      return clickedcategory === this.selectedCategory;
    },
    addTextField() {
      this.textFields.push({ newTitle: '', newField: '' });
    },
    clickedDesc(clicked_desc) {
      this.selectedDesc = clicked_desc;
    },
    isClicked(clickeddesc) {
      return clickeddesc === this.selectedDesc;
    },
  }
};
</script>
<style scoped>
.v-container {
  margin-top: 2px;
  margin-left: 1px;
  padding: 1px;
}

.v-list-subheader {
  color: black;
  font-size: 18px;
  font-weight: bold;
  justify-content: center;
}

.v-card {
  height: 96.2vh;
  padding: 6px;
  margin-left: 0px;
  background: #f5f5f5;
  margin-top: 10px;
}
.pannel-backcolor {
  padding: 1px;
  background: #C0C0C0;
}

.v-list {
  background: #f5f5f5;
}

.categoryselected {
  color: rgb(49, 49, 204);
  font-weight: bold;
  font-size: 18px;
}

.listed-catalogue {
  margin-left: 4vh;
  margin-right: 5vh;
  margin-bottom: 13px;
  height: 8vh;
}

.selected-catalogue {
  border: 2px solid blue;
}

.input-label {
  font-weight: bold;
  color: rgb(0, 0, 0);
}

.index-title {
  margin-left: 5vh;
  font-weight: bold;
  color: black;
}

.user-name {
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
}</style>