<template>
    <div>
        <h1 class="header-caps">WEBSITE SETTINGS</h1>
        <p>Use the form below to edit settings for the website.</p>
        <v-form v-model="valid">
            <v-text-field
                v-model="name"
                label="Name"
                required
                ></v-text-field>
            <v-text-field
                v-model="domain"
                label="Domain"
                required
                :disabled="true"
                ></v-text-field>
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
            <v-btn @click.prevent="updateWebsite">UPDATE WEBSITE</v-btn>
            <v-btn @click="confirmDelete" outline>DELETE WEBSITE</v-btn>
        </v-form>
    </div>
</template>

<script>
export default {
    name: 'website-settings-form',
    data() {
        return {
            valid: false,
            name: this.website.websiteName,
            domain: this.website.domain,
            settings: this.settingsSplit(),
            error: '',
            checkuptime: parseInt(this.settingsSplit().uptime),
            checkseo: parseInt(this.settingsSplit().seo),
            checkloadtime: parseInt(this.settingsSplit().loadtime),
            loadspeed: '',
        }
    },
    props: {
        website: {
            required: true,
        },
    },
    methods: {
        updateWebsite() {
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
            this.$store.dispatch('updateWebsite', {
                websiteid: this.$route.params.id,
                settings: this.settings,
                websiteName: this.name,
            }).then(() => {
                this.$emit('updateWebsite');
                this.navigateTo('/website/' + this.$route.params.id);
            }).catch(error => {
                this.error = 'E-mail or password is incorrect'
                // eslint-disable-next-line
                console.log(error.response.data.message)
            });
        },
        settingsSplit() {
            const settingsSplit = this.website.featureSettings.split(';');
            var obj = {};
            for (var i = 0; i < settingsSplit.length; i++) {
                var split = settingsSplit[i].split(':');
                obj[split[0]] = split[1];
            }
            return obj;
        },
        confirmDelete() {
            var sitename = prompt("Please enter the name of the site you want to delete from the system to confirm", "Website name");

            if (sitename == null || sitename == "") {
                let txt = "User cancelled the prompt.";
                // eslint-disable-next-line
                console.log(txt);
            } else if (sitename != this.website.websiteName ) {
                let txt = "WRONG!";
                // eslint-disable-next-line
                console.log(txt);
            } else {
                this.$store.dispatch('deleteWebsite', {
                    websiteid: this.$route.params.id,
                }).then(response => {
                    // eslint-disable-next-line
                    console.log(response.data[0]);
                    this.navigateTo('/');
                }).catch(error => {
                    this.error = 'E-mail or password is incorrect'
                    // eslint-disable-next-line
                    console.log(error.response.data.message)
                });
            }
        },
        navigateTo(path) {
            this.$router.push(path);
        },
    }
}
</script>