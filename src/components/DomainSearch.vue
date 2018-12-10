<template>
    <div class="domain-search">
        <div class="domain-search__modal">
            <div class="domain-search__input">
                <input type="text" class="domain-search__field" placeholder="Search domains" 
                    v-model="searchString" 
                    v-focus @keyup.esc="close"
                    @keydown.down="onArrowDown"
                    @keydown.up="onArrowUp"
                    @keydown.enter="onEnter" />
            </div>
            <div class="domain-search__list" v-if="searchResult.length > 0">
                <div class="domain-search__item" 
                    v-for="(website, index) in searchResult" 
                    :key="index" 
                    @click="navigateTo(website.id)"
                    :class="index == arrowCounter ? 'selected item': 'item'"
                >
                    {{ website.websiteName }}
                </div>
            </div>
            <div class="domain-search__item" v-if="searchResult.length == 0">Sorry, no results</div>
        </div>
        <div class="overlay" @click="close"></div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: 'domain-search',
    data() {
        return {
            searchString: '',
            websites: this.$store.state.websites,
            itemFocus: null,
            arrowCounter: -1,
        }
    },
    computed: {
        searchResult() {
            return this.websites.filter((website) => {
                return website.websiteName.toLowerCase()
                .indexOf(this.searchString.toLowerCase()) > -1;
                this.arrowCounter = -1;
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
        onArrowDown() {
            if (this.arrowCounter < this.searchResult.length - 1) {
                this.arrowCounter = this.arrowCounter + 1;
                console.log(this.arrowCounter);
            }
        },
        onArrowUp() {
            if (this.arrowCounter > 0) {
                this.arrowCounter = this.arrowCounter - 1;
                console.log(this.arrowCounter);
            }
        },
        onEnter() {
            this.navigateTo(this.searchResult[this.arrowCounter].id);
            this.$emit('closeSearch');
            this.arrowCounter = -1;
        },
    },
    directives: {
        focus: {
            inserted(el) {
                el.focus();
            }
        }
    }
}
</script>
