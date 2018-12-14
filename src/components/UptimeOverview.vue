<template>
    <div>
        <div class="website-header">{{ header }}</div>
        <v-data-table
        :headers="table_headers"
        :items="uptimes"
        :hide-actions="true"
        class="elevation-1"
        no-data-text="Awesome! Your website hasn't had any major downtime since we started monitoring the site!"
        >
            <template slot="items" slot-scope="props">
            <td class="">
                {{ props.item.created_at }}
            </td>
            <td class="">
                {{ props.item.statusCode }}
            </td>
            <td class="" @click="updateUptime(props.item.id)">
                <v-checkbox class="" v-model="props.item.excludeDowntime"></v-checkbox>
            </td>
            </template>
        </v-data-table>
    </div>
</template>

<script>
export default {
    name: 'uptime-overview',
    data() {
        return {
            table_headers: [{
                text: 'Date',
                sortable: false,
            },
            {
                text: 'Error code',
                sortable: false,   
            },
            {
                text: 'Exclude from stats',
                sortable: false,   
            }],
        }
    },
    props: {
        uptimes: {
            required: true,
        },
        header: {
            type: String,
            required: true,
        }
    },
    methods: {
        updateUptime(id) {
            alert(id);
        }
    },
}
</script>

