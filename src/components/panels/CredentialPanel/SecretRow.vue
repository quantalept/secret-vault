<template>
    <div>
      <v-row pa-1>
        <v-col cols="3" sm="4" align-self="center">
          <v-label>{{ field.label }}</v-label>
        </v-col>
        
        <v-col cols="8" sm="6" align-self="center">
          <v-text-field v-model="field.value" density="compact" variant="solo"
              :type="show ? 'text' : 'password'"
              class="cust-bg-text">
  
              <template #append>
                  <v-icon>mdi-content-copy</v-icon>
                  <div style="margin-right: 5px;"></div>
                  <v-icon @click="show = !show">{{ field.valueType === 'password' ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
              </template>
          
          </v-text-field>
        </v-col>
      </v-row>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import { useCredentialStore } from '../../../store/credential'; // 
  
  export default {
    props: {
      field: Object,
    },
    setup(props) {
      const credentialStore = useCredentialStore(); 
      const show = ref(false);
  
      return {
        field: computed(() => {
          return credentialStore.credData.fields.find(f => f.label === props.field.label);
        }),
        show,
      };
    },
  };
  </script>
  
  <style scoped>
  .cust-bg-text .v-input__control {
    background-color: white !important;
    opacity: 1 !important;
  }
  </style>
  