import { defineStore } from 'pinia';

export const usecategoriesStore = defineStore('categories', {
  state: () => ({
    categories: [],
    newItem: {
      id: -1,
      title: '',
      icon: '',
    },

    defaultcateg: [
        { title: "Site Credentials", icon: "icon-credentials.png" },
        { title: "Documents", icon: "icon-documents.png" },
        { title: "Form Data", icon: "icon-formdata.png" },
        { title: "Token API", icon: "icon-tokenapi.png" },
        { title: "Token Key", icon: "icon-tokenkey.png" },
    ],
  }),
  actions: {
    addCategory() {
      this.categories.push(this.newItem);
      this.newItem = {id:-1,title:'',icon:''};
    },
   
  },
});
