<template>
    <div>
        <div class="website-header" v-if="calcFiveSlowLoadtimes().length > 0">{{ header }}</div>
        <div v-for="(loadtime, index) in calcFiveSlowLoadtimes()" :key="index">
            <div class="loadtime-slowest-pages-text">
                <div class="loadtime-slowest-pages-url">{{ loadtime.url }} </div>
                <div class="loadtime-slowest-pages-avg">{{ parseFloat(loadtime.avg).toFixed(2) }}s</div>
            </div>
            <v-progress-linear :value="loadtime.percent" color="#E74C3C" height="5" background-color="#EDF0F5"></v-progress-linear>
        </div>
    </div>
</template>

<script>
export default {
    name: 'loadspeed-slowest-pages',
    props: {
        urls: {
            required: true,
        },
        header: {
            type: String,
            required: true,
        }
    },
    created() {
        this.calcFiveSlowLoadtimes();
    },
    methods: {
        calcFiveSlowLoadtimes() {
            let all = [];
            let temp = [];
            this.urls.forEach(url => {
                temp = [];
                url.loadtimes.forEach(loadtime => {
                    temp.push(parseInt(loadtime.loadtime));
                });
                let amount = temp.length;
                let total = 0;
                temp.forEach(loadtime => {
                    total = total + parseInt(loadtime);
                });
                let urlavg = (total / amount) / 1000;
                all.push({url: url.url, avg: urlavg, percent: 0});

            });
            let sorted = this.sortByKey(all, 'avg');
            var maximum = Math.max.apply(Math, all.map(function(o) { return o.avg; }));
            let sliced = sorted.slice(0,5)
            sliced.forEach(url => {
                let percent = (url.avg / maximum) * 100;
                url.percent = percent;
            });
            return sliced;
        },
        sortByKey(array, key) {
            return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x > y) ? -1 : ((x > y) ? 1 : 0));
            });
        },
    }
}
</script>

