<template>
    <div v-if="uptimes.length > 0" class="longest-downtime">
        <div class="website-header">{{ header }}</div>
        <div v-for="(downtime, index) in calcLongestDowntimes()" :key="index" class="longest-downtime__item"><span class="longest-downtime__date">{{ downtime.date }}</span> <span class="longest-downtime__time">{{ downtime.amount }} min.</span>
            <v-progress-linear :value="downtime.percent" color="#E74C3C" height="5" background-color="#EDF0F5"></v-progress-linear>
        </div>
    </div>
</template>

<script>
export default {
    name: 'uptime-longest-downtime',
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
        calcLongestDowntimes() {
            let longestDowntimes = [];
            let temp = 0;
            let previousDown;
            this.uptimes.forEach(uptime => {
                if (uptime.excludeDowntime == 0) {
                    const downtimeDate = new Date(uptime.created_at);
                    if (previousDown) {
                        if (previousDown - downtimeDate <= 300000) {
                            temp++;
                        } else if (previousDown - downtimeDate > 300000) {
                            longestDowntimes.push({amount: temp * 5, date: downtimeDate.getDate() + '/' + (downtimeDate.getMonth() + 1) + '-' + (downtimeDate.getYear() + 1900), percent: 0});
                            temp = 1;
                            previousDown = new Date(uptime.created_at);
                        }
                    } else {
                        temp++;
                        previousDown = new Date(uptime.created_at);
                    }
                }
            });
            longestDowntimes.push({amount: temp * 5, date: previousDown.getDate() + '/' + (previousDown.getMonth() +1) + '-' + (previousDown.getYear() + 1900), percent: 0});
            let sorted = this.sortByKey(longestDowntimes, 'amount');
            var maximum = Math.max.apply(Math, longestDowntimes.map(function(o) { return o.amount; }));
            let sliced = sorted.slice(0,5)
            sliced.forEach(downtime => {
                let percent = (downtime.amount / maximum) * 100;
                downtime.percent = percent;
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

