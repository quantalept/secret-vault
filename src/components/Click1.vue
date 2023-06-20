<template>
    <v-container class='main-container'>
        <v-row style="height:100%">
            <v-card class='card__categories' height="100%">               

                <v-list-item-group >
                    <v-list-item v-for="(CategoryDesc, index) in Category_Description" :key="index" elevation="2"
                        :color="isClicked(CategoryDesc) ? 'yellow' : ''"
                        
                        @click="clickedDesc(CategoryDesc), groupOpened = 'true'">

                        <v-row class='card__categories_description'>
                            <v-list-item-title>
                                <v-col md="2">
                                    <v-list-item-icon>

                                        <v-icon :icon="CategoryDesc.icon"></v-icon>

                                    </v-list-item-icon>
                                </v-col>
                            </v-list-item-title>

                            <v-col md="6">
                                <v-list-item-title>
                                    {{ CategoryDesc.title }}
                                </v-list-item-title>
                                <v-list-item-title>
                                    {{ CategoryDesc.Desc }}
                                </v-list-item-title>
                            </v-col>
                        </v-row>
                    </v-list-item>

                </v-list-item-group>
            </v-card>



        </v-row>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            selectedDesc: "",
            selectedCategory:'',
            Category_Description: [
                {
                    title: "Netflix",
                    Desc: "website:https://netflix.com",
                    icon: "mdi-alpha-n",
                },
                {
                    title: "Server DB",
                    Desc: "Credential",
                    icon: "mdi-alpha-s"
                },
                {
                    title: "Google",
                    Desc: "website:https://gmail.com",
                    icon: "mdi-alpha-g",
                },
                {
                    title: "API Token",
                    Desc: "token",
                    icon: "mdi-alpha-a"
                },
            ],
        };
    },
    methods: {

        clickedDesc(clicked_desc) {
            //this.groupOpened='true';
            this.selectedDesc = clicked_desc;
            console.log("selected description is+++ " + this.selectedDesc);
        },
        isClicked(clickeddesc) {
            //this.groupOpened='true';  
            return clickeddesc === this.selectedDesc;
        },
    },

};
</script>
<style scoped>
.v-main .main-container {
  margin-top: 0px;
  height: calc(100vh - 35px);
  padding: 0px;
}

.v-list-subheader {
  color: black;
  font-size: 18px;
  background: rgb(176, 196, 222);
  font-weight: bold;
}

.card__all-vaults {
  border-left: 2px solid #848884;
  background-color: darkgrey;

}

.card__categories {
  margin-left: 0px;
  border-left: 2px solid #848884;
  background-color: rgb(192, 192, 192);
}

.card__credential {
  border-left: 2px solid#848884;
  border-right: 2px solid #848884;
  background-color: rgb(224, 224, 224);
}

.v-list {
  background-color: darkgrey;
  border: 2px;
}

.card__credential_label {
  font-weight: bold;
  color: rgb(0, 0, 0);
}

.title-field {
  margin-top: 2px;
  margin-bottom: 2px;
  margin-left: 53px;
  margin-right: -37px;
  font-weight: bold;
  color: black;
}

.user-field {
  margin-top: 18px;
  margin-left: 1px;
  margin-right: 13px;
  font-weight: bold;
  color: black;
}

.password-field {
  margin-top: -10px;
  margin-left: 10px;
  margin-right: -37px;
  font-weight: bold;
  color: black;
}

.v-container {
  max-width: 100%;
  padding: 13px;
  margin-top: 30px;
}

.card__categories_description {
  
  height: 80px;
  margin-top: 3px;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;

}
.SelectedTile:hover {  
   
  color: rgb(128, 44, 11); 
  border-color: rgb(178, 233, 165);
  border-width: 5px;
  background-color: rgb(131, 223, 230);
  border-radius: 5px;
}
.SelectedTile-active {
  border-radius: 4px;
  background: rgba(232, 235, 231, 0.815);
}
</style>
