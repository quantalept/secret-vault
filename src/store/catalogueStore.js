import { defineStore } from 'pinia';

export const usecatalogueStore = defineStore('catalogue', {
  state: () => ({
    Cataloguelisted: [],
    newItem: {
      title: '',
      Desc: '',
    },
   
  }),
  actions: {
    addCatalogueItem(newItem) {
      const id = Date.now();
      this.Cataloguelisted.push({ ...newItem, id });
      this.newItem = { title: '', Desc: '', };
    },
  },
});
