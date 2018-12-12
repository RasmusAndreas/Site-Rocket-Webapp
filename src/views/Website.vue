<template>
    <div class="website">
        <div class="website__header">
            <div class="website__header__text">{{ websitedata.websiteName }}</div><div class="website__header__fadedtext">({{ websitedata.domain }})</div>
        </div>
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
                    <loadspeed-quick-insights :urls="websitedata.urls"/>
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
import LoadspeedQuickInsights from '../components/LoadspeedQuickInsights.vue'

export default {
    name: 'website',
    components: {
        LoadspeedQuickInsights,
    },
    data () {
      return {
        active: null,
        websitedata: {},
        websites: {},
      }
    },
    methods: {
        navigateTo(path) {
            this.$router.push(path);
        },
    },
    watch: {
        websites() {
            this.websitedata = this.websites.filter(website => website.id == this.$route.params.id);
            this.websitedata = this.websitedata[0];
        },
        '$route'(to) {
            this.websitedata = this.websites.filter(website => website.id == to.params.id);
            this.websitedata = this.websitedata[0];
        },
    },
    created() {
        this.$store.watch(()=>{
            return this.$store.state.websites
            },
            (newValue)=>{
            //something changed do something
            this.websites = newValue;
            }
        )
    },
}
</script>
