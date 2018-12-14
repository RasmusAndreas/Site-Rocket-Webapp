<template>
    <div class="total-uptime">
        <div class="total-uptime__header">Total uptime</div>
        <div class="total-uptime__graph">
            <v-progress-circular :value="totalUptime" :size="120" :width="14" color="#CE7631">
                <div class="total-uptime__graph-label">80% Uptime</div>
            </v-progress-circular>
        </div>
        <div class="total-uptime__data">
            <div class="total-uptime__uptime">
                <div class="total-uptime__indicators">
                    <div class="total-uptime__circle"></div>
                    <div class="total-uptime__label">Uptime</div>
                </div>
                <div class="total-uptime__value">{{ 80 }}%</div>
            </div>
            <div class="total-uptime__downtime">
                <div class="total-uptime__indicators">
                    <div class="total-uptime__circle"></div>
                    <div class="total-uptime__label">Downtime</div>
                </div>
                <div class="total-uptime__value">%</div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: 'website-uptime',
    data() {
        return {
            website: {},
            totalUptime: 0,
            downPings: 0,
            downTime: 0,
            totalPings: 0,
        }
    },
    watch: {
        '$route'(to) {
            const website = this.$store.state.websites.filter(item => item.id == to.params.id);
            this.website = website[0];
            console.log(this.website.websiteName);
            this.calcTotalPings();
            this.calcDownPings();
            this.calcTotalUptime();
            this.calcDownTime();
        },
    },
    mounted() {
        const website = this.$store.state.websites.filter(item => item.id == this.$route.params.id);
        this.website = website[0];
        console.log(this.website);
        this.calcTotalPings();
        this.calcDownPings();
        this.calcTotalUptime();
        this.calcDownTime();
    },
    methods: {
        calcTotalPings() {
            const startDate = new Date(this.website.created_at);
            const dateNow = new Date();
            const diff = dateNow - startDate;
            this.totalPings = diff / 300000;
        },
        calcDownPings() {
            if(this.website.uptimes) {
                return this.website.uptimes.length;
            } else {
                return 0;
            }
        },
        calcTotalUptime() {
            if(this.downPings > 0) {
                const number = 100 - (this.downPings / this.totalPings * 100);
                this.totalUptime = number;
            } else {
                this.totalUptime = 100;
            }
        },
        calcDownTime() {
            this.downTime = 100 - this.totalUptime;
        }
    }
}
</script>

