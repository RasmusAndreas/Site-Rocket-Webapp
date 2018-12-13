<template>
    <div>
        <div class="website-header">{{ header }}</div>
        <div v-for="(url, index) in calcForOverview()" :key="index">
            {{ url.url }}
            <br>
            Today {{ parseFloat(url.today).toFixed(2) }}s
            <br>
            Yesterday {{ parseFloat(url.yesterday).toFixed(2) }}s
            <br>
            Avg. {{ parseFloat(url.avg).toFixed(2) }}s
            <br>
            <br>
        </div>
    </div>
</template>

<script>
export default {
    name: 'loadspeed-overview',
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
                let urlAvg = this.calcAvg(temp);
                let todayAvg = this.calcAvg(tempToday);
                let yesterdayAvg = this.calcAvg(tempYesterday);
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
    },
    created() {
        this.calcForOverview();
    },
}
</script>

