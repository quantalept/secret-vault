<template>
        <v-card height="100%" color="primary">
          <v-form class="px-3" v-if="selectedCred">
            <v-card-text>
              <v-row>
                <v-label class="ml-16 mr-10">Title:</v-label>
                <v-col cols="12" sm="4">
                  <v-text-field
                    append-inner-icon="mdi-pencil"
                    v-model="credentialStore.credData.title"
                    class="mt-4"
                    variant="solo"
                    density="compact" />
                </v-col>
                <v-spacer></v-spacer>
                <v-btn class="mt-5 md-5" icon="mdi-plus" @click="addTextField()">
          </v-btn>
          <v-btn class="mt-5 md-5 ml-2" icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>
        </v-row>
              <v-divider />
              <div
                v-for="(field, index) in credentialStore.credData.fields"
                :key="index"
                class="creds-view"
              >
                <secret-row :field="field"/>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn>Cancel</v-btn>
              <v-btn @click="saveCredentialToDatabase()">Save</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
</template>

<script>
import { useCredentialStore } from '../../../store/credential'; 
import SecretRow from './SecretRow.vue';
import { getDBInstance } from '../../js/database';

export default {
  props: {
    selectedCred: Object,
  },
  components: {
    SecretRow,
  },

  setup(props) {
    const credentialStore = useCredentialStore();

    const saveCredentialToDatabase = async () => {
      try {
        const db = await getDBInstance();
        const cs_id = props.selectedCred ? props.selectedCred.cs_id : null;
        // Insert Catalogue into the database
        for (const field of credentialStore.credData.fields) {
          await db.execute(`
          INSERT INTO Credential (cs_id, credential_label, credential_value, type)
            VALUES (?, ?, ?, ?)
          `, [cs_id, field.label,field.value, field.valueType]);
        }
        console.log('Credential items inserted into the database successfully!');
      } catch (error) {
        console.error('Error inserting Credential items into the database:', error);
      }
    };
  
    return {
      credentialStore,
      isFavorite: false,
      saveCredentialToDatabase
    };
  },
};
</script>

<style scoped>
.creds-view {
  margin-top: 20px;
}
</style>
