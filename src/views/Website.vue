<template>
    <div class="website">
        <v-tabs
        v-model="active"
        slider-color="grey">
            <v-tab ripple>
                Uptime
            </v-tab>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>Uptime</v-card-text>
                </v-card>
            </v-tab-item>

            <v-tab ripple>
                SEO
            </v-tab>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>SEO</v-card-text>
                </v-card>
            </v-tab-item>

            <v-tab ripple>
                Loadspeed
            </v-tab>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>Loadspeed</v-card-text>
                </v-card>
            </v-tab-item>

            <v-tab ripple>
                Report
            </v-tab>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>Report</v-card-text>
                </v-card>
            </v-tab-item>
            <div class="settingsbutton" @click="navigateTo('/website/'+ $route.params.id +'/settings')">
                <v-icon>settings</v-icon>
            </div>
        </v-tabs>
    </div>
</template>

<script>
export default {
    name: 'website',
    data () {
      return {
        active: null,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
    },
    methods: {
        navigateTo(path) {
            this.$router.push(path);
        },
    }
}
</script>
