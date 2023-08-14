import { defineStore } from 'pinia';
import { getDBInstance } from '../components/js/database';

export const usecatalogueStore = defineStore('catalogue', {
  state: () => ({
    Cataloguelisted: [],
    newItem: {
      id: -1,
      title: '',
      Desc: '',
    },
   
  }),
  actions: {
    addCatalogueItem() {
      this.Cataloguelisted.push(this.newItem);
      this.newItem = { id:-1,title: '', Desc: '', };
    },
    
  },
});
