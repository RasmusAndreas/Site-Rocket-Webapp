<template>
    <div v-if="calcForOverview().length > 0">
        <div class="website-header">{{ header }}</div>
        <table cellspacing="0" class="uptime-overview">
            <tr class="uptime-overview__headers">
                <td class="uptime-overview__header" :class="header.class" v-for="(header, index) in table_headers" :key="index">{{ header.text }}</td>
            </tr>
            <tr class="uptime-overview__data-row" v-for="url in calcForOverview()" :key="url.id">
                <td class="uptime-overview__data uptime-overview__date">{{ url.url }}</td>
                <td class="uptime-overview__data mobile-hide">{{ checkNaN(url.today) }}s</td>
                <td class="uptime-overview__data mobile-hide">{{ checkNaN(url.yesterday) }}s</td>
                <td class="uptime-overview__data uptime-overview__avg">{{ checkNaN(url.avg) }}s</td>
            </tr>
        </table>
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
                class: '',
            },
            {
                text: 'Todays avg.',
                sortable: false,
                class: 'mobile-hide',   
            },
            {
                text: 'Yesterdays avg.',
                sortable: false,   
                class: 'mobile-hide',
            },
            {
                text: 'Avg. (1 month)',
                sortable: false,
                class: '',
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

