<template>
    <div>
        <h1 class="header-caps">MONITOR SETTINGS</h1>
        <p>Choose which features you want enabled for the domain.</p>
        <v-form v-model="valid">
            <v-checkbox
                v-model="checkuptime"
                label="Enable uptime"
                required
            ></v-checkbox>
            <v-checkbox
                v-model="checkseo"
                label="Enable SEO"
                required
            ></v-checkbox>
            <v-checkbox
                v-model="checkloadtime"
                label="Enable Loadtime"
                required
            ></v-checkbox>
            <vue-slide-bar v-model="maxloadspeed"
            :min="1"
            :max="10"
            :data="increments"
            v-if="checkloadtime"
            />
            <div v-if="error">{{ error }}</div>
            <v-btn 
                @click.prevent="next"
                >NEXT STEP</v-btn>
        </v-form>
    </div>
</template>

<script>
import VueSlideBar from 'vue-slide-bar';

export default {
    name: 'add-new-step-two',
    data() {
        return {
            checkuptime: true,
            checkseo: true,
            checkloadtime: true,
            valid: false,
            error: '',
            loadspeed: '',
            maxloadspeed: 0,
            increments: [
                1,1.2,1.4,1.6,1.8,
                2.0,2.2,2.4,2.6,2.8,
                3.0,3.2,3.4,3.6,3.8,
                4.0,4.2,4.4,4.6,4.8,
                5.0,5.2,5.4,5.6,5.8,
                6.0,6.2,6.4,6.6,6.8,
                7.0,7.2,7.4,7.6,7.8,
                8.0,8.2,8.4,8.6,8.8,
                9.0,9.2,9.4,9.6,9.8,
                10.0
            ],
            settings: '',
        }
    },
    components: {
        VueSlideBar,
    },
    methods: {
        next() {
            this.settings = '';
            // uptime
            if (this.checkuptime) {
                this.settings = this.settings + 'uptime:1;';
            } else {
                this.settings = this.settings + 'uptime:0;';
            }
            // seo
            if (this.checkseo) {
                this.settings = this.settings + 'seo:1;';
            } else {
                this.settings = this.settings + 'seo:0;';
            }
            // loadspeed
            if (this.checkloadtime) {
                this.settings = this.settings + 'loadtime:1;';
            } else {
                this.settings = this.settings + 'loadtime:0;';
                this.maxloadspeed = 0;
            }
            // max loadspeed
            if (this.maxloadspeed !== 0) {
                this.settings = this.settings + 'maxload:' + (this.maxloadspeed * 1000) + ';';
            }
            this.$store.dispatch('addWebsite', {
                websiteName: this.name,
                domain: this.domain,
                featureSettings: this.settings,
                reportLink: 'NEEDS TO BE DONE',
            }).then(response => {
                this.$emit('nextCreated', {newWebsite: response.data});
            }).catch(error => {
                this.error = 'E-mail or password is incorrect'
                // eslint-disable-next-line
                console.log(error.response.data.message)
            })
        }
    },
    props: {
        name: {
            type: String,
            required: true,
            default: '',
        },
        domain: {
            type: String,
            required: true,
            default: '',
        },
    },
}
</script>

