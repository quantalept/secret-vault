<template>
   <v-dialog v-bind:visible="delete_dialog" max-width="400">
      <v-card>
        <v-card-title>Confirm Deletion</v-card-title>
        <v-card-text>
          Are you sure you want to delete this item?
        </v-card-text>
        <v-card-actions>
          <v-btn @click="deleteConfirm">Confirm</v-btn>
          <v-btn @click="cancelDelete">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
export default {
    props: {
      delete_dialog: Boolean,     
    },
    
    setup(props, { emit }){   
      
      const  deleteConfirm =() =>{
        emit('delete-confirm');        
      };
      const cancelDelete=()=>{
        emit('cancel-delete');
      };

    return {
     deleteConfirm,
     cancelDelete,
      
    };
  },
  
  };
  </script>
