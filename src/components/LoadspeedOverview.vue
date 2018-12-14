<template>
    <div>
        <div class="website-header">{{ header }}</div>
        <v-data-table
        :headers="table_headers"
        :items="calcForOverview()"
        :hide-actions="true"
        no-data-text="Awesome! Your website hasn't had any major downtime since we started monitoring the site!"
        >
            <template slot="items" slot-scope="props">
            <td class="">
                {{ props.item.url }}
            </td>
            <td class="">
                {{ checkNaN(props.item.today) }}s
            </td>
            <td class="">
                {{ checkNaN(props.item.yesterday) }}s
            </td>
            <td class="">
                {{ checkNaN(props.item.avg) }}s
            </td>
            </template>
        </v-data-table>
    </div>
</template>

<script>
export default {
    name: 'loadspeed-overview',
    data() {
        return {
            table_headers: [{
                text: 'URL',
                sortable: false,
            },
            {
                text: 'Todays avg.',
                sortable: false,   
            },
            {
                text: 'Yesterdays avg.',
                sortable: false,   
            },
            {
                text: 'Avg. loadspeed (last month)',
                sortable: false,
            }],
        }
    },
    props: {
        urls: {
            required: true,
        },
        header: {
            type: String,
            required: true,
        },
    },
    methods: {
        calcAvg(array) {
            let amount = array.length;
            let total = 0;
            array.forEach(loadtime => {
                    total = total + parseInt(loadtime);
            });
            let avg = (total / amount) / 1000;
            return avg;
        },
        calcForOverview() {
            let all = [];
            let temp = [];
            let tempToday = [];
            let tempYesterday = [];
            let urlAvg = 0;
            let todayAvg = 0;
            let yesterdayAvg = 0;

            this.urls.forEach(url => {
                temp = [];
                tempToday = [];
                tempYesterday = [];
                url.loadtimes.forEach(loadtime => {
                    const loadDate = new Date(loadtime.created_at);
                    const dateNow = new Date();
                    if (loadDate.setHours(0,0,0,0) == dateNow.setHours(0,0,0,0)) {
                        tempToday.push(parseInt(loadtime.loadtime));
                    }
                    if (loadDate.getDate() == dateNow.getDate() -1) {
                        tempYesterday.push(parseInt(loadtime.loadtime));
                    }
                    temp.push(parseInt(loadtime.loadtime));
                });
                urlAvg = this.calcAvg(temp);
                todayAvg = this.calcAvg(tempToday);
                yesterdayAvg = this.calcAvg(tempYesterday);
                all.push({url: url.url, avg: urlAvg, today: todayAvg, yesterday: yesterdayAvg});
            });

            let sorted = this.sortByKey(all, 'avg');
            var maximum = Math.max.apply(Math, all.map(function(o) { return o.avg; }));
            sorted.forEach(url => {
                let percent = (url.avg / maximum) * 100;
                url.percent = percent;
            });
            return sorted;
        },
        sortByKey(array, key) {
            return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x > y) ? -1 : ((x > y) ? 1 : 0));
            });
        },
        checkNaN(value) {
            if (isNaN(value)) {
                return 0;
            } else {
                return parseFloat(value).toFixed(2);
            }
        },
    },
    created() {
        this.calcForOverview();
    },
}
</script>

