<template>
  <div class="dashboard">
    <div class="dashboard__header">
      <div class="dashboard__header__text">Overview</div>
      <button class="dashboard__header__button button-primary" @click="togglePanel()">ADD NEW</button>
    </div>
    <div v-if="!loading">
      <dashboard-card v-for="website in websites" :key="website.id" :website="website" />
      <div v-if="websites.length == 0">There is no websites yet, to start getting data, go add a new website.</div>
    </div>
    <div class="loadbox" v-else>
      <v-progress-circular
      :size="120"
      :width="7"
      color="#a5a6ac"
      indeterminate
      class="loadbox__spinner"
      >
        <div class="loadbox-label">Comming right up...</div>
      </v-progress-circular>
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
    <system-toast :message="addedNewSuccess" @reset="addedNewSuccess = ''" v-if="addedNewSuccess != ''" />
  </div>
</template>

<script>
import SidePanel from '../components/SidePanel.vue';
import AddNewStepOne from '../components/AddNewStepOne.vue';
import AddNewStepTwo from '../components/AddNewStepTwo.vue';
import AddNewStepThree from '../components/AddNewStepThree.vue';
import AddNewStepFour from '../components/AddNewStepFour.vue';
import SystemToast from '../components/SystemToast.vue';
import DashboardCard from '../components/DashboardCard.vue';

export default {
  name: 'dashboard',
  data() {
    return {
      showPanel: false,
      step: 1,
      name: '',
      domain: '',
      newWebsite: {},
      addedNewSuccess: '',
      loaded: false,
    }
  },
  components: {
    SidePanel,
    AddNewStepOne,
    AddNewStepTwo,
    AddNewStepThree,
    AddNewStepFour,
    SystemToast,
    DashboardCard,
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
      this.addedNewSuccess = 'Wow! One more site added!'
      this.step++;
      this.newWebsite = {};
    },
  },
  computed: {
    websites() {
      return this.$store.state.websites;
    },
    loading() {
      return this.$store.state.loading;
    }
  }
}
</script>
