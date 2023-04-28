<template>
<v-container>
  <!-- <v-dialog v-model="loginDialog" pesistent width="600"> -->
  <v-card height="450px" width="600" align-center color="silver" elevation="5">
    <v-toolbar color="blue" dark height="35" >
      <v-icon>mdi-lock-open</v-icon>
      
      <v-toolbar-title class="d-flex justify-center" color="black"
        >App Initialization</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-div >
    <v-card-subtitle class="text-h6 ma-3 block" >      
      Hi, Please unlock your local vault
    </v-card-subtitle >
    
    <v-card-text>
      <!-- <v-container> -->
        <v-row>
          <v-col cols="4" left>
            <div class="input-label">Master Password:</div>
          </v-col>
          <v-col cols="8">
            <v-text-field
              v-model="password"
              label="Master Password"
              color="primary"
              
            ></v-text-field>
          </v-col>
        </v-row>
        
        <!-- <v-card-actions class="d-flex justify-center" color="primary"></v-card-actions> -->
         <v-row>
          <v-btn
            absolute
            top 
            :style="{ left: '50%', transform: 'translateX(-50%)'  }"           
            color="primary"
            v-on:click="login()"
            >Unlock</v-btn
          >
         </v-row>
        
      <!-- </v-container> -->
    </v-card-text>
    </v-div>
  </v-card>
   </v-container>
  <!-- </v-dialog> -->
 
 <!-- <v-container class="fill-height fluid align-center justify-center">
    <v-card class="mx-auto px-6 py-9" width="500" height="500" elevation="12">
      
      <v-toolbar height="30">
  
  <v-toolbar-title class="flex text-center"> 
    
    App Initialization
  </v-toolbar-title>
 
</v-toolbar>
     <v-col>
      <v-row>       
      <v-card-subtitle class="text-h6" color="primary"> Hi, Please unlock your local vault </v-card-subtitle>
      </v-row>
     
      <v-card-text>
        <v-row>
          <v-text-field label="Master Password" color="blue"> </v-text-field>
        </v-row>
        <v-spacer/>
        </v-card-text>
        <v-row>            
            <v-btn
              absolute
              top
              :style="{ left: '50%', transform: 'translateX(-50%)' }"
              color="primary"
              v-on:click="login()"
              >unlock</v-btn>          
        </v-row>
      
     </v-col> 
    </v-card>
  </v-container> -->

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
.v-container{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.v-toolbar-title{
  font-size: 19px;
}

</style>
