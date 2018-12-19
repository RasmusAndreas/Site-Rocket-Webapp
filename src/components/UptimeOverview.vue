<template>
    <div>
        <div class="website-header">{{ header }}</div>
        <table cellspacing="0" class="uptime-overview">
            <tr class="uptime-overview__headers">
                <td class="uptime-overview__header" v-for="(header, index) in table_headers" :key="index">{{ header.text }}</td>
            </tr>
            <tr class="uptime-overview__data-row" v-for="uptime in uptimes" :key="uptime.id">
                <td class="uptime-overview__data uptime-overview__date">{{ formatDate(uptime.created_at) }}</td>
                <td class="uptime-overview__data uptime-overview__time">{{ formatTime(uptime.created_at) }}</td>
                <td class="uptime-overview__data uptime-overview__code">{{ uptime.statusCode }}</td>
                <td class="uptime-overview__data uptime-overview__checkbox">
                    <div class="uptime-overview__checkbox-inner">
                        <v-checkbox color="#27ae60" v-model="uptime.excludeDowntime" @change="updateUptime(uptime.id, uptime.excludeDowntime)"></v-checkbox>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    name: 'uptime-overview',
    data() {
        return {
            table_headers: [
                {
                    text: 'Date',
                    sortable: false,
                },
                {
                    text: 'Time',
                    sortable: false,
                },
                {
                    text: 'Error code',
                    sortable: false,   
                },
                {
                    text: 'Exclude from stats',
                    sortable: false,   
                }
            ],
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
        updateUptime(id, exclude) {
            this.$store.dispatch('updateUptime', {
                websiteid: this.$route.params.id,
                uptimeid: id,
                excludeDowntime: exclude,
            }).then(() => {
                
            }).catch(error => {
                // eslint-disable-next-line
                console.log(error.response.data.message)
            });
        },
        formatDate(created) {
            const completeDate = new Date(created);
            return completeDate.getDate() + '/' + (completeDate.getMonth() + 1) + ' - ' + completeDate.getFullYear();
        },
        formatTime(created) {
            const completeDate = new Date(created);
            let minutes = completeDate.getMinutes();
            if(minutes < 10) {
                minutes = '0' + minutes;
            }
            return completeDate.getHours() + ':' + minutes;
        }
    },
}
</script>

