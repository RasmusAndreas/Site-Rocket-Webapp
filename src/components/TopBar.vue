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
            <account-settings />
        </side-panel>
        <domain-search v-if="showSearch" @closeSearch="showSearch = false" />
    </div>
</template>

<script>
import SidePanel from './SidePanel.vue';
import AccountSettings from './AccountSettings.vue';
import DomainSearch from './DomainSearch.vue';

export default {
    name: 'top-bar',
    components: {
        SidePanel,
        AccountSettings,
        DomainSearch,
    },
    data() {
        return {
            showAccount: false,
            showSearch: false,
        }
    },
    methods: {
        toggleAccount() {
            this.showAccount = true
        },
        toggleSearch() {
            this.showSearch = true
        }
    }
}
</script>
