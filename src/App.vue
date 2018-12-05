<template>
  <div id="app">
    <side-nav />
    <div class="container">
      <top-bar />
      <router-view/>
    </div>
  </div>
</template>

<script>
import './scss/main.scss';
import SideNav from './components/SideNav.vue';
import TopBar from './components/TopBar.vue';

export default {
  name: 'app',
  components: {
    SideNav,
    TopBar,
  },
}
</script>
