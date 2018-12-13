<template>
    <div class="dashboard-card">
      <div class="dashboard-card__header">
          <div class="websitename">{{ website.websiteName }}</div><div class="websitedomain">({{ website.domain }})</div>
          <div class="websitedetails" @click="navigateTo('/website/' + website.id)">See details<v-icon class="websitedetails__icon">keyboard_arrow_right</v-icon></div>
      </div>
      <div class="dashboard-card__content">
        <div class="dashboard-uptime">
          <total-uptime :uptimes="website.uptimes" :startDate="website.created_at" />
        </div>
        <div class="dashboard-loadspeed">
          <loadspeed-quick-insights :urls="website.urls" header="Loadspeed Summary" />
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
        }
    },
    mounted() {
        //console.log(this.website)
    }
}
</script>
