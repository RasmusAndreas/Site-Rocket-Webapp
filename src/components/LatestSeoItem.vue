<template>
    <div class="latest-seo__item">
        <div class="latest-seo__url">{{ url.url }}</div>
        <div class="latest-seo__issues">{{ issues }}</div>
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
    computed: {
        issues() {
            let issues = 0;
            if(this.url.altText > 0) {
                issues++;
            } else if(this.url.h1 == 0 || this.url.h1 > 1) {
                issues++;
            } else if(this.url.metaDescription < 120 || this.url.metaDescription > 180) {
                issues++;
            } else if(this.url.title < 50 || this.url.title > 70) {
                issues++;
            } else if(this.url.wordCount < 300) {
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
