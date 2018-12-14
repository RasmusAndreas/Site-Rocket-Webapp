<template>
    <div>Report for {{ websiteReport.domain }}</div>
</template>

<script>
export default {
    name: 'report',
    data() {
        return {
            websitedata: this.getWebsite(),
            websiteReport: this.website,
        }
    },
    props: {
        website: {
            required: true,
        },
    },
    methods: {
        getWebsite() {
            if (this.$route.params.key) {
                this.$store.dispatch('getWebsiteReport', {
                    reportKey: this.$route.params.key,
                }).then(response => {
                    // eslint-disable-next-line
                    console.log(response.data[0]);
                    this.websiteReport = response.data[0];
                }).catch(error => {
                    // this.error = 'E-mail or password is incorrect'
                    // eslint-disable-next-line
                    console.log(error.response.data.message)
                });
                return true;
            } else {
                this.websiteReport = this.website;
                return false
            }
        },
    },
    watch: {
        '$route'(to) {
            if(this.$route.params.id) {
                this.$store.dispatch('getWebsite', {
                    websiteid: to.params.id,
                }).then(response => {
                    this.websiteReport = response.data[0];
                }).catch(error => {
                    this.error = 'E-mail or password is incorrect'
                    // eslint-disable-next-line
                    console.log(error.response.data.message)
                });
            }
        },
    },
}
</script>
