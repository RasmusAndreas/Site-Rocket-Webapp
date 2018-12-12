<template>
    <div v-if="urls.length > 0">
        <div>Quick insights</div>
        <div>
            <div>{{ fastest }}s</div>
            <div>Fastest loadspeed</div>
        </div>
        <div>
            <div>{{ averageLoadtime }}s</div>
            <div>Average loadspeed</div>
        </div>
        <div>
            <div>{{ slowest }}s</div>
            <div>Slowest loadspeed</div>
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
    watch: {
        urls() {
            this.allLoadtimesCalc();
        },
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
            console.log(all);
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
            console.log(total);
            // eslint-disable-next-line
            console.log(amountOfLoadtimes);
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

