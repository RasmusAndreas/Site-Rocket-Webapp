<template>
    <side-panel :overlay="false">
        <signup-form />
    </side-panel>
</template>

<script>
import SidePanel from '../components/SidePanel.vue';
import SignupForm from '../components/SignupForm.vue';

export default {
    name: 'sign-up',
    components: {
        SidePanel,
        SignupForm,
    }

}
</script>
