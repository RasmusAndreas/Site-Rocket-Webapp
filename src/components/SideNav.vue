<template>
    <div id="side-nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login" v-if="!loggedIn">Login</router-link>
      <router-link to="/login" v-if="loggedIn">Logout</router-link>
    </div>
</template>

<script>

export default {
    name: 'side-nav',
    computed: {
        loggedIn() {
            return this.$store.getters.loggedIn
        }
    }
}
</script>





