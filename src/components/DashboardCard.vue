<template>
    <div class="dashboard-card">
      <div class="dashboard-card__header">
          <div class="websitename">{{ website.websiteName }}</div><div class="websitedomain">(Domæne)</div>
          <div class="websitedetails" @click="seeDetails(website)">See details<v-icon class="websitedetails__icon">keyboard_arrow_right</v-icon></div>
      </div>
      <div class="dashboard-card__content">
        <div class="dashboard-uptime">
          <total-uptime :uptimes="website.uptimes" :startDate="website.created_at" />
        </div>
        <div class="dashboard-loadspeed">
          <p>Loadspeed Summary</p>
          <loadspeed-quick-insights :urls="website.urls"/>
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
        seeDetails(website) {
            this.$router.push({ path: '/website/' + website.id, query: website })
        }
    },
    mounted() {
        //console.log(this.website)
    }
}
</script>
