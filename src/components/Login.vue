<template>
  <v-dialog v-model="showDialog" persistent max-width="600px"  >
    <v-card color="#E5E4E2">
      <v-toolbar color="#C0C0C0"  height="32">
        <v-icon>mdi-lock</v-icon>
        <v-toolbar-title class=" text-center" style="font-family:Lucida">App Initialization</v-toolbar-title>
      </v-toolbar>
      <v-card-subtitle class="subtitle  text-center">Hi, Please unlock your vault </v-card-subtitle>
      <v-card-text>
        <v-row >
          <v-col cols="4">
            <v-label class="input-label ">Master password :</v-label>
          </v-col>
          <v-col cols="6" class="input-field" >
            <v-text-field  variant="solo" class=" ml-4" density="compact"></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn variant="tonal" color="#0000FF" @click="login" class="button">Unlock</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      showDialog: true,
      
    }
  },
}
</script>

<style scoped>
.subtitle {
  margin-top: 45px;
  font-weight: bold;
  font-size: 18px;
  color:black;
  
}
.input-label {
  font-weight: bold;
  margin-top: 40px;
  margin-left: 45px;
}
.input-field {
  margin-top: 35px;
}
.button {
  margin-bottom: 50px;
}
</style>
