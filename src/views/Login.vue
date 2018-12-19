<template>
    <side-panel v-if="!$store.getters.loggedIn" :overlay="false" class="mobile-panel">
        <login-form />
    </side-panel>
</template>

<script>
import SidePanel from '../components/SidePanel.vue';
import LoginForm from '../components/LoginForm.vue';

export default {
    name: 'login',
    components: {
        SidePanel,
        LoginForm,
    }
}
</script>