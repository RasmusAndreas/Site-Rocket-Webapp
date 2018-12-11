<template>
    <div class="latest-seo">
        <div class="latest-seo__header">Latest SEO issues</div>
        <latest-seo-item v-for="url in urls.slice(0, 5)" :key="url.id" :url="url"/>
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

