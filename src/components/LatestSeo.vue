<template>
    <div class="latest-seo" v-if="urls.length > 0">
        <div class="latest-seo__header">Latest SEO issues</div>
        <div v-for="url in urls.slice(0, 5).reverse()" :key="url.id">
            <div class="latest-seo__item" v-if="issues(url) != '0 issues'">
                <div class="latest-seo__url truncate">{{ url.url }}</div>
                <div class="latest-seo__issues">{{ issues(url) }}</div>
            </div>
        </div>
    </div>
    <div class="latest-seo" v-else>
        <div class="latest-seo__header">Latest SEO issues</div>
        <p>There has been no visits to your site, since you integrated the monitoring.</p>
    </div>
</template>

<script>

export default {
    name: 'latest-seo',
    props: {
        urls: {
            required: true,
        }
    },
    methods: {
        issues(url) {
            let issues = 0;
            if(url.altText > 0) {
                issues++;
            } 
            if(url.h1 != 1) {
                issues++;
            } 
            if(url.metaDescription < 120 || url.metaDescription > 180) {
                issues++;
            } 
            if(url.title < 50 || url.title > 70) {
                issues++;
            } 
            if(url.wordCount < 300) {
                issues++;
            }
            if(issues == 1) {
                return issues + ' issue';
            } else {
                return issues + ' issues';
            }
        },
    },
}
</script>

