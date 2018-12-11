<template>
  <div class="dashboard">
    <div class="dashboard__header">
      <div class="dashboard__header__text">Overview</div>
      <v-btn class="dashboard__header__button" @click="togglePanel()">ADD NEW</v-btn>
    </div>
    <div v-for="website in websites" :key="website.id" class="dashboard-card">
      <div class="dashboard-card__header">
          <div class="websitename">{{ website.websiteName }}</div><div class="websitedomain">({{ website.domain }})</div>
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
    <div class="add-new-website" v-if="showPanel">
      <side-panel v-if="step === 1" @closePanel="showPanel = false">
        <add-new-step-one @nextData="nextData"></add-new-step-one>
      </side-panel>
      <side-panel v-if="step === 2" @closePanel="showPanel = false">
        <add-new-step-two :name="name" :domain="domain"  @nextCreated="nextCreated"></add-new-step-two>
      </side-panel>
      <side-panel v-if="step === 3" @closePanel="showPanel = false">
        <add-new-step-three :newWebsite="newWebsite" @nextIntegrate="nextIntegrate"></add-new-step-three>
      </side-panel>
      <side-panel v-if="step === 4" @closePanel="showPanel = false">
        <add-new-step-four :newWebsite="newWebsite" @nextFinal="nextFinal"></add-new-step-four>
      </side-panel>
    </div>
  </div>
</template>

<script>
import SidePanel from '../components/SidePanel.vue';
import AddNewStepOne from '../components/AddNewStepOne.vue';
import AddNewStepTwo from '../components/AddNewStepTwo.vue';
import AddNewStepThree from '../components/AddNewStepThree.vue';
import AddNewStepFour from '../components/AddNewStepFour.vue';

export default {
  name: 'dashboard',
  data() {
    return {
      showPanel: false,
      step: 1,
      name: '',
      domain: '',
      newWebsite: {},
    }
  },
  components: {
    SidePanel,
    AddNewStepOne,
    AddNewStepTwo,
    AddNewStepThree,
    AddNewStepFour,
  },
  methods: {
    navigateTo(path) {
        this.$router.push(path);
    },
    togglePanel() {
      this.showPanel = true;
      this.step = 1;
    },
    nextData(data) {
      // eslint-disable-next-line
      this.name = data.name;
      this.domain = data.domain;
      this.step++;
    },
    nextCreated(data) {
      this.newWebsite = data.newWebsite;
      this.step++;
    },
    nextIntegrate() {
      this.step++;
    },
    nextFinal() {
      this.step++;
      this.newWebsite = {};
    },
  },
  computed: {
    websites() {
      return this.$store.state.websites;
    },
  }
}
</script>
