<template>
  <div id="app">
    <div v-if="$store.getters.loggedIn">
      <side-nav />
      <div class="container">
        <top-bar />
        <router-view/>
      </div>
    </div>
    <div v-if="!$store.getters.loggedIn">
      <header-img/>
      <router-view/>
    </div>
  </div>
</template>

<script>
import './scss/main.scss';
import SideNav from './components/SideNav.vue';
import TopBar from './components/TopBar.vue';
import HeaderImg from './components/HeaderImg.vue';

export default {
  name: 'app',
  components: {
    SideNav,
    TopBar,
    HeaderImg,
  },
}
</script>
