<template>
    <div class="loadspeed-insight-container">
        <div class="website-header">{{ header }}</div>
        <div class="loadspeed-insight-item">
            <img class="loadspeed-icon" src="../assets/icon-fast.png">
            <div class="loadspeed-insight-text text-fast">{{ allLoadtimesCalc().fast }}s</div>
            <div class="subtext-loadspeed-insight">Fastest loadspeed</div>
        </div>
        <div class="loadspeed-insight-item">
            <img class="loadspeed-icon" src="../assets/icon-avg.png">
            <div class="loadspeed-insight-text text-avg">{{ allLoadtimesCalc().avg }}s</div>
            <div class="subtext-loadspeed-insight">Average loadspeed</div>
        </div>
        <div class="loadspeed-insight-item">
            <img class="loadspeed-icon" src="../assets/icon-slow.png">
            <div class="loadspeed-insight-text text-slow">{{ allLoadtimesCalc().slow }}s</div>
            <div class="subtext-loadspeed-insight">Slowest loadspeed</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'loadspeed-quick-insights',
    data() {
        return {
            allLoadtimes: [],
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
    created() {
        this.allLoadtimesCalc();
    },
    methods: {
        allLoadtimesCalc() {
            var all = [];
            this.urls.forEach(url => {
                url.loadtimes.forEach(loadtime => {
                    all.push(parseInt(loadtime.loadtime));
                });
            });
            this.allLoadtimes = all;

            let amountOfLoadtimes = this.allLoadtimes.length;
            let total = 0;
            this.allLoadtimes.forEach(loadtime => {
                total = total + parseInt(loadtime);
            });

            let average = parseFloat((total / amountOfLoadtimes) / 1000).toFixed(2);

            let slowest = parseFloat((Math.max.apply(null, this.allLoadtimes)) / 1000).toFixed(2);
            
            let fastest = parseFloat((Math.min.apply(null, this.allLoadtimes)) / 1000).toFixed(2);

            let insightstats = {fast: fastest, avg: average, slow: slowest};

            return insightstats;
        },
    },
}
</script>

