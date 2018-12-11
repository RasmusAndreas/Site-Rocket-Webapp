<template>
    <div class="top-bar">
        <div class="top-bar__search" @click="toggleSearch">
            <div class="search-icon">
                <i class="material-icons search">
                    search
                </i>
            </div>
            <div class="search-label">Search domains</div>
        </div>
        <div class="account" @click="toggleAccount">
            <div class="account-text">Your account</div>
            <div class="account-icon">
                <i class="material-icons person">
                    person
                </i>
            </div>
        </div>
        <side-panel v-if="showAccount" :overlay="true" @closePanel="showAccount = false">
            <account-settings @accountSaved="accountSaved" />
        </side-panel>
        <domain-search v-if="showSearch" @closeSearch="showSearch = false" />
        <system-toast :message="toastMessage" @reset="toastMessage = ''" v-if="toastMessage != ''" />
    </div>
</template>

<script>
import SidePanel from './SidePanel.vue';
import AccountSettings from './AccountSettings.vue';
import DomainSearch from './DomainSearch.vue';
import SystemToast from './SystemToast.vue';

export default {
    name: 'top-bar',
    components: {
        SidePanel,
        AccountSettings,
        DomainSearch,
        SystemToast,
    },
    data() {
        return {
            showAccount: false,
            showSearch: false,
            toastMessage: '',
        }
    },
    methods: {
        toggleAccount() {
            this.showAccount = true
        },
        toggleSearch() {
            this.showSearch = true
        },
        accountSaved(message) {
            this.showAccount = false;
            this.toastMessage = message;
        }
    }
}
</script>
