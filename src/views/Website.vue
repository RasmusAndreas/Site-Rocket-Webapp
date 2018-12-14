<template>
    <div class="website">
        <div v-if="websitedata">
            <div class="website__header">
                <div class="website__header__text">{{ websitedata.websiteName }}</div><div class="website__header__fadedtext">({{ websitedata.domain }})</div>
                <v-btn v-if="showReport" @click="showShareReport = true">SHARE REPORT</v-btn>
            </div>
            <v-tabs
            v-model="active"
            slider-color="grey">
                <v-tab ripple @click="showReport = false">
                    Uptime
                </v-tab>
                <v-tab-item>
                    <v-card flat class="website-card" v-if="websitedata">
                        <total-uptime :uptimes="websitedata.uptimes" :startDate="websitedata.created_at" />
                        <uptime-last-week :uptimes="websitedata.uptimes" header="Uptime - last 7 days"/>
                        <uptime-longest-downtime :uptimes="websitedata.uptimes" header="Longest downtime"/>
                        <uptime-overview :uptimes="websitedata.uptimes" header="Downtime overview"/>
                    </v-card>
                </v-tab-item>

                <v-tab ripple @click="showReport = false">
                    SEO
                </v-tab>
                <v-tab-item>
                    <v-card flat class="website-card" v-if="websitedata">
                        <seo-table :urls="websitedata.urls" header="SEO status"/>
                    </v-card>
                </v-tab-item>

                <v-tab ripple @click="showReport = false">
                    Loadspeed
                </v-tab>
                <v-tab-item>
                    <v-card flat class="website-card" v-if="websitedata">
                        <loadspeed-quick-insights :urls="websitedata.urls" header="Quick insight" />
                        <loadspeed-slowest-pages :urls="websitedata.urls" header="Slowest pages" />
                        <loadspeed-overview :urls="websitedata.urls" header="Loadspeed overview" />
                    </v-card>
                </v-tab-item>

                <v-tab ripple @click="showReport = true">
                    Report
                </v-tab>
                <v-tab-item>
                    <v-card flat>
                        <v-card-text>Report</v-card-text>
                    </v-card>
                </v-tab-item>
                <div class="settingsbutton" @click="showSettings = true">
                    <v-icon>settings</v-icon>
                </div>
            </v-tabs>
            <side-panel v-if="showSettings" @closePanel="showSettings = false">
                <website-settings-form :website="websitedata"/>
            </side-panel>
            <side-panel v-if="showShareReport" @closePanel="showShareReport = false">
                SHARE REPORT
            </side-panel>
        </div>
    </div>
</template>

<script>
import LoadspeedQuickInsights from '../components/LoadspeedQuickInsights.vue';
import LoadspeedSlowestPages from '../components/LoadspeedSlowestPages.vue';
import LoadspeedOverview from '../components/LoadspeedOverview.vue';
import TotalUptime from '../components/TotalUptime.vue';
import UptimeLastWeek from '../components/UptimeLastWeek.vue';
import UptimeOverview from '../components/UptimeOverview.vue';
import UptimeLongestDowntime from '../components/UptimeLongestDowntime.vue';
import SeoTable from '../components/SeoTable.vue';
import SidePanel from '../components/SidePanel.vue';
import WebsiteSettingsForm from '../components/WebsiteSettingsForm.vue';

export default {
    name: 'website',
    components: {
        LoadspeedQuickInsights,
        LoadspeedSlowestPages,
        LoadspeedOverview,
        TotalUptime,
        UptimeLastWeek,
        UptimeOverview,
        UptimeLongestDowntime,
        SeoTable,
        SidePanel,
        WebsiteSettingsForm,
    },
    data () {
      return {
        active: null,
        websitedata: null,
        websites: this.$store.state.websites,
        showSettings: false,
        showReport: false,
        showShareReport: false,
      }
    },
    methods: {
        navigateTo(path) {
            this.$router.push(path);
        },
    },
    watch: {
        '$route'(to) {
            this.$store.dispatch('getWebsite', {
                websiteid: to.params.id,
            }).then(response => {
                this.websitedata = response.data[0];
            }).catch(error => {
                this.error = 'E-mail or password is incorrect'
                // eslint-disable-next-line
                console.log(error.response.data.message)
            });
        },
    },
    created() {
        this.$store.dispatch('getWebsite', {
                websiteid: this.$route.params.id,
            }).then(response => {
                this.websitedata = response.data[0];
            }).catch(error => {
                this.error = 'E-mail or password is incorrect'
                // eslint-disable-next-line
                console.log(error.response.data.message)
        });
    }
}
</script>
