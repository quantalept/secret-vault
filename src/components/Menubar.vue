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
            <v-btn text v-bind="props">about</v-btn>
          </template>
        </v-menu>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  data() {
    return {

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
    };
  },
  methods: {
    selectSection(item1) {
      this.selectedSection = item1;
      console.log("*******   ", this.selectedSection);
    }
  },
};
</script>