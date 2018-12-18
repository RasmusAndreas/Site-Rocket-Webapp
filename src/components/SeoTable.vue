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
                    <td>{{ props.item.url }}</td>

                    <td class="text-xs-center" v-if="props.item.title >= 50 && props.item.title <= 70"><v-icon color="green">check_circle_outline</v-icon></td>
                    <td class="text-xs-center" v-else><v-icon color="red">error_outline</v-icon></td>

                    <td class="text-xs-center" v-if="props.item.metaDescription >= 120 && props.item.metaDescription <= 180"><v-icon color="green">check_circle_outline</v-icon></td>
                    <td class="text-xs-center" v-else><v-icon color="red">error_outline</v-icon></td>

                    <td class="text-xs-center" v-if="props.item.h1 == 1"><v-icon color="green">check_circle_outline</v-icon></td>
                    <td class="text-xs-center" v-else><v-icon color="red">error_outline</v-icon></td>

                    <td class="text-xs-center" v-if="props.item.altText == 0"><v-icon color="green">check_circle_outline</v-icon></td>
                    <td class="text-xs-center" v-else><v-icon color="red">error_outline</v-icon></td>

                    <td class="text-xs-center" v-if="props.item.wordCount >= 300"><v-icon color="green">check_circle_outline</v-icon></td>
                    <td class="text-xs-center" v-else><v-icon color="red">error_outline</v-icon></td>

                    <td class="seo-table__issues-mobile" style="display: none;">issues</td>
                </tr>
            </template>
            <template slot="expand" slot-scope="props">
                <v-card flat>
                    <div v-if="props.item.title < 50 || props.item.title > 70">
                        <div class="seo-table__issue-icon">
                            <v-icon color="red">error_outline</v-icon>
                        </div>
                        <div class="seo-table__issue-text">
                            <div class="seo-table__heading">Page title</div>
                            <div class="seo-table__description">
                                The title of the current URL, is <b>{{ props.item.title }} characters</b> long. The recommended title length is between 50 and 70 characters.
                            </div>
                        </div>
                    </div>
                    <div v-if="props.item.metaDescription < 120 || props.item.metaDescription > 180">
                        problem metaDescription
                    </div>
                    <div v-if="props.item.h1 != 1">
                        problem h1
                    </div>
                    <div v-if="props.item.altText > 0">
                        problem alt texts
                    </div>
                    <div v-if="props.item.wordCount < 300">
                        problem wordcount
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
                text: 'TITLE TAG',
                sortable: false,
                align: 'center',
            },
            {
                text: 'META DESCRIPTION',
                sortable: false,
                align: 'center',   
            },
            {
                text: 'H-TAGS',
                sortable: false,
                align: 'center',   
            },
            {
                text: 'ALT-ATTR.',
                sortable: false,
                align: 'center',   
            },
            {
                text: 'WORD COUNT',
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
