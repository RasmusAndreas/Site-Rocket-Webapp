<template>
    <div class="uptime-week">
        <div class="website-header">{{ header }}</div>
        <div class="uptime-week__sidetext">
            <div class="uptime-week__percent">100%</div>
            <div class="uptime-week__percent">80%</div>
            <div class="uptime-week__percent">60%</div>
            <div class="uptime-week__percent">40%</div>
            <div class="uptime-week__percent">20%</div>
            <div class="uptime-week__percent">0%</div>
        </div>
        <div class="uptime-week__days">
            <div class="uptime-week__item" v-for="(days, index) in this.getUptimes()" :key="index">
                <div class="uptime-week__graph" :style="'height: ' + parseFloat(days.uptime).toFixed(2) + '%;'">
                    <div class="uptime-week-graph-item"></div>
                    <div class="uptime-week__value">{{ parseFloat(days.uptime).toFixed(2) }}%</div>
                </div>
            </div>
        </div>
        <div class="uptime-week__dates">
            <div class="uptime-week__date" v-for="(days, index) in this.getUptimes()" :key="index">
                {{ days.date }}
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
                if (uptime.excludeDowntime == 0) {
                    const downtimeDate = new Date(uptime.created_at);
                    const dateNow = new Date();
                    if (downtimeDate.getDate() == dateNow.getDate() - days) {
                        temp.push(uptime);
                    }
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
            allUptimesWeek.push(this.getUptimesForWeek(0));
            allUptimesWeek.push(this.getUptimesForWeek(1));
            allUptimesWeek.push(this.getUptimesForWeek(2));
            allUptimesWeek.push(this.getUptimesForWeek(3));
            allUptimesWeek.push(this.getUptimesForWeek(4));
            allUptimesWeek.push(this.getUptimesForWeek(5));
            allUptimesWeek.push(this.getUptimesForWeek(6));
            return allUptimesWeek;
        }
    },
    created() {
        this.getUptimes();
    },
}
</script>
