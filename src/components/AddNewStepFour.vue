<template>
    <div>
        <h1 class="header-caps">INTEGRATION</h1>
        <p>Use the snippet below to integrate the monitoring on your website.</p>
        <v-textarea
            readonly
            :rows="13"
            class="snippet"
            name="input-7-1"
            label="Integration snippet"
            value="<!-- Start Site-Rocket Tracking Pixel -->
    <script>window.onload=function(){var loadTime = window.performance.timing.domComplete-window.performance.timing.navigationStart;var websiteID='3';var apiKey = '241XeOQLeSnxGUKx3AbOr4iedpQvd0dsith1543237346';var pixelUrl='http://sovid.dk/scraper.php';document.getElementById('siterocket').src=pixelUrl+'?website='+websiteID+'&apikey='+apiKey+'&loadtime='+loadTime;}</script>
    <img style='opacity: 0;' id='siterocket' />
    <!-- End Site-Rocket Tracking Pixel -->"
        ></v-textarea>
        <p>The snippet has to be inserted before the &#60;/body> on all pages that needs to be tracked.</p>
        <v-btn @click="next">Done</v-btn>
    </div>
</template>

<script>
export default {
    name: 'add-new-step-four',
    methods: {
        next() {
            this.$emit('next');
        }
    },
}
</script>

