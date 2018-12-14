<template>
    <div class="latest-seo__item">
        <div class="latest-seo__url">{{ url.url }}</div>
        <div class="latest-seo__issues">{{ issues(url) }}</div>
    </div>
</template>

<script>
export default {
    name: 'latest-seo-item',
    props: {
        url: {
            required: true,
        }
    },
    data() {
        return {
            urlData: this.url
        }
    },
    methods: {
        issues(url) {
            let issues = 0;
            if(url.altText > 0) {
                issues++;
            } else if(url.h1 =! 1) {
                issues++;
            } else if(url.metaDescription < 120 || url.metaDescription > 180) {
                issues++;
            } else if(url.title < 50 || url.title > 70) {
                issues++;
            } else if(url.wordCount < 300) {
                issues++;
            }
            if(issues == 1) {
                return issues + ' issue';
            } else {
                return issues + ' issues';
            }
        },
    },
    mounted() {
        // eslint-disable-next-line
        // console.log(this.url);
    }
}
</script>
