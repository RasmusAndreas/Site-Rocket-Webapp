<template>
  <div id="app">
    <div v-if="!$route.params.key">
      <div v-if="$store.getters.loggedIn">
        <side-nav />
        <div class="app-container">
          <top-bar />
          <router-view/>
        </div>
      </div>
      <div v-else>
        <header-img/>
        <router-view/>
      </div>
    </div>
    <div v-if="$route.params.key">
      <report :website="0"/>
    </div>
  </div>
</template>

<script>
import './scss/main.scss';
import SideNav from './components/SideNav.vue';
import TopBar from './components/TopBar.vue';
import HeaderImg from './components/HeaderImg.vue';
import Report from './views/Report.vue';

export default {
  name: 'app',
  components: {
    SideNav,
    TopBar,
    HeaderImg,
    Report,
  },
  mounted() {
    if(this.$store.getters.loggedIn) {
      this.$store.dispatch('getWebsites')
      .then(() => {
          this.$store.dispatch('saveUser');
      });
    }
  }
}
</script>
