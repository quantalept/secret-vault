<template> 

    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator="{ props }">
      <v-btn v-bind="props" > Add</v-btn>
    </template>
      <v-card>
        <v-toolbar height="40">
          <v-toolbar-title class="text-center">External Vault</v-toolbar-title>
          <v-btn icon>
            <v-icon @click="dialog=false"> mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <div v-for="field in formFields" :key="field.name">
              <v-row>
                <v-col cols="4" class="mt-4">
                  <v-label>{{ field.lable }}:</v-label>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    v-model="field.value"
                    :lable="field.lable"
                    :type="field.type"
                    variant="solo"
                    density="compact"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </div>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-row>
            <v-btn
              variant="elevated"
              :style="{ left: '50%', transform: 'translateX(-50%)' }"
              class="bg-success"
            >
              submit
            </v-btn>
          </v-row>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  <script>
  export default {
    data() {
      return {      
        dialog:false,
        formFields: [
                  { name: 'name', value: '', lable: 'Name', type: 'text' },
                  { name: 'username', value: '', lable: 'Username', type: 'text' },
                  { name: 'password', value: '', lable: 'Password', type: 'password' },
                  { name: 'pin', value: '', lable: 'PIN', type: 'text' },
              ],
        
      }
    }
  }
  </script>
      