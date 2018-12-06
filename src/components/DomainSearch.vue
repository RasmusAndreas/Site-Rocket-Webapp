<template>
    <div class="domain-search">
        <div class="domain-search__modal">
            <div class="domain-search__input">
                <input type="text" class="domain-search__field" placeholder="Search domains" v-model="searchString" v-focus @keyup.esc="close" />
            </div>
            <div class="domain-search__list">
                <div v-if="searchResult.length > 0" ref="test" class="domain-search__item" v-for="website in searchResult" :key="website.id" @click="navigateTo(website.id)">
                    {{ website.websiteName }}
                </div>
                <div class="domain-search__item" v-if="searchResult.length == 0">Sorry, no results</div>
            </div>
        </div>
        <div class="overlay" @click="close"></div>
    </div>
</template>

<script>
export default {
    name: 'domain-search',
    data() {
        return {
            searchString: '',
            websites: this.$store.state.websites,
            itemFocus: null,
        }
    },
    computed: {
        searchResult() {
            return this.websites.filter((website) => {
                return website.websiteName.toLowerCase()
                .indexOf(this.searchString.toLowerCase()) > -1;
            });
        }
    },
    methods: {
        close() {
            this.$emit('closeSearch')
        },
        navigateTo(id) {
            this.$router.push('/website/'+id);
            this.close();
        },
    },
    directives: {
        focus: {
            inserted(el) {
                el.focus();
            }
        }
    },
}
</script>
