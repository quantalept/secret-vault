<template>
  <v-container>
    <!-- <v-dialog v-model="loginDialog" pesistent width="600"> -->
    <v-card class="mx-auto px-6 py-9" width="600" elevation="5">
      <v-toolbar color="blue" dark height="35" class="sm-4">
        <v-icon>mdi-lock-open</v-icon>

        <v-toolbar-title class="d-flex justify-center mt-1"
          >App Initialization</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-div>
        <v-card-subtitle class="text-h6 ma-3 ml-2 block">
          Hi, Please unlock your local vault
        </v-card-subtitle>

        <v-card-text>
          <v-row>
            <v-col cols="4" left>
              <div class="input-label">Master Password:</div>
            </v-col>
            <v-col cols="8">
              <v-text-field
                v-model="password"
                label="Master Password"
                color="primary"
                class="textalign"
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- <v-card-actions class="d-flex justify-center" color="primary"></v-card-actions> -->
          <v-row>
            <v-btn
              absolute
              top
              :style="{ left: '50%', transform: 'translateX(-50%)' }"
              color="primary"
              v-on:click="login()"
              >Unlock</v-btn
            >
          </v-row>
        </v-card-text>
      </v-div>
    </v-card>
  </v-container>
  <!-- </v-dialog> -->
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
.v-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.v-toolbar-title {
  font-size: 19px;
}
.input-label {
  margin-left: 10px;
  margin-top: 15px;
}
.textalign {
  margin-left: -30px;
}
</style>
