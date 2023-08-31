import { defineStore } from 'pinia';

export const usecatalogueStore = defineStore('catalogue', {
  state: () => ({
    catalogueListed: [],
    newItem: {
      id: -1,
      title: '',
      desc: '',
    },
   
  }),
  actions: {
    addCatalogueItem() {
      this.catalogueListed.push(this.newItem);
    },
    
  },
});
