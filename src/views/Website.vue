<template>
    <div class="website">
        <div v-if="websitedata">
            <div class="website__header">
                <div class="website__header__text">{{ websitedata.websiteName }}</div><div class="website__header__fadedtext">({{ websitedata.domain }})</div>
            </div>
            <v-tabs
            v-model="active"
            slider-color="grey">
                <v-tab ripple>
                    Uptime
                </v-tab>
                <v-tab-item>
                    <v-card flat class="website-card">
                        <website-uptime />
                    </v-card>
                </v-tab-item>

                <v-tab ripple>
                    SEO
                </v-tab>
                <v-tab-item>
                    <v-card flat>
                        <v-card-text>SEO</v-card-text>
                    </v-card>
                </v-tab-item>

                <v-tab ripple>
                    Loadspeed
                </v-tab>
                <v-tab-item>
                    <v-card flat class="website-card" v-if="websitedata">
                        <loadspeed-quick-insights :urls="websitedata.urls" header="Quick insight" />
                        <loadspeed-slowest-pages :urls="websitedata.urls" header="Slowest pages" />
                        <loadspeed-overview :urls="websitedata.urls" header="Loadspeed overview" />
                    </v-card>
                </v-tab-item>

                <v-tab ripple>
                    Report
                </v-tab>
                <v-tab-item>
                    <v-card flat>
                        <v-card-text>Report</v-card-text>
                    </v-card>
                </v-tab-item>
                <div class="settingsbutton" @click="navigateTo('/website/'+ $route.params.id +'/settings')">
                    <v-icon>settings</v-icon>
                </div>
            </v-tabs>
        </div>
    </div>
</template>

<script>
import LoadspeedQuickInsights from '../components/LoadspeedQuickInsights.vue';
import LoadspeedSlowestPages from '../components/LoadspeedSlowestPages.vue';
import LoadspeedOverview from '../components/LoadspeedOverview.vue';
import WebsiteUptime from '../components/WebsiteUptime.vue';

export default {
    name: 'website',
    components: {
        LoadspeedQuickInsights,
        LoadspeedSlowestPages,
        LoadspeedOverview,
        WebsiteUptime,
    },
    data () {
      return {
        active: null,
        websitedata: null,
        websites: this.$store.state.websites,
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
