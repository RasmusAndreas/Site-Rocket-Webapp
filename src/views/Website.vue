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
                <v-card flat class="website-card">
                    <div class="website-header">Quick insights</div>
                    <loadspeed-quick-insights :urls="websitedata.urls"/>
                    <loadspeed-slowest-pages :urls="websitedata.urls"/>
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
import LoadspeedQuickInsights from '../components/LoadspeedQuickInsights.vue';
import LoadspeedSlowestPages from '../components/LoadspeedSlowestPages.vue';

export default {
    name: 'website',
    components: {
        LoadspeedQuickInsights,
        LoadspeedSlowestPages,
    },
    data () {
      return {
        active: null,
        websitedata: {},
        websites: this.$store.state.websites,
      }
    },
    methods: {
        navigateTo(path) {
            this.$router.push(path);
        },
    },
    watch: {
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
        );
        this.websitedata = this.websites.filter(website => website.id == this.$route.params.id);
        this.websitedata = this.websitedata[0];
    },
}
</script>
