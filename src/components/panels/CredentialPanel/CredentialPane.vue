<template>
  <v-card height="100%" color="primary">
    <v-form class="px-3">
      <v-card-text>
        <v-row>
          <v-col class="mt-7" cols="3" sm="4" >
          <v-label >Title :</v-label></v-col>
          <v-col cols="12" sm="3">
            <v-text-field v-model="credentialStore.credData.title" class="mt-4" variant="solo" density="compact"
              :readonly="!isEditing" />
          </v-col>
          <v-spacer></v-spacer>
          <v-btn class="mt-5 " icon @click="toggleEdit()">
            <v-icon>{{ isEditing ? 'mdi-pencil' : 'mdi-eye' }}</v-icon>
          </v-btn>
          <v-btn class="mt-5 md-5 ml-2" icon="mdi-plus" @click="addTextField()"></v-btn>
          <v-btn class="mt-5 md-5 ml-2" icon="mdi-heart"></v-btn>
        </v-row>
        <v-divider />
        <div v-for="(field, index) in credentialStore.credData.fields" :key="index" class="creds-view" >
          <secret-row :field="field" :is-editing="isEditing" />
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
import { watch, ref } from 'vue';

export default {
  props: {
    selectedCsId: Number,
    selectedCatalogTitle: String,
  },
  components: {
    SecretRow,
  },


  setup(props) {
    const credentialStore = useCredentialStore();
    const isEditing = ref(false);

    watch(() => props.selectedCatalogTitle, newTitle => {
      credentialStore.credData.title = newTitle;
    });
    
    // const addTextField = async () => {
    //   credentialStore.add()
    //   await saveCredentialToDatabase()
    // }
    const saveCredentialToDatabase = async () => {
      try {
        const db = await getDBInstance();
        const csid = props.selectedCsId;
        // Check if the entry already exists
        const existingEntry = await db.select(`
          SELECT * FROM Credential
          WHERE cs_id = ?
        `, [csid]);

        if (existingEntry.length > 0) {
          // Entry exists, perform an update
          for (const field of credentialStore.credData.fields) {
            await db.execute(`
              UPDATE Credential
              SET credential_value = ?
              WHERE cs_id= ? credential_label = ?
            `, [field.label, csid, field.value]);
            
          }
          console.log('Updated the database entry successfully!');
        } else {
          //  perform an new insert
          for (const field of credentialStore.credData.fields) {
            await db.execute(`
              INSERT INTO Credential (cs_id, credential_label, credential_value, type)
              VALUES (?, ?, ?, ?)
            `, [csid, field.label, field.value, field.valueType]);
          }
          console.log('Inserted into the database successfully!');
        }
      } catch (error) {
        console.error('Error interacting with the database:', error);
      }
    };


    const loadCredentialData = async () => {
      try {
        const db = await getDBInstance();
        const csid = props.selectedCsId;
        const result = await db.select(`
          SELECT * FROM Credential WHERE cs_id = ?
        `, [csid]);

        const fields = result.map(row => ({
          label: row.credential_label,
          value: row.credential_value,
          valueType: row.type,
        }));

        if (fields.length === 0) {
          credentialStore.credData.fields = [
            { label: 'User Name', value: '', valueType: 'text' },
            { label: 'Password', value: '', valueType: 'Password' },
          ];
        } else {
          credentialStore.credData.fields = fields;
        }
      } catch (error) {
        console.error('Error loading credential data:', error);
      }
    };
    watch(() => props.selectedCsId, () => {
      loadCredentialData();
    });

    const toggleEdit = () => {
      isEditing.value = !isEditing.value;
    };

    return {
      credentialStore,
      isFavorite: false,
      saveCredentialToDatabase,
      toggleEdit,
      isEditing,
      //addTextField
  
     
    };
  },
};
</script>

<style scoped>
.creds-view {
  margin-top: 20px;
}
</style>
