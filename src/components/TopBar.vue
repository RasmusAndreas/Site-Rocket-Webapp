<template>
    <div>
        <div>input here</div>
        <div class="account" @click="toggleAccount">
            <div class="account-text">Your account</div>
            <div class="account-icon">
                <i class="material-icons">
                    person
                </i>
            </div>
        </div>
        <side-panel v-if="showAccount" :overlay="true" @closePanel="showAccount = false">
            <account-settings />
        </side-panel>
    </div>
</template>

<script>
import SidePanel from './SidePanel.vue';
import AccountSettings from './AccountSettings.vue';

export default {
    name: 'top-bar',
    components: {
        SidePanel,
        AccountSettings,
    },
    data() {
        return {
            showAccount: false,
        }
    },
    methods: {
        toggleAccount() {
            this.showAccount = true
        }
    }
}
</script>
