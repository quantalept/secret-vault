import { defineStore } from 'pinia';

export const useCredentialStore = defineStore('credential', {
  state: () => ({
    credData: {
      title: 'Netflix',
      fields: [
        {
          label: 'User Name',
          value: '', 
          valueType: 'text',
        },
        {
          label: 'Password',
          value: '', 
          valueType: 'password',
        },
        {
          label: 'PIN',
          value: '', 
          valueType: 'password',
        },
      ],
    },
  }),
  actions: {
    addField(label, valueType) {
      this.credData.fields.push({
        label,
        value: '',
        valueType,
      });
    },
  },
});
