<template>
    <v-card style="height: 100%" color="primary">
        <v-list bg-color="primary">
            <v-col>
                <v-text-field placeholder="Search Items..." bg-color="white" variant="solo"></v-text-field>
            </v-col>
            <v-list-item v-for="(Catelogues, index) in ListedCatalogue" :key="index" elevation="1" class="listed-catalogue"
                :class="{ 'selected-catalogue': isClicked(Catelogues) }" @click="clickedDesc(Catelogues)">                
                <v-row>
                    <v-list-item-title>
                        <v-col>
                            <v-list-item-icon>
                                <v-icon :icon="Catelogues.icon"></v-icon>
                            </v-list-item-icon>
                        </v-col>
                    </v-list-item-title>
                    <v-col>
                        <v-list-item-title style="font-weight:bold;color:black;"> {{ Catelogues.title }}</v-list-item-title>
                        <v-list-item-title> {{ Catelogues.Desc }} </v-list-item-title>
                    </v-col>
                </v-row>
            </v-list-item>
        </v-list>
    </v-card>
</template>
<script>

export default {
    
    data() {
        return {
            selectedCategory: "",
            groupOpened: false,
            selectedDesc: "",
            ListedCatalogue: [
                {
                    title: "Netflix",
                    Desc: "Website: https://netflix.com",
                    icon: "mdi-alpha-n",
                },
                {
                    title: "Server DB",
                    Desc: "Credential",
                    icon: "mdi-alpha-s"
                },
                {
                    title: "Google",
                    Desc: "Website: https://gmail.com",
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
            this.selectedDesc = clicked_desc;
        },
        isClicked(clickeddesc) {
            return clickeddesc === this.selectedDesc;
        },
    },
    
};
</script>
<style scoped>
.listed-catalogue {
    margin-left: 7vh;
    margin-right: 7vh;
    margin-bottom: 14px;
    height: 10vh;
}
.selected-catalogue {
    border: 3px solid #6082B6;
}
</style>