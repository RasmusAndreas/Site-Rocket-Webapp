<template>
    <div class="website">
        <div v-if="websitedata">
            <div class="website__header truncate">
                <div class="website__header__text">{{ websitedata.websiteName }}</div>
                <div class="website__header__fadedtext">({{ websitedata.domain }})</div>
            </div>
            <v-btn v-if="showReport" @click="showShareReport = true">SHARE REPORT</v-btn>
            <v-tabs
            v-model="active"
            slider-color="#CE7631">
                <v-tab ripple @click="showReport = false">
                    Uptime
                </v-tab>
                <v-tab-item v-if="settingsSplit().uptime == 1">
                    <v-card flat class="website-card" v-if="websitedata">
                        <div class="website-card__total-uptime">
                            <total-uptime :uptime="parseFloat(this.upTime()).toFixed(2)" :downtime="parseFloat(100 - this.upTime()).toFixed(2)" />
                        </div>
                        <div class="website-card__week-uptime">
                            <uptime-last-week :uptimes="websitedata.uptimes" header="Uptime - last 7 days"/>
                        </div>
                        <div class="website-card__longest-uptime">
                            <uptime-longest-downtime :uptimes="websitedata.uptimes" header="Longest downtime"/>
                        </div>
                        <div class="website-card__downtime-overview">
                            <uptime-overview :uptimes="websitedata.uptimes" header="Downtime overview"/>
                        </div>
                    </v-card>
                </v-tab-item>
                <v-tab-item v-else>
                    <v-card>
                        Uptime monitoring not activated, go to settings to active it.
                    </v-card>
                </v-tab-item>

                <v-tab ripple @click="showReport = false">
                    SEO
                </v-tab>
                <v-tab-item v-if="settingsSplit().seo == 1">
                    <v-card flat class="website-card" v-if="websitedata">
                        <seo-table :urls="websitedata.urls" header="SEO status"/>
                    </v-card>
                </v-tab-item>
                <v-tab-item v-else>
                    <v-card>
                        SEO monitoring not activated, go to settings to active it.
                    </v-card>
                </v-tab-item>

                <v-tab ripple @click="showReport = false">
                    Loadspeed
                </v-tab>
                <v-tab-item v-if="settingsSplit().loadtime == 1">
                    <v-card flat class="website-card" v-if="websitedata">
                        <loadspeed-quick-insights :urls="allLoadtimesCalc()" header="Quick insight" />
                        <loadspeed-slowest-pages :urls="websitedata.urls" header="Slowest pages" />
                        <loadspeed-overview :urls="websitedata.urls" header="Loadspeed overview" />
                    </v-card>
                </v-tab-item>
                <v-tab-item v-else>
                    <v-card>
                        Loadspeed monitoring not activated, go to settings to active it.
                    </v-card>
                </v-tab-item>

                <v-tab ripple @click="showReport = true">
                    Report
                </v-tab>
                <v-tab-item>
                    <v-card flat>
                        <report :website="websitedata"/>
                    </v-card>
                </v-tab-item>
                <div class="settingsbutton" @click="showSettings = true">
                    <v-icon>settings</v-icon>
                </div>
            </v-tabs>
            <side-panel v-if="showSettings" @closePanel="showSettings = false">
                <website-settings-form :website="websitedata" @updateWebsite="updatedWebsite()"/>
            </side-panel>
            <side-panel v-if="showShareReport" @closePanel="showShareReport = false">
                <share-report :reportLink="websitedata.reportLink" @copyToast="copyToast()" @mailSent="mailSent()"/>
            </side-panel>
            <system-toast :message="shared" @reset="shared = ''" v-if="shared != ''" />
            <system-toast :message="mailsent" @reset="mailsent = ''" v-if="mailsent != ''" />
            <system-toast :message="updatedWebsiteToast" @reset="updatedWebsiteToast = ''" v-if="updatedWebsiteToast != ''" />
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
import ShareReport from '../components/ShareReport.vue';
import SystemToast from '../components/SystemToast.vue';
import Report from '../views/Report.vue';

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
        ShareReport,
        SystemToast,
        Report,
    },
    data () {
      return {
        active: null,
        websitedata: null,
        websites: this.$store.state.websites,
        showSettings: false,
        showReport: false,
        showShareReport: false,
        shared: '',
        mailsent: '',
        updatedWebsiteToast: '',
      }
    },
    methods: {
        navigateTo(path) {
            this.$router.push(path);
        },
        allLoadtimesCalc() {
            var all = [];
            let urls = this.websitedata.urls;
            urls.forEach(url => {
                url.loadtimes.forEach(loadtime => {
                    all.push(parseInt(loadtime.loadtime));
                });
            });
            this.allLoadtimes = all;

            let amountOfLoadtimes = this.allLoadtimes.length;
            let total = 0;
            this.allLoadtimes.forEach(loadtime => {
                total = total + parseInt(loadtime);
            });

            let average = parseFloat((total / amountOfLoadtimes) / 1000).toFixed(2);

            let slowest = parseFloat((Math.max.apply(null, this.allLoadtimes)) / 1000).toFixed(2);
            
            let fastest = parseFloat((Math.min.apply(null, this.allLoadtimes)) / 1000).toFixed(2);

            let insightstats = {fast: fastest, avg: average, slow: slowest};

            return insightstats;
        },
        totalPings() {
            const startDate = new Date(this.websitedata.created_at);
            const dateNow = new Date();
            const diff = dateNow - startDate;
            return diff / 300000;
        },
        downPings() {
            if(this.websitedata.uptimes) {
                let down = 0;
                this.websitedata.uptimes.forEach(uptime => {
                    if (uptime.excludeDowntime == 0) {
                        down++;
                    }
                });
                return down;
            } else {
                return 0;
            }
        },
        upTime() {
            if(this.downPings() > 0) {
                const number = 100 - (this.downPings() / this.totalPings() * 100);
                return number
            } else {
                return 100
            }
        },
        copyToast() {
            this.showShareReport = false;
            this.shared = 'AWESOME! LINK COPIED TO YOUR CLIPBOARD!';
        },
        mailSent() {
            this.showShareReport = false;
            this.mailsent = 'AWESOME! A MAIL HAS BEEN SENT!';
        },
        updatedWebsite() {
            this.showSettings = false;
            this.updatedWebsiteToast = 'AWESOME! YOUR WEBSITE WAS UPDATED';
        },
        settingsSplit() {
            const settingsSplit = this.websitedata.featureSettings.split(';');
            var obj = {};
            for (var i = 0; i < settingsSplit.length; i++) {
                var split = settingsSplit[i].split(':');
                obj[split[0]] = split[1];
            }
            return obj;
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
