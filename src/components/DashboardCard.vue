<template>
    <div class="dashboard-card">
      <div class="dashboard-card__header" @click="navigateTo('/website/' + website.id)">
        <div style="overflow: hidden" class="truncate">
            <div class="websitename">{{ website.websiteName }}</div>
            <div class="websitedomain">({{ website.domain }})</div>
            <div class="websitedetails">See details<v-icon class="websitedetails__icon">keyboard_arrow_right</v-icon></div>
        </div>
      </div>
      <div class="dashboard-card__content">
        <div class="dashboard-uptime">
          <total-uptime :uptime="parseFloat(this.upTime()).toFixed(2)" :downtime="parseFloat(100 - this.upTime()).toFixed(2)" v-if="settingsSplit().uptime == 1" />
          <div class="dashboard-card__no-data" v-else>Uptime monitoring not activated, go to settings to activate it.</div>
        </div>
        <div class="dashboard-loadspeed">
          <loadspeed-quick-insights :urls="allLoadtimesCalc()" header="Loadspeed Summary" v-if="settingsSplit().loadtime == 1" />
          <div class="dashboard-card__no-data" v-else>Loadspeed monitoring not activated, go to settings to activate it.</div>
        </div>
        <div class="dashboard-seo">
          <latest-seo :urls="website.urls" v-if="settingsSplit().seo == 1" />
          <div v-else class="dashboard-card__no-data">SEO monitoring not activated, go to settings to activate it.</div>
        </div>
      </div>
    </div>
</template>

<script>
import TotalUptime from './TotalUptime.vue';
import LatestSeo from './LatestSeo.vue';
import LoadspeedQuickInsights from './LoadspeedQuickInsights.vue';

export default {
    name: 'dashboard-card',
    components: {
        TotalUptime,
        LatestSeo,
        LoadspeedQuickInsights,
    },
    props: {
        website: {
            type: Object,
            required: true,
        },
    },
    methods: {
        navigateTo(path) {
            this.$router.push(path);
        },
        allLoadtimesCalc() {
            var all = [];
            let urls = this.website.urls;
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
            const startDate = new Date(this.website.created_at);
            const dateNow = new Date();
            const diff = dateNow - startDate;
            return diff / 300000;
        },
        downPings() {
            if(this.website.uptimes) {
                let down = 0;
                this.website.uptimes.forEach(uptime => {
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
        settingsSplit() {
            const settingsSplit = this.website.featureSettings.split(';');
            var obj = {};
            for (var i = 0; i < settingsSplit.length; i++) {
                var split = settingsSplit[i].split(':');
                obj[split[0]] = split[1];
            }
            return obj;
        },
    },
    mounted() {
        //console.log(this.website)
    }
}
</script>
