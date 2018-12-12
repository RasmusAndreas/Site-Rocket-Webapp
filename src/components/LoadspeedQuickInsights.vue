<template>
    <div v-if="urls.length > 0" class="loadspeed-insight-container">
        <div class="loadspeed-insight-item">
            <img class="loadspeed-icon" src="../assets/icon-fast.png">
            <div class="loadspeed-insight-text text-fast">{{ fastest }}s</div>
            <div class="subtext-loadspeed-insight">Fastest loadspeed</div>
        </div>
        <div class="loadspeed-insight-item">
            <img class="loadspeed-icon" src="../assets/icon-avg.png">
            <div class="loadspeed-insight-text text-avg">{{ averageLoadtime }}s</div>
            <div class="subtext-loadspeed-insight">Average loadspeed</div>
        </div>
        <div class="loadspeed-insight-item">
            <img class="loadspeed-icon" src="../assets/icon-slow.png">
            <div class="loadspeed-insight-text text-slow">{{ slowest }}s</div>
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
    },
    created() {
        this.allLoadtimesCalc();
    },
    methods: {
        allLoadtimesCalc() {
            var all = [];
            this.urls.forEach(url => {
                url.loadtimes.forEach(loadtime => {
                    // eslint-disable-next-line
                    //console.log(loadtime.loadtime);
                    all.push(parseInt(loadtime.loadtime));
                });
            });
            // eslint-disable-next-line
            //console.log(all);
            this.allLoadtimes = all;
        }
    },
    computed: {
        averageLoadtime() {
            let amountOfLoadtimes = this.allLoadtimes.length;
            let total = 0;
            this.allLoadtimes.forEach(loadtime => {
                total = total + parseInt(loadtime);
            });
            // eslint-disable-next-line
            //console.log(total);
            // eslint-disable-next-line
            //console.log(amountOfLoadtimes);
            let average = (total / amountOfLoadtimes) / 1000;
            return parseFloat(average).toFixed(2);
        },
        slowest() {
            let slowest = (Math.max.apply(null, this.allLoadtimes)) / 1000;
            return parseFloat(slowest).toFixed(2);
        },
        fastest() {
            let fastest = (Math.min.apply(null, this.allLoadtimes)) / 1000
            return parseFloat(fastest).toFixed(2);
        }
    },
}
</script>

