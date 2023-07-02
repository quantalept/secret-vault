<template>
    <!-- <v-app> -->
    <v-toolbar color="surface">
        <v-toolbar-title>First Application</v-toolbar-title>
    </v-toolbar>
    <div>
        <v-form>
            <v-text-field v-model="loginInfo.username" label="Username" bg-color="info" />
            <v-text-field v-model="loginInfo.password" label="Password" bg-color="info" />
            <v-btn color="customColor3">Login</v-btn>
            <v-btn color="customColor4">Green</v-btn>
            <v-btn color="customColor4">Primary</v-btn>
        </v-form>
    </div>

    <!-- </v-app> -->
</template>
<script>


export default {
    data() {
        return {
            loginInfo: {
                username: '',
                password: '',
            }
        }
    },
}
</script>
