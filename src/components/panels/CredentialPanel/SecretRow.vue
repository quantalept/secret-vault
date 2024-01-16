<template>
  <div>
    <v-row pa-1>
      <v-col cols="3" sm="4" align-self="center">
        <template v-if="isEditing">
          <v-text-field v-model="field.label" type="text" @click="toggleEdit" density="compact"></v-text-field>
        </template>
        <template v-else>
        <v-label >{{ field.label }}</v-label>
      </template>
      </v-col>

      <v-col cols="8" sm="6" align-self="center">
        <v-text-field v-model="field.value" density="compact" variant="solo" class="cust-bg-text" :readonly="!isEditing"
          @click="toggleEdit" :type="field.valueType === 'text' || show ? 'text' : 'password'">
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
import { ref, computed, watch } from 'vue';
import { useCredentialStore } from '../../../store/credential';

export default {
  props: {
    field: Object,
    isEditing: Boolean,
  },
  setup(props) {
    const credentialStore = useCredentialStore();
    const show = ref(false);
    const isFieldEditable = ref(false);


    const toggleEdit = () => {
      if (props.isEditing) {
        isFieldEditable.value = !isFieldEditable.value;
      }
    };

    return {
      field: computed(() => {
        return credentialStore.credData.fields.find(f => f.label === props.field.label);
      }),
      show,
      isFieldEditable,
      toggleEdit,
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
