<template>
    <side-panel :overlay="true">
        <login-form />
    </side-panel>
</template>

<script>
import SidePanel from '../components/SidePanel.vue';
import LoginForm from '../components/LoginForm.vue';

export default {
    name: 'login',
    data () {
        return {
            message: 'Hello you!',
        }
    },
    components: {
        SidePanel,
        LoginForm,
    }
}
</script>