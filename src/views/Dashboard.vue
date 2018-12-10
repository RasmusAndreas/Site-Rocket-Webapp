<template>
  <div class="dashboard">
    <div class="dashboard__header">
      <div class="dashboard__header__text">Overview</div>
      <v-btn class="dashboard__header__button">ADD NEW</v-btn>
    </div>
    <div v-for="website in websites" :key="website.id" class="dashboard-card">
      <div class="dashboard-card__header">
          <div class="websitename">{{ website.websiteName}}</div><div class="websitedomain">({{ website.domain }})</div>
          <div @click="navigateTo('/website/'+website.id)" class="websitedetails">See details<v-icon class="websitedetails__icon">keyboard_arrow_right</v-icon></div>
      </div>
      <div class="dashboard-card__content">
        <div class="dashboard-uptime">
          <p class="dashboard-card__content-header">Total uptime</p>
        </div>
        <div class="dashboard-loadspeed">
          <p>Loadspeed Summary</p>
        </div>
        <div class="dashboard-seo">
          <p>Latest SEO issues</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'dashboard',
  components: {
    
  },
  methods: {
    navigateTo(path) {
        this.$router.push(path);
    },
  },
  computed: {
    websites() {
      return this.$store.state.websites;
    }
  }
}
</script>
