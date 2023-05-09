<template>
  <v-container class="fluid fill-height align-center justify-center">
    <!-- <v-dialog v-model="loginDialog" pesistent width="600">  -->
    <v-card class="mx-auto px-6 py-9" width="600" rounded elevation="15">
      <v-toolbar color="blue" height="35">
        <v-icon> mdi-content-save</v-icon>
        <v-toolbar-title rounded class="d-flex justify-center"
          >App Initialization</v-toolbar-title
        >
        <v-btn icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <br />
      <v-label dark color="blue"
        >Hi, Please initialize your local vault</v-label
      >
      <br /><br />
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-layout align-center>
          <v-flex row>
            <v-list-subheader color="black">Master Password: </v-list-subheader>
          </v-flex>
          <v-text-field
            v-model="password1"
            :readonly="loading"
            :rules="[required]"
            class="textalign1"
            clearable
            label="Master Password"
          ></v-text-field>
        </v-layout>
        <v-layout>
          <v-flex row>
            <v-list-subheader color="black"
              >Confirm Password:
            </v-list-subheader>
          </v-flex>
          <v-text-field
            v-model="password2"
            :readonly="loading"
            :rules="[required]"
            clearable
            label="Confirm Password"
            class="textalign2"
          ></v-text-field>
        </v-layout>
        <br />

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
    <!-- </v-dialog> -->
  </v-container>
</template>
<script scoped>
export default {
  data() {
    return {
      password: "",
    };
  },
};
</script>
<style>
.textalign1 {
  margin-left: 10px;
}
.textalign2 {
  margin-left: 3px;
}
</style>