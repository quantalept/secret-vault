<template>
  <v-dialog v-bind:visible="dialog" max-width="500">
    <v-card>
      <v-card-text>
        <v-text-field v-model="catalogueStore.newItem.title" label="Title" @err-msg="error_Msg"></v-text-field>
        <!-- ******************************************************* -->
        <div v-if="error" class="error-message">{{ error }}</div>
        <!-- ******************************************************* -->
        <v-text-field v-model="catalogueStore.newItem.desc" label="Description"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-row justify="center" class="mb-3 mt-3">
          <v-btn variant="text" @click="cancel">Cancel</v-btn>
          <v-btn variant="text" @click="addNewItem" :disabled="isButtonDisabled">Add Item</v-btn>
        </v-row>
    </v-card-actions>
    </v-card>
  </v-dialog>
</template>
 
<script>
import { defineComponent, computed,ref } from 'vue';
import { usecatalogueStore } from '../../../store/catalogueStore';

export default defineComponent({
  props: {
      dialog: Boolean,      
    },
  setup(props, { emit }) {
    const catalogueStore = usecatalogueStore();

    const error = ref('');

    const  cancel =() =>{
      emit('cancel');        
      };
    const  addNewItem =() =>{
      emit('add-item');        
      };

    const isButtonDisabled =  computed(() =>
      catalogueStore.newItem.title.trim().length === 0);
    
    const error_Msg = (msg) =>{
      error.value="Exists";
    };


    return {
      catalogueStore,
      addNewItem,
      cancel,
      isButtonDisabled,      
      error,
      error_Msg,
    };
  },
  
});
</script>
<style scoped>
.error-message {
    color: red;
    margin-top: 5px;
    margin-left: 10px;
  }
</style>