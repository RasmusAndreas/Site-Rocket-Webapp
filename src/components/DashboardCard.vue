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
          <total-uptime :uptime="parseFloat(this.upTime()).toFixed(2)" :downtime="parseFloat(100 - this.upTime()).toFixed(2)" />
        </div>
        <div class="dashboard-loadspeed">
          <loadspeed-quick-insights :urls="allLoadtimesCalc()" header="Loadspeed Summary" />
        </div>
        <div class="dashboard-seo">
          <latest-seo :urls="website.urls" />
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
    },
    mounted() {
        //console.log(this.website)
    }
}
</script>
