<template>
  <v-container class="fill-height fluid align-center justify-center">
    <v-card class="mx-auto px-6 py-9" width="500" height="500" elevation="12">
      <v-toolbar color="blue">
        <v-icon> mdi-account</v-icon>
        Login
      </v-toolbar>
      <br />
      <v-card-subtitle> Hi, Please unlock your local vault </v-card-subtitle>
      <br /><br />
      <v-card-text>
        <v-row>
          <v-text-field label="Master Password" color="blue"> </v-text-field>
        </v-row>
        <br />
        <v-row>
          <v-col>
            <br /><br />
            <v-btn
              absolute
              top
              :style="{ left: '50%', transform: 'translateX(-50%)' }"
              color="primary"
              v-on:click="login()"
              >unlock</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
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