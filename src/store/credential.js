import { defineStore } from 'pinia';

export const useCredentialStore = defineStore('credential', {
  state: () => ({
    credData: {
      title: '',
      fields: [
        {
          label: '',
          value: '', 
          valueType: 'text',
        },
        {
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
