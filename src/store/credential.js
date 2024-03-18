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
      newField:  {
        id: -3, 
        label: '',
        value: '',
        valueType: 'password'
      }
    },
  }),
  actions: {
    addField() {
      this.credData.fields.push(this.credData.newField);
      return this.credData.newField;
    },
    removeField(id) {
      const index = this.credData.fields.findIndex(item => item.id === id);
        if (index !== -1) {
          this.credData.fields.splice(index, 1);
        }
    }
  },
});
