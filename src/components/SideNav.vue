<template>
    <!-- <div id="side-nav">
      <router-link class="nav-item" to="/">Home</router-link> |
      <router-link class="nav-item" to="/about">About</router-link> |
      <router-link class="nav-item" to="/login" v-if="!loggedIn">Login</router-link>
      <router-link class="nav-item" to="/login" v-if="loggedIn">Logout</router-link>
    </div> -->
    <v-navigation-drawer permanent height="100vh" class="side-nav">
    <v-toolbar flat class="side-nav__top" :light="false">
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="logo">
            SITEROCKET LOGO
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-divider></v-divider>
    <v-list dense class="pt-0 side-nav__main">
      <v-list-tile
        v-for="item in items"
        :key="item.title"
        @click="navigateTo(item.path)"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <v-list dense class="pt-0">
      <v-list-tile
        v-for="website in websites"
        :key="website.id"
        @click="navigateTo('/website/'.concat(website.id))"
        :class="website.id == $route.params.id ? 'active nav-item': 'nav-item'"
      >

        <v-list-tile-content>
          <v-list-tile-title class="nav-websites">{{ website.websiteName }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>

export default {
    name: 'side-nav',
    data () {
      return {
        items: [
          { title: 'Dashboard', icon: 'dashboard', path: '/' },
          { title: 'Domains', icon: 'question_answer', path: '/' }
        ],
        right: null,
        websites: [],
      }
    },
    computed: {
        loggedIn() {
            return this.$store.getters.loggedIn
        }
    },
    methods: {
        navigateTo(path) {
            this.$router.push(path);
        }
    },
    mounted() {
        this.$store.dispatch('getWebsites')
        .then(websites => {
            this.websites = websites;
            // eslint-disable-next-line
            console.log(websites);
        });
    }
}
</script>






