<template>
  <side-panel :overlay="false">
        <forgot-form />
    </side-panel>
</template>

<script>
import SidePanel from '../components/SidePanel.vue';
import ForgotForm from '../components/ForgotForm.vue';

export default {
  name: 'forgot',
  components: {
        SidePanel,
        ForgotForm,
    }
}
</script>
