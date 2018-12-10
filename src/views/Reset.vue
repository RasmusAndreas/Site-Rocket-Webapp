<template>
  <side-panel :overlay="false">
        <reset-form />
    </side-panel>
</template>

<script>
import SidePanel from '../components/SidePanel.vue';
import ResetForm from '../components/ResetForm.vue';

export default {
  name: 'forgot',
  components: {
        SidePanel,
        ResetForm,
    }
}
</script>
