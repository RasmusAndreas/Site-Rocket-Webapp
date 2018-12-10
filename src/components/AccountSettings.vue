<template>
    <div>
        <h1 class="header-caps">ACCOUNT SETTINGS</h1>
        <p>In the form below you can change your information.</p>
        <v-btn outline @click="logout">SIGN OUT</v-btn>
    </div>
</template>

<script>
export default {
    name: 'account-settings',
    methods: {
        logout() {
            this.$store.dispatch('destroyToken')
            .then(() => {
                this.$router.push({name: 'login' })
            });
        }
    }
}
</script>
