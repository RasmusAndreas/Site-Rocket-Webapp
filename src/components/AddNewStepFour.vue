<template>
    <div>
        <h1 class="header-caps">INTEGRATION</h1>
        <p>Use the snippet below to integrate the monitoring on your website.</p>
        <v-textarea
            @focus="$event.target.select()"
            readonly
            :rows="13"
            class="snippet"
            name="input-7-1"
            label="Integration snippet"
            :value="snippet"
        ></v-textarea>
        <p>The snippet has to be inserted before the &#60;/body> on all pages that needs to be tracked.</p>
        <a class="button-primary float-left" @click="next">Done</a>
    </div>
</template>

<script>
export default {
    name: 'add-new-step-four',
    data() {
        return {
            apikey: this.$store.state.user.apikey,
        }
    },
    methods: {
        next() {
            this.$emit('nextFinal');
        }
    },
    computed: {
        snippet() {
            const startcomment = '<!-- Start Site-Rocket Tracking Pixel -->';
            const loadtime = '<script>window.onload=function(){var loadTime = window.performance.timing.domComplete-window.performance.timing.navigationStart;';
            const vars = "var websiteID='" + this.newWebsite.id + "';var apiKey = '" + this.apikey + "';var pixelUrl='http://sovid.dk/scraper.php';";
            const addscript = 'document.getElementById'+'('+'"siterocket"'+')'+'.src=pixelUrl+"?website="+websiteID+"&apikey="+apiKey+"&loadtime="+loadTime;'+'}'+''+'<'+'/script>';
            const image = '<img style="opacity: 0;" id="siterocket" />';
            const endingcomment = '<!-- End Site-Rocket Tracking Pixel -->';
            const completescript = startcomment + loadtime + vars + addscript + image + endingcomment;
            return completescript;
        }
    },
    props: {
        newWebsite: {
            type: Object,
            required: true,
        }
    },
}
</script>

