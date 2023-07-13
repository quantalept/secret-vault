<template>
    <div>
        <v-row pa-1>
            <v-col cols="3" sm="4" align-self="center">
                <v-label >{{props.label}}</v-label>
            </v-col>
            
            <v-col cols="8" sm="6" align-self="center">
                <v-text-field v-model="txtVal" density="compact" variant="solo"
                    :type="props.valueType==='text' || show ?'text':'password'"
                    class="cust-bg-text">

                    <template #append>
                        <v-icon>mdi-content-copy</v-icon>
                        <div style="margin-right: 5px;" ></div>
                        <v-icon @click="show = !show" >{{ props.valueType==='password'? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
                        <div style="margin-right: 5px;" ></div>
                    </template>
                
                </v-text-field>
            </v-col>
            
        </v-row>
    </div>
</template>

<script>
import { ref } from 'vue';
export default {
    props: {
        label: "",
        value: "",
        valueType: ""
    },
    setup(props) {
        const txtVal =  ref("");
        const show = ref(false);
        txtVal.value = props.value;

        return {
            props,
            txtVal,
            show
        }
       
    }

}
</script>

<style scoped>
.cust-bg-text .v-input__control{
    background-color: white !important;
    opacity: 1 !important;
}

</style>