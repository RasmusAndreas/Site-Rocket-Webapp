<template>
    <div class="latest-seo" v-if="urls">
        <div class="latest-seo__header">Latest SEO issues</div>
        <latest-seo-item v-for="url in urls.slice(0, 5).reverse()" :key="url.id" :url="url"/>
    </div>
    <div class="latest-seo" v-else>
        <div class="latest-seo__header">Latest SEO issues</div>
        <p>No data yet</p>
    </div>
</template>

<script>
import LatestSeoItem from './LatestSeoItem';

export default {
    name: 'latest-seo',
    components: {
        LatestSeoItem,
    },
    props: {
        urls: {
            required: true,
        }
    },
    mounted() {
        // eslint-disable-next-line
        //console.log(this.urls);
    }
}
</script>

