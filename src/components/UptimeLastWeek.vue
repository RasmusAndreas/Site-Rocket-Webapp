<template>
    <div class="uptime-week">
        <div class="website-header">{{ header }}</div>
        <div class="uptime-sidetext">
            <p>100%</p>
            <p>80%</p>
            <p>60%</p>
            <p>40%</p>
            <p>20%</p>
            <p>0%</p>
        </div>
        <div class="uptime-week-item" v-for="(days, index) in this.getUptimes()" :key="index">
            <div class="uptime-week-graph">
                <div class="uptime-week-graph-item"></div>
            </div>
            <div class="uptime-week-text">
                <p>{{ days.date }}</p>
                <p>{{ parseFloat(days.uptime).toFixed(2) }}%</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'uptime-last-week',
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
        getUptimesForWeek(days) {
            let temp = [];
            let uptime = 0;
            let dateOne = '';
            this.uptimes.forEach(uptime => {
                const downtimeDate = new Date(uptime.created_at);
                const dateNow = new Date();
                if (downtimeDate.getDate() == dateNow.getDate() - days) {
                    temp.push(uptime);
                }
            });
            const day = new Date();
            day.setDate(day.getDate() - days);
            const month = day.getMonth() + 1;
            dateOne = day.getDate() + '/' + month;
            let amount = temp.length;
            let downtime = amount * 300000;
            uptime = 100 - ((downtime / 86400000) * 100);
            let uptimeReturn = {date: dateOne, uptime: uptime};
            return uptimeReturn;
        },
        getUptimes() {
            let allUptimesWeek = [];
            allUptimesWeek.push(this.getUptimesForWeek(1));
            allUptimesWeek.push(this.getUptimesForWeek(2));
            allUptimesWeek.push(this.getUptimesForWeek(3));
            allUptimesWeek.push(this.getUptimesForWeek(4));
            allUptimesWeek.push(this.getUptimesForWeek(5));
            allUptimesWeek.push(this.getUptimesForWeek(6));
            allUptimesWeek.push(this.getUptimesForWeek(7));
            return allUptimesWeek;
        }
    },
    created() {
        this.getUptimes();
    },
}
</script>
