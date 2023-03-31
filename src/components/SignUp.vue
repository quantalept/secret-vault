<template>
<v-container class="fluid fill-height align-center justify-center">
  
    <v-card class="mx-auto px-6 py-9"  width="600" rounded elevation="15">
      <v-toolbar color="blue">
        <v-icon> mdi-account</v-icon>
        <v-toolbar-title >Sign Up</v-toolbar-title>
      </v-toolbar>
      <br>
      <v-label dark color="blue">Hi, Please initialize your vault</v-label>
      <br><br>
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-layout align-center>
            <v-flex row>
              <v-list-subheader color="black">Master Password: </v-list-subheader>              
            </v-flex>
        <v-text-field
          v-model="password1"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          clearable
          label="Master Password"
        ></v-text-field>
        </v-layout>
        <v-layout>
          <v-flex row>
              <v-list-subheader color="black">Master Password: </v-list-subheader>              
            </v-flex>
        <v-text-field
          v-model="password2"
          :readonly="loading"
          :rules="[required]"
          clearable
          label="Master Password"
        ></v-text-field>
        </v-layout>
         <br>

        <v-btn
          absolute
          top
          :style="{ left: '50%', transform: 'translateX(-50%)' }"
          color="primary"
          v-on:click="save()"
          >save</v-btn
        >
      </v-form>
    </v-card>
  
</v-container>
</template>
<script>
export default {
  data() {
    return {
      password: "",
    };
  },
};
</script>
<style>
</style>