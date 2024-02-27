<template>
  <v-dialog v-bind:visible="msgDialog" max-width="500">
    <v-card>
      <div class="centeralign">
        <v-card-title>{{ dialogTitle }}</v-card-title>
      </div>
      <v-card-actions>
        <v-row justify="center" class="mb-3 mt-3">
          <v-btn @click="closeDialog">OK</v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
  
<script>
export default {
  props: {
    msgDialog: Boolean,
    dialogTitle: String
  },

  setup(props, { emit }) {
    const closeDialog = () => {
      emit('msg-dialog');
    };

    return {

      closeDialog,
    };
  },

};
</script>
  
<style scoped>  .centeralign {
    align-content: center;
  }
</style>
