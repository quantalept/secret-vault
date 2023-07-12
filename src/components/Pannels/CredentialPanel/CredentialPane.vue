<template>
  <v-card height="100%" color="primary">
          <v-form class="px-3">
            <v-card-text>
              <v-row>
                <v-label class="ml-16 mr-10" >Title:</v-label>
                <v-col cols="12" sm="4" >
                  <v-text-field v-model="credData.title" class="mt-4" variant="solo" density="compact"/>
                </v-col>
                <v-spacer></v-spacer>
                
                <v-btn class='mt-5 md-5' icon="mdi-plus" style="cursor:pointer;"
                  title="Add New Text Field"  @click="addTextField()">
                </v-btn>               
                <v-btn 
                  style="cursor:pointer;"
                  title="Add to Favorite List" 
                  class='mt-5 md-5 ml-2' icon @click="addtoFavorite()"
                  :color="isFavorite ? 'customColor1' : 'customColor4'">
                  <v-icon color="customColor2">mdi-heart</v-icon>
                </v-btn>
              </v-row>
              <v-divider />
            
              <div v-for="(field, index) in credData.fields" :key="index" class="creds-view">
                <secret-row :label="field.label" :value="field.value" :valueType="field.valueType" />
              </div>
              
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn 
                  text style="cursor:pointer;"
                  title="Hide User" 
                  @click="hideUser()"> Cancel </v-btn>
              <v-btn text 
                  style="cursor:pointer;"
                  title="Save User" 
                  @click="saveUser()" color="customColor5">
                Save
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
</template>

<script>
import SecretRow from './SecretRow.vue'


export default {
    components:{
        SecretRow
    },

    setup(){
        const credData = {
            "title": "Netflix",
            "fields": [
               {
                label: "User Name",
                value: "testuser",
                valueType: "text"

               },
               {
                label: "Password",
                value: "password",
                valueType: "password"

               },
               {
                label: "PIN",
                value: "600041",
                valueType: "password"

               }
                
            ],
            
        }

        return {
            credData,
            isFavorite:false
        }
    }

}
</script>

<style scoped>
.credential-pane{

}
.creds-view{
    margin-top: 20px;
}


</style>