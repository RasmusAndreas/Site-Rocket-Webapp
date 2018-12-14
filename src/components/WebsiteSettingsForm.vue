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
            <vue-slide-bar v-model="maxloadspeed"
            :min="1"
            :max="10"
            :data="increments"
            v-if="checkloadtime"
            />
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
                this.settings = this.settings + 'loadtime:1;';
            } else {
                this.settings = this.settings + 'loadtime:0;';
                this.maxloadspeed = 0;
            }
            // max loadspeed
            if (this.maxloadspeed !== 0) {
                this.settings = this.settings + 'maxload:' + (this.maxloadspeed * 1000) + ';';
            }
            alert(this.name + ' ' + this.domain + ' ' + this.settings);
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
                // eslint-disable-next-line
                console.log('Deleted');
            }
        }
    }
}
</script>