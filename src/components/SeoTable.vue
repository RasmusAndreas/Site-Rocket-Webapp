<template>
    <div>
        <div class="website-header">{{ header }}</div>
        <v-data-table
        :headers="table_headers"
        :items="urls"
        item-key="id"
        :hide-actions="true"
        no-data-text="Awesome! Your website doesn't have any major SEO issues!"
        >
            <template slot="items" slot-scope="props">
                <!-- <v-icon color="green">check_circle_outline</v-icon> -->
                <!-- <v-icon color="red">highlight_off</v-icon> -->
                <tr @click="props.expanded = !props.expanded" v-if="!checkAllSeo(props.item)">
                    <td>{{ props.item.url }}</td>

                    <td class="text-xs-right" v-if="props.item.title >= 50 && props.item.title <= 70"><v-icon color="green">check_circle_outline</v-icon></td>
                    <td class="text-xs-right" v-else><v-icon color="red">highlight_off</v-icon></td>

                    <td class="text-xs-right" v-if="props.item.metaDescription >= 120 && props.item.metaDescription <= 180"><v-icon color="green">check_circle_outline</v-icon></td>
                    <td class="text-xs-right" v-else><v-icon color="red">highlight_off</v-icon></td>

                    <td class="text-xs-right" v-if="props.item.h1 == 1"><v-icon color="green">check_circle_outline</v-icon></td>
                    <td class="text-xs-right" v-else><v-icon color="red">highlight_off</v-icon></td>

                    <td class="text-xs-right" v-if="props.item.altText == 0"><v-icon color="green">check_circle_outline</v-icon></td>
                    <td class="text-xs-right" v-else><v-icon color="red">highlight_off</v-icon></td>

                    <td class="text-xs-right" v-if="props.item.wordCount >= 300"><v-icon color="green">check_circle_outline</v-icon></td>
                    <td class="text-xs-right" v-else><v-icon color="red">highlight_off</v-icon></td>
                </tr>
            </template>
            <template slot="expand" slot-scope="props">
                <v-card flat>
                    <div v-if="props.item.title < 50 || props.item.title > 70">
                        problem title
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
            },
            {
                text: 'TITLE TAG',
                sortable: false,   
            },
            {
                text: 'META DESCRIPTION',
                sortable: false,   
            },
            {
                text: 'H-TAGS',
                sortable: false,   
            },
            {
                text: 'ALT-ATTR.',
                sortable: false,   
            },
            {
                text: 'WORD COUNT',
                sortable: false,   
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
    }
}
</script>
