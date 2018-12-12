<template>
    <div>{{ header }}</div>
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
                let urlavg = parseFloat((total / amount) / 1000).toFixed(2);
                all.push({url: url.url, avg: urlavg});
            });
            let sorted = this.sortByKey(all, 'avg');
            // eslint-disable-next-line
            console.log(sorted);
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

