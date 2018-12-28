<template>
  <div id="app">
    <div v-if="!$route.params.key">
      <div v-if="$store.getters.loggedIn">
        <side-nav />
        <div class="app-container">
          <top-bar />
          <transition name="route-anim">
            <router-view/>
          </transition>
        </div>
      </div>
      <div v-else>
        <header-img/>
        <router-view/>
      </div>
    </div>
    <div v-if="$route.params.key">
      <div class="report">
        <div class="report__inner">
          <report :website="0"/>
        </div>
      </div>
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
