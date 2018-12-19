<template>
    <div class="seo-table">
        <!-- <div class="website-header">{{ header }}</div>
        <div class="seo-table__table">
            <tr class="seo-table__header-row">
                <td class="seo-table__header">URL</td>
                <td class="seo-table__header">Title tag</td>
                <td class="seo-table__header">Meta description</td>
                <td class="seo-table__header">H-tags</td>
                <td class="seo-table__header">Alt-attr.</td>
                <td class="seo-table__header">Word count</td>
                <td class="seo-table__header" style="display: none;">Issues</td>
            </tr>
            <tr class="seo-table__data-row" v-for="url in urls" :key="url.id">
                <td class="seo-table__data">{{ url.url }}</td>
                <td class="seo-table__data">
                    <v-icon color="green" v-if="url.title >= 50 && url.title <= 70">check_circle_outline</v-icon>
                    <v-icon color="red" v-else>highlight_off</v-icon>
                </td>
                <td class="seo-table__data">
                    <v-icon color="green" v-if="url.metaDescription >= 120 && url.metaDescription <= 180">check_circle_outline</v-icon>
                    <v-icon color="red" v-else>highlight_off</v-icon>
                </td>
                <td class="seo-table__data">
                    <v-icon color="green" v-if="url.h1 == 1">check_circle_outline</v-icon>
                    <v-icon color="red" v-else>highlight_off</v-icon>
                </td>
                <td class="seo-table__data">
                    <v-icon color="green" v-if="url.altText == 0">check_circle_outline</v-icon>
                    <v-icon color="red" v-else>highlight_off</v-icon>
                </td>
                <td class="seo-table__data">
                    <span :class="url.wordCount >= 300 ? 'wc-good' : 'wc-bad'">{{ url.wordCount }}</span>
                </td>
                <td class="seo-table__data" style="display: none;"></td>
            </tr>
        </div> -->
        <div class="website-header">{{ header }}</div>
        <v-data-table
        :headers="table_headers"
        :items="urls"
        item-key="id"
        :hide-actions="true"
        no-data-text="Awesome! Your website doesn't have any major SEO issues!"
        >
            <template slot="items" slot-scope="props">
                <tr @click="props.expanded = !props.expanded" v-if="!checkAllSeo(props.item)">
                    <td>
                        <i class="material-icons seo-table__arrow" :style="props.expanded ? 'transform: rotate(90deg);' : 'transform: rotate(0deg);'">keyboard_arrow_right</i>
                        {{ props.item.url }}
                        <a :href="props.item.url" class="new-window-icon" target="_blank" title="Open page in a new tab">
                            <i class="material-icons">
                                open_in_new
                            </i>
                        </a>
                    </td>

                    <td class="text-xs-center" v-if="props.item.title >= 50 && props.item.title <= 70"><v-icon color="green">check_circle_outline</v-icon></td>
                    <td class="text-xs-center" v-else><v-icon color="red">error_outline</v-icon></td>

                    <td class="text-xs-center" v-if="props.item.metaDescription >= 120 && props.item.metaDescription <= 180"><v-icon color="green">check_circle_outline</v-icon></td>
                    <td class="text-xs-center" v-else><v-icon color="red">error_outline</v-icon></td>

                    <td class="text-xs-center" v-if="props.item.h1 == 1"><v-icon color="green">check_circle_outline</v-icon></td>
                    <td class="text-xs-center" v-else><v-icon color="red">error_outline</v-icon></td>

                    <td class="text-xs-center" v-if="props.item.altText == 0"><v-icon color="green">check_circle_outline</v-icon></td>
                    <td class="text-xs-center" v-else><v-icon color="red">error_outline</v-icon></td>

                    <td class="text-xs-center" v-if="props.item.wordCount >= 300">
                        <span class="wc-good">{{ props.item.wordCount }}</span>
                    </td>
                    <td class="text-xs-center" v-else>
                        <span class="wc-bad">{{ props.item.wordCount }}</span>
                    </td>

                    <td class="seo-table__issues-mobile" style="display: none;">issues</td>
                </tr>
            </template>
            <template slot="expand" slot-scope="props">
                <v-card flat>
                    <div class="seo-table__issue" v-if="props.item.title < 50 || props.item.title > 70">
                        <div class="seo-table__issue-icon">
                            <v-icon color="red">error_outline</v-icon>
                        </div>
                        <div class="seo-table__issue-text">
                            <div class="seo-table__heading">Page title</div>
                            <div class="seo-table__description">
                                <p>The title of the current URL, is <b>{{ props.item.title }} characters</b> long. The recommended title length is between 50 and 70 characters.</p>
                            </div>
                        </div>
                    </div>
                    <div class="seo-table__issue" v-if="props.item.metaDescription < 120 || props.item.metaDescription > 180">
                        <div class="seo-table__issue-icon">
                            <v-icon color="red">error_outline</v-icon>
                        </div>
                        <div class="seo-table__issue-text">
                            <div class="seo-table__heading">Meta description</div>
                            <div class="seo-table__description">
                                <div v-if="props.item.metaDescription != 0">
                                    <p>The meta description of the current URL, is <b>{{ props.item.metaDescription }} characters</b> long. The recommended meta description length is between 120 and 180 characters.</p>
                                </div>
                                <div v-else>
                                    <p>The current URL, does not contain a meta description. The recommended meta description length is between 120 and 180 characters.</p>
                                </div>
                                <p>Search engines displays this text below the page title in search results.</p>
                            </div>
                        </div>
                    </div>
                    <div class="seo-table__issue" v-if="props.item.h1 != 1">
                        <div class="seo-table__issue-icon">
                            <v-icon color="red">error_outline</v-icon>
                        </div>
                        <div class="seo-table__issue-text">
                            <div class="seo-table__heading">H1 tags</div>
                            <div class="seo-table__description">
                                <p>The current URL contains <b>{{ props.item.h1 }} H1 tags</b>. A page should contain no more and no less than one H1 header.</p>
                            </div>
                        </div>
                    </div>
                    <div class="seo-table__issue" v-if="props.item.altText > 0">
                        <div class="seo-table__issue-icon">
                            <v-icon color="red">error_outline</v-icon>
                        </div>
                        <div class="seo-table__issue-text">
                            <div class="seo-table__heading">Alt-attr.</div>
                            <div class="seo-table__description">
                                <p>There are <b>{{ props.item.altText }} images</b> on this URL with no alt attribute defined. The alt attributes is used in Google image search. The alt attributes are also used by screen readers, used by users with vision 
                                disabilities.</p>
                            </div>
                        </div>
                    </div>
                    <div class="seo-table__issue" v-if="props.item.wordCount < 300">
                        <div class="seo-table__issue-icon">
                            <v-icon color="red">error_outline</v-icon>
                        </div>
                        <div class="seo-table__issue-text">
                            <div class="seo-table__heading">Word count</div>
                            <div class="seo-table__description">
                                <p>The current page contains <b>{{ props.item.wordCount }} words</b>. The recommended word count word count is above <b>300 words</b>.</p>
                            </div>
                        </div>
                    </div>
                </v-card>
            </template>
        </v-data-table>
    </div>
</template>

<script>
export default {
    name: 'seo-table',
    data() {
        return {
            table_headers: [
            {
                text: 'URL',
                sortable: false,
                align: 'left',
            },
            {
                text: 'Title tag',
                sortable: false,
                align: 'center',
            },
            {
                text: 'Meta description',
                sortable: false,
                align: 'center',   
            },
            {
                text: 'H-Tags',
                sortable: false,
                align: 'center',   
            },
            {
                text: 'Alt-attr.',
                sortable: false,
                align: 'center',   
            },
            {
                text: 'Word count',
                sortable: false,
                align: 'center',   
            }]
        }
    },
    props: {
        urls: {
            required: true,
        },
        header: {
            type: String,
            required: true,
        }
    },
    methods: {
        checkAllSeo(url) {
            if (url.title >= 50 && url.title <= 70) {
                if (url.metaDescription >= 120 && url.metaDescription <= 180) {
                    if (url.h1 == 1) {
                        if (url.altText == 0) {
                            if (url.wordCount >= 300) {
                                return true;
                            } else {
                                return false;
                            }
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } else {
                return false;
            }
        },
    },
}
</script>
