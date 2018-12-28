<template>
    <div>
        <h1 class="header-caps">BLAST OFF!</h1>
        <p>The website is now added, and ready to receive data.</p>
        <table class="sidepanel__form">
            <tr>
                <td>Website name:</td>
                <td>{{ newWebsite.websiteName }}</td>
            </tr>
            <tr>
                <td>Domain:</td>
                <td>{{ newWebsite.domain }}</td>
            </tr>
            <tr>
                <td>Uptime</td>
                <td v-if="settings.uptime == 1">Enabled</td>
                <td v-else-if="settings.uptime == 0">Disabled</td>
            </tr>
            <tr>
                <td>Seo</td>
                <td v-if="settings.seo == 1">Enabled</td>
                <td v-else-if="settings.seo == 0">Disabled</td>
            </tr>
            <tr>
                <td>Loadspeed</td>
                <td v-if="settings.loadtime == 1">Enabled</td>
                <td v-else-if="settings.loadtime == 0">Disabled</td>
            </tr>
            <tr v-if="settings.maxload">
                <td>Max. loadspeed</td>
                <td>{{ settings.maxload / 1000 }} seconds</td>
            </tr>
        </table>
        <p>To start receiving data, make sure to integrate the SiteRocket tracking script on your website.</p>
        <a class="button-outline-primary float-left" @click="navigateTo('/website/'+newWebsite.id+'/settings')">Change settings</a>
        <a class="button-primary float-left twobutton-margin" @click="next">Integration</a>
    </div>
</template>

<script>
export default {
    name: 'add-new-step-three',
    methods: {
        next() {
            this.$emit('nextIntegrate');
        },
        navigateTo(path) {
            this.$router.push(path);
        },
    },
    props: {
        newWebsite: {
            type: Object,
            required: true,
        }
    },
    computed: {
        settings() {
            const settingsSplit = this.newWebsite.featureSettings.split(';');
            var obj = {};
            for (var i = 0; i < settingsSplit.length; i++) {
                var split = settingsSplit[i].split(':');
                obj[split[0]] = split[1];
            }
            return obj;
        }
    },
}
</script>

