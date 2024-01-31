import { defineStore } from 'pinia';

export const useCredentialStore = defineStore('credential', {
  state: () => ({
    credData: {
      title: '',
      fields: [
        {
          id:-1,
          label: '',
          value: '', 
          valueType: 'text',
        },
        {
          id: -2,
          label: '',
          value: '', 
          valueType: 'password',
        },
        
      ],
    },
  }),
  actions: {
    addField(valueType) {
      this.credData.fields.push({
        label:'',
        value: '',
        valueType,
      });
    },
  },
  
});
