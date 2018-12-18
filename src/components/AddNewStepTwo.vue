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
            <div v-if="error">{{ error }}</div>
            <a class="button-primary float-left" 
                @click.prevent="next"
                >NEXT STEP</a>
        </v-form>
    </div>
</template>

<script>
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
            settings: '',
        }
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
                this.settings = this.settings + 'loadtime:1';
            } else {
                this.settings = this.settings + 'loadtime:0';
                this.maxloadspeed = 0;
            }
            this.$store.dispatch('addWebsite', {
                websiteName: this.name,
                domain: this.domain,
                featureSettings: this.settings,
                reportLink: this.randomString(8),
            }).then(response => {
                this.$emit('nextCreated', {newWebsite: response.data});
            }).catch(error => {
                this.error = 'E-mail or password is incorrect'
                // eslint-disable-next-line
                console.log(error.response.data.message)
            })
        },
        randomString(amount) {
            var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
            var string_length = amount;
            var randomstring = '';
            var date = new Date();
            var timestamp = date.getTime();
            for (var i=0; i<string_length; i++) {
                var rnum = Math.floor(Math.random() * chars.length);
                randomstring += chars.substring(rnum,rnum+1);
            }
            return randomstring + timestamp;
        },
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

