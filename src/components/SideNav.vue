<template>
    <div class="sidenav">
      <div class="sidenav__logo" @click="navigateTo({ name: 'dashboard' })">
        <svg class="sidenav__logo-img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 152 30.7">
          <g id="Logo" transform="translate(21 -21.2)">
            <text id="Logo-2" data-name="Logo" transform="translate(20 41)" font-size="15" font-family="SourceSansPro-Bold,Source Sans Pro" font-weight="700" letter-spacing=".2em" fill="#fff">
              <tspan x="0" y="0">SITEROCKET</tspan>
            </text>
            <g id="orange-white-white" transform="translate(-21 21.2)">
              <g id="Layer_1" data-name="Layer 1">
                <g id="rocket">
                  <path id="Shape" class="cls-2" d="M18.3 29.6a1.2 1.2 0 0 0 1.7 0l1.8-1.8a9 9 0 0 0 2.7-6.7 15.8 15.8 0 0 0 1.8-1.5c6.1-6.1 6.2-17.9 6.2-18.4a1.2 1.2 0 0 0-.4-.8 1.2 1.2 0 0 0-.9-.4C30.7 0 19 .1 13 6.2A14 14 0 0 0 11.4 8a9.1 9.1 0 0 0-6.7 2.7L3 12.5a1.2 1.2 0 1 0 1.8 1.7l1.8-1.8a6.8 6.8 0 0 1 3.3-1.8 24.3 24.3 0 0 0-1.4 3.5 1.2 1.2 0 0 0 .3 1.3l3.3 3.3-1.4 1.5a1.3 1.3 0 0 0 1.8 1.7l1.4-1.4 3.4 3.4a1.4 1.4 0 0 0 1.2.3 22 22 0 0 0 3.5-1.4A6.7 6.7 0 0 1 20 26l-1.8 1.8a1.2 1.2 0 0 0 0 1.8zm0-8l-2.8-2.9 1.5-1.4a1.2 1.2 0 1 0-1.8-1.8L13.8 17 11 14.2a19.5 19.5 0 0 1 2-4 .9.9 0 0 0 .2-.3A13.3 13.3 0 0 1 14.7 8C18.9 3.8 26.8 2.8 30 2.6c-.2 3.1-1.2 11-5.5 15.3a16.9 16.9 0 0 1-6.2 3.6z" transform="translate(-1.8)"/>
                  <path id="Shape-2" data-name="Shape" class="cls-2" d="M53.4 20.9a4.5 4.5 0 1 0 6.3 0 4.5 4.5 0 0 0-6.3 0zm4.5 1.8a2 2 0 0 1 0 2.8 2 2 0 0 1-2.8 0 2 2 0 0 1 2.8-2.8z" transform="translate(-36.2 -13.6)"/>
                  <path id="Shape-3" data-name="Shape" class="cls-3" d="M2.1 56l3-3a1.2 1.2 0 1 0-1.8-1.7l-3 3a1.2 1.2 0 0 0 0 1.7 1.2 1.2 0 0 0 1.8 0z" transform="translate(0 -35.4)"/>
                  <path id="Shape-4" data-name="Shape" class="cls-3" d="M34.2 88.2l3-3a1.2 1.2 0 0 0-1.8-1.8l-3 3a1.2 1.2 0 0 0 1.8 1.8z" transform="translate(-22.3 -57.8)"/>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </div>
      <div class="sidenav__list">
        <div class="sidenav__item"
          :class="index == 0 && !$route.params.id ? 'active': ''"
          v-for="(item, index) in items"
          :key="index"
          @click="navigateTo(item.path)"
        >
          <div class="sidenav__icon">
            <v-icon>{{ item.icon }}</v-icon>
          </div>
          <div class="sidenav__label">
            {{ item.title }}
          </div>
        </div>
      </div>
      <div class="sidenav__sublist" v-if="!loading">
        <div class="sidenav__subitem"
          v-for="website in websites"
          :key="website.id"
          @click="navigateTo('/website/'.concat(website.id))"
          :class="website.id == $route.params.id ? 'active nav-item': 'nav-item'"
        >{{ website.websiteName }}</div>
      </div>
      <div class="loadbox" v-else>
        <v-progress-circular
          :size="40"
          :width="4"
          color="#fff"
          indeterminate
          class="loadbox__spinner"
          >
          <div class="loadbox-label"></div>
        </v-progress-circular>
      </div>
    </div>
</template>

<script>

export default {
    name: 'side-nav',
    data () {
      return {
        items: [
          { title: 'Dashboard', icon: 'home', path: '/' },
          { title: 'Domains', icon: 'public', path: '/' }
        ],
        right: null,
      }
    },
    computed: {
        loggedIn() {
            return this.$store.getters.loggedIn;
        },
        websites() {
          return this.$store.state.websites;
        },
        loading() {
          return this.$store.state.loading;
        }
    },
    methods: {
        navigateTo(path) {
            this.$router.push(path);
        },
    },
}
</script>






