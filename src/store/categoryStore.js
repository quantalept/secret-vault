import { defineStore } from 'pinia';

export const usecategoriesStore = defineStore('categories', {
  state: () => ({
    categories: [
     
    ],
    defaultcateg: [
      
        { title: "Site Credentials", icon: "icon-credentials.png" },
        { title: "Documents", icon: "icon-documents.png" },
        { title: "Form Data", icon: "icon-formdata.png" },
        { title: "Token API", icon: "icon-tokenapi.png" },
        { title: "Token Key", icon: "icon-tokenkey.png" },
      
    ],
  }),
  actions: {
    addCategory(category) {
      this.categories.push(category);
    },
   
  },
});
