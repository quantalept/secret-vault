<template>
  <div>
    <v-app-bar app dark height="35" color="#E5E4E2" bottom>
      <v-toolbar-items>
        <v-menu offset-y open-on-hover>
          <template v-slot:activator="{ props }">
            <v-btn text v-bind="props">vault</v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(menu, index) in Filemenu" :key="index" @click="selectSection(menu)">

              <v-list-item-title>{{ menu.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu offset-y open-on-hover>
          <template v-slot:activator="{ props }">
            <v-btn text v-bind="props">edit</v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(menu, index) in Editmenu" :key="index" @click="selectSection(menu)">

              <v-list-item-title>{{ menu.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu offset-y open-on-hover>
          <template v-slot:activator="{ props }">
            <v-btn text v-bind="props">pref</v-btn>
          </template>
        </v-menu>
        <v-menu offset-y open-on-hover>
          <template v-slot:activator="{ props }">
            <v-btn text v-bind="props">help</v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(menu, index) in Helpmenu"
              :key="index"
              @click="openHelp(menu)"
            >
              <v-list-item-title>{{ menu.title }}</v-list-item-title>
              
            </v-list-item>
          </v-list>
        </v-menu>
        <v-dialog v-model="dialog" max-width="500">
          <v-card   >
            <v-toolbar height="30">            
            <v-toolbar-title bg-color="blue">   {{ selectedFile.title }}                         
            </v-toolbar-title>
            <v-card-actions>  
            <v-btn> <v-icon icon="mdi-close" @click="dialog=false"></v-icon></v-btn>    
          </v-card-actions>     
          </v-toolbar>
            <v-card-text>
              {{selectedFile.content}}
            </v-card-text>            
          </v-card>
        </v-dialog>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedFile: null,
      dialog: false,
      Filemenu: [
        { title: 'New' },
        { title: 'Open' },
        { title: 'Save' },        
        { title: 'Exit' },
      ],
      Editmenu: [
        { title: 'Find' },
        { title: 'Replace' },
      ],
      Helpmenu: [
        { title: "Getting Started",content:"Content of Getting Started" },
        { title: "Documentation", content:"Content of Documentation" },
        { title: "Check for Updates", content:"Content of Check for Updates" },
        { title: "About", content:"Secret Manager is a secure and convenient storage system for API keys, passwords, certificates, and other sensitive data." },
      ],
    };
  },
  methods: {
    openHelp(helpitem) {
      this.selectedFile = helpitem;
      this.dialog = true;
    },
    closeVault() {
      this.dialog = false;
    }
  },
};
</script>