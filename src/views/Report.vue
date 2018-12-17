<template>
    <div>
        <div v-if="$route.params.key">Report for {{ websiteReport.domain }}</div>
        <div v-if="settingsSplit().uptime == 1">
            <div>Uptime</div>
            <p>
                This is your overview of the uptime status for the current site. The first graph shows the average uptime, since the website was added to Site-Rocket. Next is your overview of uptime the last 7 days.
                At last, you see a graph of the longest downtime period since Site-Rocket startet monitoring the website.
            </p>
        </div>
        <div v-if="settingsSplit().uptime == 1">
            <div class="website-card" v-if="websiteReport">
                <div class="website-card__total-uptime">
                    <total-uptime :uptime="parseFloat(this.upTime()).toFixed(2)" :downtime="parseFloat(100 - this.upTime()).toFixed(2)" />
                </div>
                <div class="website-card__week-uptime">
                    <uptime-last-week :uptimes="websiteReport.uptimes" header="Uptime - last 7 days"/>
                </div>
                <div class="website-card__longest-uptime">
                    <uptime-longest-downtime :uptimes="websiteReport.uptimes" header="Longest downtime"/>
                </div>
            </div>
        </div>

        <div v-if="settingsSplit().seo == 1">
            <div>SEO</div>
            <p>
                The SEO section provides an overview of URL’s that has issues regarding on page SEO.
                The focus is primarily on issues relevant to the content editor of the website. These data can be used as a foundation for prioritizing SEO tasks for existing content.
            </p>
        </div>
        <div v-if="settingsSplit().seo == 1">
            <div class="website-card" v-if="websiteReport">
                <seo-table :urls="websiteReport.urls" header="SEO status"/>
            </div>
        </div>

        <div v-if="settingsSplit().loadtime == 1">
            <div>Loadspeed</div>
            <p>
                The load speed section gives you an overview of the websites average performance. The slowest pages are the ones we suggest as the most important focuspoints at this time.
            </p>
        </div>
        <div v-if="settingsSplit().loadtime == 1">
            <div class="website-card" v-if="websiteReport">
                <loadspeed-quick-insights :urls="allLoadtimesCalc()" header="Quick insight" />
                <loadspeed-slowest-pages :urls="websiteReport.urls" header="Slowest pages" />
                <loadspeed-overview :urls="websiteReport.urls" header="Loadspeed overview" />
            </div>
        </div>

    </div>
</template>

<script>
import LoadspeedQuickInsights from '../components/LoadspeedQuickInsights.vue';
import LoadspeedSlowestPages from '../components/LoadspeedSlowestPages.vue';
import LoadspeedOverview from '../components/LoadspeedOverview.vue';
import TotalUptime from '../components/TotalUptime.vue';
import UptimeLastWeek from '../components/UptimeLastWeek.vue';
import UptimeLongestDowntime from '../components/UptimeLongestDowntime.vue';
import SeoTable from '../components/SeoTable.vue';

export default {
    name: 'report',
    components: {
        LoadspeedQuickInsights,
        LoadspeedSlowestPages,
        LoadspeedOverview,
        TotalUptime,
        UptimeLastWeek,
        UptimeLongestDowntime,
        SeoTable,
    },
    data() {
        return {
            websitedata: this.getWebsite(),
            websiteReport: this.website,
        }
    },
    props: {
        website: {
            required: true,
        },
    },
    methods: {
        getWebsite() {
            if (this.$route.params.key) {
                this.$store.dispatch('getWebsiteReport', {
                    reportKey: this.$route.params.key,
                }).then(response => {
                    // eslint-disable-next-line
                    console.log(response.data[0]);
                    this.websiteReport = response.data[0];
                }).catch(error => {
                    // this.error = 'E-mail or password is incorrect'
                    // eslint-disable-next-line
                    console.log(error.response.data.message)
                });
                return true;
            } else {
                this.websiteReport = this.website;
                return false
            }
        },
        allLoadtimesCalc() {
            var all = [];
            let urls = this.websiteReport.urls;
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
            const startDate = new Date(this.websiteReport.created_at);
            const dateNow = new Date();
            const diff = dateNow - startDate;
            return diff / 300000;
        },
        downPings() {
            if(this.websiteReport.uptimes) {
                let down = 0;
                this.websiteReport.uptimes.forEach(uptime => {
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
        settingsSplit() {
            const settingsSplit = this.websiteReport.featureSettings.split(';');
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
            if(this.$route.params.id) {
                this.$store.dispatch('getWebsite', {
                    websiteid: to.params.id,
                }).then(response => {
                    this.websiteReport = response.data[0];
                }).catch(error => {
                    this.error = 'E-mail or password is incorrect'
                    // eslint-disable-next-line
                    console.log(error.response.data.message)
                });
            }
        },
    },
}
</script>
